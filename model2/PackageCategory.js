import mongoose from 'mongoose';

const { Schema } = mongoose;

const PackageCategorySchema = new Schema({
  name: { type: String, required: true },
  is_delete: { type: Boolean, default: false },
 
});

export default mongoose.models.PackageCategory || mongoose.model('PackageCategory', PackageCategorySchema);
