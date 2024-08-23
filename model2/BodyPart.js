import mongoose from 'mongoose';
import slugify from 'slugify';

const { Schema } = mongoose;

const BodyPartSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String },
  slug: { type: String, unique: true },
  is_delete: { type: Boolean, default: false }
});


BodyPartSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { replacement: "-", lower: true });
  next();
});

export default mongoose.models.BodyPart || mongoose.model('BodyPart', BodyPartSchema);
