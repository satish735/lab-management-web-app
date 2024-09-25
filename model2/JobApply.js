import mongoose from 'mongoose';

const { Schema } = mongoose;

const JobApplySchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  experienceYear: { type: Number, required: true },
  experienceMonth: { type: Number, required: true },
  resume: [
    {
      file: { path: String },
      fileName: String,
      fileSize: Number,
      uId: String,
      uploadStatus: String,
      uploadMessage: String,
      uploadLink: String,
      uploadedKey: String,
      filePath: String,
      fileExtension: String,
      fileType: String,
    }
  ],
  currentSalary: { type: Number, required: true },
  expectedSalary: { type: Number, required: true },
  availableToJoin: { type: String, required: true },
  currentLocation: { type: String, required: true },
  skill: { type: String },
  additionalDetails: [
    {
      file: { path: String },
      fileName: String,
      fileSize: Number,
      uId: String,
      uploadStatus: String,
      uploadMessage: String,
      uploadLink: String,
      uploadedKey: String,
      filePath: String,
      fileExtension: String,
      fileType: String,
    }
  ],
  gender: { type: String },
  isExperienced: { type: Boolean, default: false },
  is_delete: { type: Boolean, default: false },
  experienceData: [{ type: Schema.Types.Mixed, default: {} }],
  forOpening: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Opening',
    required: true,
  },
  status: { type: String },

});

export default mongoose.models.JobApply || mongoose.model('JobApply', JobApplySchema);

