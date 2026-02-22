import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    getTrips: async () => {
      return await prisma.trip.findMany();
    },
    getTrip: async (_: any, { id }: any) => {
      return await prisma.trip.findUnique({
        where: { id },
      });
    },
  },

  Mutation: {
    createTrip: async (_: any, { TotalParticipants, Destination, Menu, Cost }: any) => {
      return await prisma.trip.create({
        data: {
          TotalParticipants,
          Destination,
          Menu,
          Cost,
        },
      });
    },
    deleteTrip: async (_: any, { id }: any) => {
      return await prisma.trip.delete({
        where: { id },
      });
    },
  },
};