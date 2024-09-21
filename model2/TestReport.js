const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the TestReports schema
const testReportSchema = new Schema(
  {
    reportId: {
      type: String,
      unique: true
    },
    testId: {
      type: Schema.Types.ObjectId,
      ref: "PackageTest", // Reference to the PackageTest model
      required: true,
    },
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: "Booking", // Reference to the Booking model
      required: true
    },
    teamMemberId: {
      type: Schema.Types.ObjectId,
      ref: "UserDetails", // Reference to the UserDetails model
      required: true
    },
    generatedBy: {
      type: Schema.Types.ObjectId,
      ref: "Employee", // Reference to the Employee model
    },
    generatedByName: {
      type: String,
      required: true
    },
    generatedByContact: {
      type: String,
      required: true
    },
    reportFile: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);



// Pre-save hook to generate and set the reportId
testReportSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      // Find the latest report document
      const lastReport = await mongoose.model('TestReport').findOne().sort({ createdAt: -1 });
      if (lastReport) {
        // Extract the last reportId 
        const lastId = parseInt(lastReport.reportId.replace('RPRT-', ''), 10);
        const newId = lastId + 1;
        this.reportId = `RPRT-${newId}`;
      } else {
        // If no reportId exist, start with RPRT-1
        this.reportId = 'RPRT-1';
      }

      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});
// Create the TestReports model
export default mongoose.models.TestReport ||
  mongoose.model("TestReport", testReportSchema);
