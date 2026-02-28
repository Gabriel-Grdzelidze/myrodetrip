import mongoose from "mongoose";

const DestinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

export default mongoose.models