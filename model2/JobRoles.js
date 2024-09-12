import mongoose from 'mongoose';

const { Schema } = mongoose;

const JobRolesSchema = new Schema({
    jobRole: { type: String, required: true },
    position: [{ type: String, required: true }],
    is_delete: { type: Boolean, default: false }
});

export default mongoose.models.JobRoles || mongoose.model('JobRoles', JobRolesSchema);
