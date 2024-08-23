// models/HealthBulletin.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const FAQSchema = new Schema(
    {
        question: { type: String, required: true },
        answer: { type: String, required: true },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: false,
        },

    },
    { timestamps: true }
);

export default mongoose.models.faqs || mongoose.model("faqs", FAQSchema);
