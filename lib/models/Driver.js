import mongoose from "mongoose";

const Driver = new mongoose.Schema({
  name: { type: String, required: true },
  idNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.models.Driver || mongoose.model("Driver", Driver);
