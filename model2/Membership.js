import mongoose from 'mongoose';
import slugify from 'slugify';

const { Schema } = mongoose;

const MembershipSchema = new Schema({
  banner: { type: String, required: true },
  name: { type: String, required: true },
  validity: { type: Number },            //Calculated in days
  price: { type: Number, required: true },
  discount: { type: Number },
  discountOnPackagePercentage: { type: Number },
  termsAndConditions: { type: [String] },
  description: { type: String },
  benefits: { type: [String] },
  type: { type: String, enum: ['family', 'senior', 'diabetes'], required: true },
  conditions: {
    age: { type: String },
    dependent: { type: String },
    diabetes: { type: Boolean }
  },//age crtria , no of dependednt
  is_delete: { type: Boolean, default: false },
  slug: { type: String, unique: true },
});


MembershipSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { replacement: "-", lower: true });
  next();
});

export default mongoose.models.Membership || mongoose.model('Membership', MembershipSchema);
