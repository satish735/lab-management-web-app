import mongoose from 'mongoose';

const { Schema } = mongoose;

const MilestoneSchema = new Schema({
  year: { type: Number, required: true },
  title: { type: String, required: true },
  desc: { type: String },
 
});

export default mongoose.models.Milestone || mongoose.model('Milestone', MilestoneSchema);
