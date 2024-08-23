import mongoose from 'mongoose';

const { Schema } = mongoose;

const EnquirySchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number },
  number: { type: String },
  alternateNumber: { type: String },
  emailAddress: { type: String },
  city: { type: String },
  state: { type: String },
  isExperienced: { type: Boolean },
  otherDetails: { type: String },
  is_delete: { type: Boolean, default: false }
});

export default mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);
