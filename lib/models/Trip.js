import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  TotalParticipants: { type: Number, required: true },
  Destination: { type: String, required: true },
  Menu: { type: String, required: true },
  Cost: { type: Number, required: true },
});

export const Trip = mongoose.models.Trip || mongoose.model('Trip', tripSchema);