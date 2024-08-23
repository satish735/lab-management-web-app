import mongoose from 'mongoose';
import slugify from 'slugify';
// need to be completed in future
const { Schema } = mongoose;

const CouponSchema = new Schema({
  name: { type: String, required: true },
  discount: { type: Number, required: true },
  discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
  expiration: { type: Date, required: true },
  is_delete: { type: Boolean, default: false },
  slug: { type: String, unique: true }
});

CouponSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { replacement: "-", lower: true });
  next();
});
export default mongoose.models.Coupon || mongoose.model('Coupon', CouponSchema);
