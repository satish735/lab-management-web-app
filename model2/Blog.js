import mongoose from 'mongoose';
import slugify from 'slugify';

const { Schema } = mongoose;

const BlogSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String },
  description: { type: String },
  ckdescription: { type: String },
  category: { type: String },
  image: { type: String },
  is_home: { type: Boolean, default: false },
  slug: { type: String, unique: true },
  seoKeyword: { type: String },
  seoTitle: { type: String },
  seoDescription: { type: String },
  trending: { type: Boolean, default: false },
  isPopular: { type: Boolean, default: false },
  publishedAt: { type: Date },
  is_delete: { type: Boolean, default: false }
});

BlogSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { replacement: "-", lower: true });
  next();
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
