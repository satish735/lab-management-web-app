import mongoose from 'mongoose';

const { Schema } = mongoose;

const JobApplySchema = new Schema({
  Name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  resume: { type: String, required: true },
  additionalDetails: { type: String },
  is_delete: { type: Boolean, default: false },
  forOpening: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Opening',
    required: true,
  },
});

export default mongoose.models.JobApply || mongoose.model('JobApply', JobApplySchema);
