import mongoose from 'mongoose';
import slugify from 'slugify';

const { Schema } = mongoose;

const OpeningSchema = new Schema({
  center: { type: String },
  department: { type: String },
  jobType: { type: String, enum: ['full time', 'part time'] },
  experience: { type: String },
  createdAt: { type: Date, default: Date.now },
  name: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'StaffMember' },
  closedAt: { type: Date },
  description: { type: String },
  is_delete: { type: Boolean, default: false },
  slug: { type: String, unique: true },
  publishedAt: { type: Date, default: null },
});


OpeningSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { replacement: "-", lower: true });
  next();
});

export default mongoose.models.Opening || mongoose.model('Opening', OpeningSchema);
