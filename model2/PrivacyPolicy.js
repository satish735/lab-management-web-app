import mongoose from 'mongoose';

const { Schema } = mongoose;

const PrivacyPolicyAndOthersSchema = new Schema({
  type: { type: String, required: true },
  description: { type: String, required: true },
  is_delete: { type: Boolean, default: false },
 
});

export default mongoose.models.PrivacyPolicyAndOthers || mongoose.model('PrivacyPolicyAndOthers', PrivacyPolicyAndOthersSchema);
