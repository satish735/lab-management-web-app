import mongoose from 'mongoose';

const { Schema } = mongoose;

const BlogFAQSchema = new Schema({
  faqsId: { type: Schema.Types.ObjectId, ref: 'FAQ', required: true },
  blogId: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
  is_delete: { type: Boolean, default: false }
});

export default mongoose.models.BlogFAQ || mongoose.model('BlogFAQ', BlogFAQSchema);
