import mongoose from 'mongoose';

const { Schema } = mongoose;

const PackageFAQSchema = new Schema({
  faqsId: { type: Schema.Types.ObjectId, ref: 'FAQ', required: true },
  packageId: { type: Schema.Types.ObjectId, ref: 'Package', required: true },
  is_delete: { type: Boolean, default: false }
});

export default mongoose.models.PackageFAQ || mongoose.model('PackageFAQ', PackageFAQSchema);
