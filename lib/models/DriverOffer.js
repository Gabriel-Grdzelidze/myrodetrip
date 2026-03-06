import mongoose from 'mongoose';

const DriverOfferSchema = new mongoose.Schema({
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
  destinations: { type: [String], required: true },
  seats: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.DriverOffer || mongoose.model('DriverOffer', DriverOfferSchema);