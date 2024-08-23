// models/HealthBulletin.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const HealthBulletinSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Bulletin Name is required"],
    },
    brochureLink: {
      type: String,
      required: [true, "Brochure link is required"],
      validate: {
        validator: function (v) {
          return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    backgroundLink: {
      type: String,
      validate: {
        validator: function (v) {
          return v === null || /^(ftp|http|https):\/\/[^ "]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false, // Default value is false
    },
  },
  { timestamps: true }
);

export default mongoose.models.HealthBulletin||mongoose.model("HealthBulletin", HealthBulletinSchema);
