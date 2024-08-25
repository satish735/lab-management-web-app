import mongoose from "mongoose";
import slugify from "slugify";
const { Schema } = mongoose;

const CenterSchema = new Schema({
  centreId: { type: Number, required: true, unique: true },
  centre: { type: String, required: true, unique: true },
  centreNameInApp: { type: String, required: true },//to be removed 
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

CenterSchema.pre("save", function (next) {
  this.slug = slugify(this.centre, { replacement: "-", lower: true });
  next();
});

CenterSchema.pre("save", async function (next) {
  if (this.isNew) {
    const lastCentre = await mongoose
      .model("Center")
      .findOne()
      .sort({ centreId: -1 });
    const lastId = lastCentre
      ? parseInt(lastCentre.centreId.replace("center", ""))
      : 0;
    if (lastId >= 99999) {
      this.centreId = `center${lastId + 1}`;
    } else {
      this.centreId = `center${String(lastId + 1).padStart(5, "0")}`;
    }
  }
  next();
});
export default mongoose.models.Center || mongoose.model("Center", CenterSchema);
