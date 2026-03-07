import { connectDB } from "../lib/db";
import { Trip } from "../lib/models/Trip";
import Destination from "../lib/models/Destinations";
import Menu from "../lib/models/Menu";
import User from "../lib/models/User";
import Driver from "../lib/models/Driver";
import DriverOffer from "../lib/models/DriverOffer";
import Booking from "../lib/models/Booking";
import Admin from "../lib/models/Admin";
import jwt from 'jsonwebtoken';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

declare global {
  var io: any;
}

async function requireAdmin(context: any) {
  const session = context.session;
  if (!session?.user?.email) throw new Error("Unauthorized");
  if ((session.user as any).role !== "admin") throw new Error("Forbidden");
  return session.user;
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
    getUsers: async (_: any, { search }: { search?: string }) => {
      await connectDB();
      const filter = search ? { $or: [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }, { idNumber: { $regex: search, $options: 'i' } }] } : {};
      const users = await User.find(filter).lean();
      return users.map((u: any) => ({ ...u, id: u._id.toString() }));
    },
    getDrivers: async (_: any, { search }: { search?: string }) => {
      await connectDB();
      const filter = search ? { $or: [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }, { idNumber: { $regex: search, $options: 'i' } }, { phone: { $regex: search, $options: 'i' } }] } : {};
      const drivers = await Driver.find(filter).lean();
      return drivers.map((d: any) => ({ ...d, id: d._id.toString() }));
    },
    getDriverOffers: async () => {
      await connectDB();
      const offers = await DriverOffer.find().lean();
      return await Promise.all(offers.map(async (offer: any) => {
        const driver = await Driver.findById(offer.driverId).lean() as any;
        return { ...offer, id: offer._id.toString(), driverName: driver?.name || 'Unknown', createdAt: offer.createdAt?.toISOString() };
      }));
    },
    getMyOffers: async (_: any, { driverId }: { driverId: string }) => {
      await connectDB();
      const offers = await DriverOffer.find({ driverId }).lean();
      return await Promise.all(offers.map(async (offer: any) => {
        const bookings = await Booking.find({ offerId: offer._id }).lean();
        return {
          ...offer, id: offer._id.toString(), driverName: '', createdAt: offer.createdAt?.toISOString(),
          bookings: bookings.map((b: any) => ({ ...b, id: b._id.toString(), status: b.status || 'pending', createdAt: b.createdAt?.toISOString() })),
        };
      }));
    },
    getMyBookings: async (_: any, { userId }: { userId: string }) => {
      await connectDB();
      const bookings = await Booking.find({ userId }).lean();
      return await Promise.all(bookings.map(async (booking: any) => {
        const offer = await DriverOffer.findById(booking.offerId).lean() as any;
        const driver = offer ? await Driver.findById(offer.driverId).lean() as any : null;
        return {
          ...booking, id: booking._id.toString(), status: booking.status || 'pending', createdAt: booking.createdAt?.toISOString(),
          offer: offer ? { ...offer, id: offer._id.toString(), driverName: driver?.name || 'Unknown', createdAt: offer.createdAt?.toISOString() } : null,
        };
      }));
    },
    getDriverRequests: async (_: any, { driverId }: { driverId: string }) => {
      await connectDB();
      const offers = await DriverOffer.find({ driverId }).lean();
      const offerIds = offers.map((o: any) => o._id);
      const offerMap = Object.fromEntries(offers.map((o: any) => [o._id.toString(), o]));
      const bookings = await Booking.find({ offerId: { $in: offerIds } }).lean();
      return bookings.map((b: any) => ({
        ...b, id: b._id.toString(), status: b.status || 'pending', createdAt: b.createdAt?.toISOString(),
        offer: offerMap[b.offerId.toString()] ? { ...offerMap[b.offerId.toString()], id: b.offerId.toString(), driverName: '', createdAt: offerMap[b.offerId.toString()].createdAt?.toISOString() } : null,
      }));
    },
    getAdmins: async (_: any, __: any, context: any) => {
      await requireAdmin(context);
      await connectDB();
      const admins = await Admin.find().sort({ _id: -1 });
      return admins.map((a) => ({
        id: a._id.toString(),
        name: a.name,
        email: a.email,
        createdAt: a._id.getTimestamp().toISOString(),
      }));
    },
  },

  Mutation: {
    createTrip: async (_: any, { TotalParticipants, Destination: destId, Menu: menuId, Cost }: any) => {
      await connectDB();
      const destinationDoc = await Destination.findById(destId);
      const menuDoc = await Menu.findById(menuId);
      const trip = await Trip.create({ TotalParticipants, Destination: destinationDoc?.name || destId, Menu: menuDoc?.name || menuId, Cost });
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
    signUpUser: async (_: any, { name, idNumber, email, password }: any) => {
      await connectDB();
      const existing = await User.findOne({ $or: [{ email }, { idNumber }] });
      if (existing) throw new Error('User with this email or ID already exists');
      const user = await User.create({ name, idNumber, email, password });
      const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET!, { expiresIn: '7d' });
      return { token, role: 'user' };
    },
    signUpDriver: async (_: any, { name, idNumber, email, phone, password }: any) => {
      await connectDB();
      const existing = await Driver.findOne({ $or: [{ email }, { idNumber }] });
      if (existing) throw new Error('Driver with this email or ID already exists');
      const driver = await Driver.create({ name, idNumber, email, phone, password });
      const token = jwt.sign({ id: driver._id, role: 'driver' }, process.env.JWT_SECRET!, { expiresIn: '7d' });
      return { token, role: 'driver' };
    },
    signInUser: async (_: any, { email, password }: any) => {
      await connectDB();
      const user = await User.findOne({ email });
      if (!user) throw new Error('Invalid email or password');
      if (user.password !== password) throw new Error('Invalid email or password');
      const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET!, { expiresIn: '7d' });
      return { token, role: 'user' };
    },
    signInDriver: async (_: any, { email, password }: any) => {
      await connectDB();
      const driver = await Driver.findOne({ email });
      if (!driver) throw new Error('Invalid email or password');
      if (driver.password !== password) throw new Error('Invalid email or password');
      const token = jwt.sign({ id: driver._id, role: 'driver' }, process.env.JWT_SECRET!, { expiresIn: '7d' });
      return { token, role: 'driver' };
    },
    deleteUser: async (_: any, { id }: any) => {
      await connectDB();
      const user = await User.findByIdAndDelete(id);
      return user ? { ...user.toObject(), id: user._id.toString() } : null;
    },
    deleteDriver: async (_: any, { id }: any) => {
      await connectDB();
      const driver = await Driver.findByIdAndDelete(id);
      return driver ? { ...driver.toObject(), id: driver._id.toString() } : null;
    },
    createDriverOffer: async (_: any, { driverId, destinations, seats, price, description }: any) => {
      await connectDB();
      const offer = await DriverOffer.create({ driverId, destinations, seats, price, description });
      const driver = await Driver.findById(driverId).lean() as any;
      return { ...offer.toObject(), id: offer._id.toString(), driverName: driver?.name || 'Unknown', createdAt: offer.createdAt?.toISOString(), bookings: [] };
    },
    bookTrip: async (_: any, { offerId, userId, userName, userEmail }: any) => {
      await connectDB();
      const offer = await DriverOffer.findById(offerId).lean() as any;
      if (!offer) throw new Error('Offer not found');
      const booking = await Booking.create({ offerId, userId, userName, userEmail, status: 'pending' });
      const driver = await Driver.findById(offer.driverId).lean() as any;
      if (driver?.email && process.env.RESEND_API_KEY) {
        await resend.emails.send({
          from: 'SchoolTrip.ge <noreply@schooltrip.ge>',
          to: driver.email,
          subject: 'New Trip Booking!',
          html: `<h2>New booking on your trip</h2><p><strong>${userName}</strong> (${userEmail}) has booked your trip.</p><p><strong>Destinations:</strong> ${offer.destinations.join(', ')}</p><p><strong>Price:</strong> ₾${offer.price}</p>`,
        });
      }
      return { ...booking.toObject(), id: booking._id.toString(), status: 'pending', createdAt: booking.createdAt?.toISOString() };
    },
    deleteDriverOffer: async (_: any, { id }: any) => {
      await connectDB();
      return await DriverOffer.findByIdAndDelete(id);
    },
    updateDriverOffer: async (_: any, { id, ...args }: any) => {
      await connectDB();
      return await DriverOffer.findByIdAndUpdate(id, args, { new: true });
    },
    confirmBooking: async (_: any, { bookingId }: { bookingId: string }) => {
      await connectDB();
      const booking = await Booking.findByIdAndUpdate(bookingId, { status: 'confirmed' }, { new: true }).lean() as any;
      if (!booking) throw new Error('Booking not found');
      return { ...booking, id: booking._id.toString(), status: booking.status, createdAt: booking.createdAt?.toISOString() };
    },
    declineBooking: async (_: any, { bookingId }: { bookingId: string }) => {
      await connectDB();
      const booking = await Booking.findByIdAndUpdate(bookingId, { status: 'declined' }, { new: true }).lean() as any;
      if (!booking) throw new Error('Booking not found');
      return { ...booking, id: booking._id.toString(), status: booking.status, createdAt: booking.createdAt?.toISOString() };
    },
    addAdmin: async (_: any, { name, email, password }: any, context: any) => {
      await requireAdmin(context);
      await connectDB();
      const exists = await Admin.findOne({ email });
      if (exists) return { success: false, message: `${email} is already an admin.`, admin: null };
      const newAdmin = await Admin.create({ name, email, password });
      return {
        success: true, message: `${email} added.`,
        admin: { id: newAdmin._id.toString(), name: newAdmin.name, email: newAdmin.email, createdAt: newAdmin._id.getTimestamp().toISOString() },
      };
    },
    removeAdmin: async (_: any, { email }: any, context: any) => {
      const caller = await requireAdmin(context);
      await connectDB();
      if ((caller as any).email === email) return { success: false, message: "Can't remove yourself.", admin: null };
      const deleted = await Admin.findOneAndDelete({ email });
      if (!deleted) return { success: false, message: "Admin not found.", admin: null };
      return {
        success: true, message: `${email} removed.`,
        admin: { id: deleted._id.toString(), name: deleted.name, email: deleted.email, createdAt: deleted._id.getTimestamp().toISOString() },
      };
    },
  },
};  