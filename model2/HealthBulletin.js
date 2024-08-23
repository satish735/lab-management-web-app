import mongoose from 'mongoose';

const { Schema } = mongoose;

const HealthBulletinSchema = new Schema({
  name: { type: String, required: true },
  broucher_link: [
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
  backgroundLink: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'StaffMember' },
  isPublished: { type: Boolean, default: false },
  is_delete: { type: Boolean, default: false },

});

export default mongoose.models.HealthBulletin || mongoose.model('HealthBulletin', HealthBulletinSchema);
