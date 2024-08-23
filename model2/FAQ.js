import mongoose from 'mongoose';

const { Schema } = mongoose;

const FAQSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  is_home: { type: Boolean, default: false },
  is_delete: { type: Boolean, default: false }
});


export default mongoose.models.FAQ || mongoose.model('FAQ', FAQSchema);
