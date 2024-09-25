import mongoose from 'mongoose';
import slugify from 'slugify';
// need to be completed in future
const { Schema } = mongoose;

const CouponUsageSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDetails',
        required: true,
    },
    couponId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coupon',
        required: true,
    },
    benefit: {
        type: Number,
        required: true,
    },
    benefitType: {
        type: String,
        required: true,
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
}
);

CouponSchema.pre("save", function (next) {
    this.slug = slugify(this.name, { replacement: "-", lower: true });
    next();
});
export default mongoose.models.CouponUsage || mongoose.model('CouponUsage', CouponUsageSchema);
