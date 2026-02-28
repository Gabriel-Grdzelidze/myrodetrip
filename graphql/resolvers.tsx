import { connectDB } from "../lib/db";
import { Trip } from "../lib/models/Trip";
import Destination from "../lib/models/Destinations";
import Menu from "../lib/models/Menu";

export const resolvers = {
  Query: {
    getTrips: async () => {
      await connectDB();
      return await Trip.find();
    },
    getTrip: async (_: any, { id }: any) => {
      await connectDB();
      return await Trip.findById(id);
    },
    getDestinations: async () => {
      await connectDB();
      return await Destination.find();
    },
    getMenus: async () => {
      await connectDB();
      return await Menu.find();
    },
  },

  Mutation: {
    createTrip: async (_: any, { TotalParticipants, Destination: dest, Menu: menu, Cost }: any) => {
      await connectDB();
      return await Trip.create({ TotalParticipants, Destination: dest, Menu: menu, Cost });
    },
    updateTrip: async (_: any, { id, ...args }: any) => {
      await connectDB();
      return await Trip.findByIdAndUpdate(id, args, { new: true });
    },
    deleteTrip: async (_: any, { id }: any) => {
      await connectDB();
      return await Trip.findByIdAndDelete(id);
    },
    addDestination: async (_: any, { name, price }: any) => {
      await connectDB();
      return await Destination.create({ name, price });
    },
    deleteDestination: async (_: any, { id }: any) => {
      await connectDB();
      return await Destination.findByIdAndDelete(id);
    },
    addMenu: async (_: any, { name, price }: any) => {
      await connectDB();
      return await Menu.create({ name, price });
    },
    deleteMenu: async (_: any, { id }: any) => {
      await connectDB();
      return await Menu.findByIdAndDelete(id);
    },
  },
};