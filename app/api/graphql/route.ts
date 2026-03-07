import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { NextRequest } from 'next/server';
import { typeDefs } from '../../../graphql/typedefs'; 
import { resolvers } from '../../../graphql/resolvers'; 
import { connectDB } from '../../../lib/db';
import { auth } from '../../../auth';

await connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => {
    const session = await auth();
    console.log("SESSION IN CONTEXT:", JSON.stringify(session));
    return { req, session };
  },
});

export { handler as GET, handler as POST };