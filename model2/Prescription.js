import mongoose from 'mongoose';

const { Schema } = mongoose;

const PrescriptionSchema = new Schema({
  prescriptionId: { type: String, required: true, unique: true },
  time: { type: Date, required: true },
  prescriptionFile: { type: String },
  prescriptionUser: { type: Schema.Types.ObjectId, ref: 'UserDetails' },
  is_delete: { type: Boolean, default: false }
});

export default mongoose.models.Prescription || mongoose.model('Prescription', PrescriptionSchema);
