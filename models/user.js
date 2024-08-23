// models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    default: null,
    unique: true,
  },
  password: {
    type: String,
    default: null,
  },
  phone: {
    type: Number,
    required: false,
    unique: true,
  },
  otp: {
    type: Number,
    default: null,
  },
  otpExpire: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ['user', 'admin'], 
    default: 'user',
  },
  token: {
    type: String,
    default: null,
  },
  tokenGenDate: {
    type: Date,
    default: null,
  },
});

export default mongoose.models.user || mongoose.model('user', UserSchema);
