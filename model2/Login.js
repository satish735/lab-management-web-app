import mongoose from 'mongoose';

const { Schema } = mongoose;

const LoginSchema = new Schema({
  phone: { type: String, required: true },
  otp: { type: String, required: false },
  otpExpire: { type: Date, required: false },
  is_delete: { type: Boolean, default: false },
 
});

export default mongoose.models.Login || mongoose.model('Login', LoginSchema);
