import mongoose from 'mongoose';

const { Schema } = mongoose;

const StaffMemberSchema = new Schema({
  name: { type: String, required: true },
  gender: { type: String },
  phone: { type: String },
  email: { type: String },
  post: { type: String },
  linkedIn: { type: String },
  qualification: { type: String },
  qualificationDescription: { type: String },
  type: { type: String, enum: ['core', 'scientific'], required: true },
  image: { type: String },
  sequence: { type: Number },
  experience: { type: Number },
  is_delete: { type: Boolean, default: false },
});

export default mongoose.models.StaffMember || mongoose.model('StaffMember', StaffMemberSchema);
