const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the BookingActivity schema
const bookingActivitySchema = new Schema({
  bookingId: {
    type: Schema.Types.ObjectId,
    ref: 'Booking', // Reference to the Booking model
    required: true
  },
  // userId: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User', // Reference to the User model who performed the activity
  //   required: true
  // },
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

// Create the BookingActivity model
export default mongoose.models.BookingActivity || mongoose.model('BookingActivity', bookingActivitySchema);

