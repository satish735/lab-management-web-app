import mongoose from 'mongoose';

const { Schema } = mongoose;

const AdminLoginSchema = new Schema({
  email: { type: String, required: true, unique: true },
  bcryptPassword: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  phone: { type: String },
  name: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  dob: { type: Date, required: true },
  image: { type: String },
  is_delete: { type: Boolean, default: false },

});

export default mongoose.models.AdminLogin || mongoose.model('AdminLogin', AdminLoginSchema);
