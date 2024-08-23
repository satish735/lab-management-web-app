import mongoose from 'mongoose';
import slugify from 'slugify';

const { Schema } = mongoose;

const FacilitySchema = new Schema({
  name: { type: String, required: true },
  is_delete: { type: Boolean, default: false },
  slug: { type: String, unique: true }
});


FacilitySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { replacement: "-", lower: true });
  next();
});
export default mongoose.models.Facility || mongoose.model('Facility', FacilitySchema);
