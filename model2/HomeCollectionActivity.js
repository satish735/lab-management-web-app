const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the HomeCollectionActivity schema
const homeCollectionActivitySchema = new Schema({
  homeCollectionId: {
    type: Schema.Types.ObjectId,
    ref: 'HomeCollection', // Reference to the HomeCollection model
    required: true
  },
  activityType: {
    type: String, // Plain string for activity type
    required: true
  },
  activityDate: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String // Optional field for additional details about the activity
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create the HomeCollectionActivity model
export default mongoose.models.HomeCollectionActivity || mongoose.model('HomeCollectionActivity', homeCollectionActivitySchema);
