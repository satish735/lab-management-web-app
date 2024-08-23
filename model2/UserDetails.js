import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserDetailsSchema = new Schema({
  contactPhone: { type: String },
  name: { type: String, required: true },
  email: { type: String, unique: true },//to be discuss unique ness
  gender: { type: String, enum: ['male', 'female', 'other'] },
  relation: { type: String },
  image: { type: String },
  dob: { type: Date },
  status: { type: String },
  deleted: { type: Boolean, default: false },
  is_delete: { type: Boolean, default: false },
});

export default mongoose.models.UserDetails || mongoose.model('UserDetails', UserDetailsSchema);
