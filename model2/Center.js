import mongoose from "mongoose";
import slugify from "slugify";
const { Schema } = mongoose;

const CenterSchema = new Schema({
  sequence: {
    type: Number,
    unique: true
  },
  centreId: { type: String, required: true, unique: true },
  centre: { type: String, required: true, unique: true },
  // centreNameInApp: { type: String, required: true },//to be removed 
  address: { type: String, required: true },
  address2: { type: String },
  contact: { type: String, required: true },
  pinCode: { type: String, required: true },
  email: { type: String, required: true },
  labOpeningTime: { type: String, required: true },
  labClosingTime: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  labFacilities: [{ type: Schema.Types.ObjectId, ref: "LabFacilities" }],
  is_delete: { type: Boolean, default: false },
  slug: { type: String, unique: true },
  publishedAt: { type: Date, default: null },
  city: { type: String, required: true },
  state: { type: String, required: true },
});

CenterSchema.pre("save", async function (next) {
  // Generate slug
  if (!this.slug) {
    this.slug = slugify(this.centre, { replacement: "-", lower: true });
  }

  // Generate centreId for new documents
  if (this.isNew) {
    const lastCentre = await mongoose
      .model("Center")
      .findOne()
      .sort({ sequence: -1 });
    const lastId = lastCentre?.sequence ?? 0
    // const lastId = lastCentre ? parseInt(lastCentre.centreId.replace("center", "")) : 0;
    if (lastCentre) {
      this.centreId = `Center-${lastId + 1}`;
      this.sequence = lastId + 1
    } else {
      this.centreId = `Center-${1}`;
      this.sequence = 1
    }
  }

  next();
});

export default mongoose.models.Center || mongoose.model("Center", CenterSchema);
