import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb-client";
import { connectDB } from "./lib/db";
import User from "./lib/models/User";
import Driver from "./lib/models/Driver";
import Admin from "./lib/models/Admin";
import jwt from 'jsonwebtoken';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    Credentials({
      id: "user-login",
      name: "User",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        // 1️⃣ Check Admin collection first
        const admin = await Admin.findOne({ email: credentials?.email });
        if (admin && admin.password === credentials?.password) {
          return {
            id: admin._id.toString(),
            name: admin.name,
            email: admin.email,
            role: "admin",
          };
        }

        // 2️⃣ Fall through to regular users
        const user = await User.findOne({ email: credentials?.email });
        if (!user) return null;
        if (user.password !== credentials?.password) return null;
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: "user",
        };
      },
    }),

    Credentials({
      id: "driver-login",
      name: "Driver",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const driver = await Driver.findOne({ email: credentials?.email });
        if (!driver) return null;
        if (driver.password !== credentials?.password) return null;
        return {
          id: driver._id.toString(),
          name: driver.name,
          email: driver.email,
          role: "driver",
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});