import mongoose from "mongoose";

const { Schema } = mongoose;

const TempFileSchema = new Schema(
  {
    file_path: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.models.TempFile ||
  mongoose.model("TempFile", TempFileSchema);
