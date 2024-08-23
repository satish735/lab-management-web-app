import mongoose from 'mongoose';

const { Schema } = mongoose;

const ReviewSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  profileImage: { type: String },
  contents: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: 'UserDetails' },
  is_delete: { type: Boolean, default: false },
 
});

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);
