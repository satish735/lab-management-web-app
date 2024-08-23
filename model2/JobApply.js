import mongoose from 'mongoose';

const { Schema } = mongoose;

const JobApplySchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  resume: { type: String, required: true },
  additionalDetails: { type: String },
  is_delete: { type: Boolean, default: false }
});

export default mongoose.models.JobApply || mongoose.model('JobApply', JobApplySchema);
