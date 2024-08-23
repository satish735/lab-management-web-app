import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserMembershipsSchema = new Schema({
  membershipCardId: { type: Schema.Types.ObjectId, ref: 'UserMembershipCard', required: true },
  type: { type: String, enum: ['self', 'parent', 'dependent'], required: true },
  userDetails: { type: Schema.Types.ObjectId, ref: 'UserDetails', required: true },
  is_delete: { type: Boolean, default: false },
  slug: { type: String, unique: true },
});




export default mongoose.models.UserMemberships || mongoose.model('UserMemberships', UserMembershipsSchema);
