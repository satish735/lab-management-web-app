import mongoose from 'mongoose';
import slugify from 'slugify';
// need to be completed in future
const { Schema } = mongoose;
// Define enums for user types and discount types
const UserTypeEnum = ['all', 'individual', 'new_members'];
const DiscountTypeEnum = ['percentage', 'fixed'];
const CouponSchema = new Schema({
  couponCode: {
    type: String,
    required: true,
    minlength: 5,
    unique: true,
  },
  couponName: {
    type: String,
    default: 'Unnamed Coupon',
  },
  userType: {
    type: String,
    enum: UserTypeEnum,
    required: true,
  },
  selectedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserDetails',
    validate: {
      validator: function (v) {
        // Ensure that selectedUsers is only used if userType is 'individual'
        return this.userType !== 'individual' || (Array.isArray(v) && v.length > 0);
      },
      message: 'Selected users must be specified if userType is "individual".'
    }
  }],
  expirationDate: {
    type: Date,
    default: null,
  },
  startDate: {
    type: Date,
    default: null,
  },
  maxUsage: {
    type: Number,
    min: 1,
    default: 1,
  },
  maxUsagePerUser: {
    type: Number,
    min: 1,
    default: 1,
  },
  discountType: {
    type: String,
    enum: DiscountTypeEnum,
    required: true,
  },
  discountValue: {
    type: Number,
    min: 0.01,
    required: true,
  },
  selectedCriteria: {
    type: Schema.Types.Mixed, // Allows for storing JSON-like structures
    default: {},
  },
  descriptionShort: {
    type: String,
    required: true,
  },
  descriptionLong: {
    type: String,
    default: '',
  },
  selectedCenters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Center',
  }],
  status: { type: String, enum: ['active', 'draft', "expired"], required: true },
  is_delete: { type: Boolean, default: false },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

CouponSchema.pre("save", function (next) {
  next();
});
export default mongoose.models.Coupon || mongoose.model('Coupon', CouponSchema);


// selectedCriteria
// testCondition: array of selected testconditions || "*"
// HealthCondition : array of selected HealthCondition || "*"
// BodyPart : array of selected body parts || "*"
// Packages : array of selected packaes || "*" 
