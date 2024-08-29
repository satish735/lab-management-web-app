const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the SlotDate schema
const slotDateSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  day: {
    type: String,
    enum: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
    required: true
  },
  centerId: {
    type: Schema.Types.ObjectId,
    ref: 'Center', // Reference to the Center model
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'holiday', 'cancelled'],
    default: 'active'
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create the SlotDate model
export default mongoose.models.SlotDate || mongoose.model('SlotDate', slotDateSchema);
