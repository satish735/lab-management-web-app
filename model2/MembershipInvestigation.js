import mongoose from 'mongoose';

const { Schema } = mongoose;
// Need to be discussed
const MembershipInvestigationSchema = new Schema({
  investigationName: { type: String, required: true },
  investigationId: { type: String, required: true },
  totalCount: { type: Number },
 
});



export default mongoose.models.MembershipInvestigation || mongoose.model('MembershipInvestigation', MembershipInvestigationSchema);


// age crtria  ,