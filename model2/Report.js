import mongoose from 'mongoose';

const { Schema } = mongoose;
// To be discussed
const ReportSchema = new Schema({
  reportId: { type: String, required: true, unique: true },
  time: { type: Date, required: true },
  reportFile: { type: String },
  reportUser: { type: Schema.Types.ObjectId, ref: 'UserDetails' },
  reportCreatedBy: { type: Schema.Types.ObjectId, ref: 'StaffMember' },
  is_delete: { type: Boolean, default: false }
});

export default mongoose.models.Report || mongoose.model('Report', ReportSchema);
