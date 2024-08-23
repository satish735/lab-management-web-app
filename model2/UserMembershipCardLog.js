import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserMembershipCardLogSchema = new Schema({
  membershipCardId: { type: Schema.Types.ObjectId, ref: 'UserMembershipCard', required: true },
  type: { type: String, enum: ['generate', 'payment_initiated', 'payment_success', 'card_expired'], required: true },
  logDate: { type: Date, required: true },
  userMembershipId: { type: Schema.Types.ObjectId, ref: 'UserMembershipCard', required: true },
  is_delete: { type: Boolean, default: false },
});

export default mongoose.models.UserMembershipCardLog || mongoose.model('UserMembershipCardLog', UserMembershipCardLogSchema);
