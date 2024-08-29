const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the SlotTime schema
const slotTimeSchema = new Schema({
  slotStartTime: {
    type: String, // Time format like "07:00 PM", "08:00 AM"
    required: true
  },
  slotDate: {
    type: Schema.Types.ObjectId,
    ref: 'SlotDate', // Reference to the SlotDate model
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'holiday', 'cancelled'],
    default: 'active'
  },
  timeInterval: {
    type: Number, // Duration in minutes
    required: true
  }
  ,
  maxUse: {
    type: Number, // Duration in minutes
    required: true,
    default: 0
  },
  currentUse: {
    type: Number, // Duration in minutes
    required: true,
    default: 0
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create the SlotTime model
export default mongoose.models.SlotTime || mongoose.model('SlotTime', slotTimeSchema);

