import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserMembershipCardSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'UserDetails', required: true },
  membershipId: { type: Schema.Types.ObjectId, ref: 'Membership', required: true },
  cardId: { type: String, required: true },
  membershipStart: { type: Date, required: true },
  membershipEnd: { type: Date, required: true },
  amount: { type: Number, required: true },
  discount: { type: Number },
  cardStatus: { type: String },
  cardPaymentStatus: { type: String },
  transactionId: { type: String },
  paymentType: { type: String },
  is_delete: { type: Boolean, default: false },
 
});


export default mongoose.models.UserMembershipCard || mongoose.model('UserMembershipCard', UserMembershipCardSchema);
