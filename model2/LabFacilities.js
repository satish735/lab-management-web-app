import mongoose from 'mongoose';

const { Schema } = mongoose;

const LabFacilitiesSchema = new Schema({
  id: { type: Number, required: true },
  facility: { type: String, required: true }
});

export default mongoose.models.LabFacilities || mongoose.model('LabFacilities', LabFacilitiesSchema);
