import mongoose from 'mongoose';
const { Schema } = mongoose;
const LoginSchema = new Schema({
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
  token: {
    type: String,
    default: null,
  },
  tokenGenDate: {
    type: Date,
    default: null,
  },
  selectedCity: {
    type: String,
  },
  is_delete: { type: Boolean, default: false }
});

export default mongoose.models.Login || mongoose.model('Login', LoginSchema);
