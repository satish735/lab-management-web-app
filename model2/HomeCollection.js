const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the HomeCollection schema
const homeCollectionSchema = new Schema({
  bookingId: {
    type: Schema.Types.ObjectId,
    ref: 'Booking', // Reference to the Booking model
    required: true
  },
  selectedCollectionDate: {
    type: Date,
    required: true
  },
  selectedCollectionTime: {
    type: String, // Time format, e.g., "07:00 PM"
    required: true
  },
  originalCollectionDate: {
    type: Date
  },
  originalCollectionTime: {
    type: String // Time format, e.g., "07:00 PM"
  },
  collectionStatus: {
    type: String,
    enum: ['picked', 'confirmed', 'pending', 'cancelled'], // Enum for various statuses
    default: 'pending'
  },
  samplesToBeCollected: {
    type: [String], // Array of sample names or IDs
    required: true
  },
  samplesCollected: {
    type: [String] // Array of collected sample names or IDs
  },
  collectedBy: {
    type: Schema.Types.ObjectId,
    ref: 'Employee' // Reference to the Employee model
  },
  collectedByName: {
    type: String
  },
  collectedByContact: {
    type: String
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Define a virtual field for the HomeCollectionActivity
homeCollectionSchema.virtual('activities', {
  ref: 'HomeCollectionActivity', // The model to use
  localField: '_id', // Field in the HomeCollection model
  foreignField: 'homeCollectionId', // Field in the Activity model
  justOne: false // Return multiple documents
});

// Ensure virtual fields are included in toJSON output
homeCollectionSchema.set('toJSON', { virtuals: true });
homeCollectionSchema.set('toObject', { virtuals: true });

// Create the HomeCollection model
export default mongoose.models.HomeCollection || mongoose.model('HomeCollection', homeCollectionSchema);
