import mongoose from 'mongoose';
import Email from 'next-auth/providers/email';

const { Schema } = mongoose;

const ContactUsSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  interestedIn: { type: String },
  message: { type: String },
  city: { type: String, required: true },
  status: { type: String, required: true },
  is_delete: { type: Boolean, default: false }
});


export default mongoose.models.ContactUs || mongoose.model('ContactUs', ContactUsSchema);
