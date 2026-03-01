import mongoose from 'mongoose';

const User = new mongoose.Schema({
  name:      { type: String, required: true },
  idNumber:  { type: String, required: true, unique: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
});

export default mongoose.models.User || mongoose.model('User', User);