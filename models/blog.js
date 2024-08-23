import mongoose from "mongoose";
import slugify from "slugify";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category_id: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    is_home: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      unique: true,
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    keywords: {
      type: [String],
    },
    trending: {
      type: Boolean,
      default: false,
    },
    is_popular: {
      type: Boolean,
      default: false,
    },
    published_at: {
      type: Date,
    },
  },
  { timestamps: true }
);
blogSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { replacement: "-", lower: true });
  next();
});
const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
