import mongoose from 'mongoose';

const { Schema } = mongoose;

const PartnerWithUschema = new Schema({
  text: { type: String, required: true },
  type: { type: String, required: true },
  is_delete: { type: Boolean, default: false }
});


export default mongoose.models.PartnerWithUs || mongoose.model('PartnerWithUs', PartnerWithUschema);
