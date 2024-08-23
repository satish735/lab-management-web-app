import mongoose from 'mongoose';

const { Schema } = mongoose;

const AwardAccreditationSchema = new Schema({
  image: { type: String },
  name: { type: String, required: true },
  desc: { type: String },
  time: { type: Date },
  type: { type: String },
  is_delete: { type: Boolean, default: false },
});

export default mongoose.models.AwardAccreditation || mongoose.model('AwardAccreditation', AwardAccreditationSchema);
