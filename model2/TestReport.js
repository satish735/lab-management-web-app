const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the TestReports schema
const testReportSchema = new Schema(
  {
    testId: {
      type: Schema.Types.ObjectId,
      ref: "PackageTest", // Reference to the PackageTest model
      required: true,
    },
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: "Booking", // Reference to the Booking model
    },
    teamMemberId: {
      type: Schema.Types.ObjectId,
      ref: "UserDetails", // Reference to the UserDetails model
    },
    generatedBy: {
      type: Schema.Types.ObjectId,
      ref: "Employee", // Reference to the Employee model
    },
    generatedByName: {
      type: String,
    },
    generatedByContact: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the TestReports model
export default mongoose.models.TestReport ||
  mongoose.model("TestReport", testReportSchema);
