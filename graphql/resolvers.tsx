import { connectDB } from "../lib/db";
import { Trip } from "../lib/models/Trip";
import Destination from "../lib/models/Destinations";
import Menu from "../lib/models/Menu";

declare global {
  var io: any;
}

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
    createTrip: async (_: any, { TotalParticipants, Destination: destId, Menu: menuId, Cost }: any) => {
      await connectDB();

      const destinationDoc = await Destination.findById(destId);
      const menuDoc = await Menu.findById(menuId);

      const trip = await Trip.create({
        TotalParticipants,
        Destination: destinationDoc?.name || destId,
        Menu: menuDoc?.name || menuId,
        Cost
      });

      if (global.io) global.io.emit('trip-created', trip);

      return trip;
    },
    updateTrip: async (_: any, { id, ...args }: any) => {
      await connectDB();
      const trip = await Trip.findByIdAndUpdate(id, args, { new: true });

      if (global.io) global.io.emit('trip-updated', trip);

      return trip;
    },
    deleteTrip: async (_: any, { id }: any) => {
      await connectDB();
      const trip = await Trip.findByIdAndDelete(id);

      if (global.io) global.io.emit('trip-deleted', id);

      return trip;
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