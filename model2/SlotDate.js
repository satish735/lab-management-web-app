const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the SlotDate schema
const slotDateSchema = new Schema({
  date: {
    type: String,
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



// Define a virtual field for SlotTimes
slotDateSchema.virtual('slotTimes', {
  ref: 'SlotTime',         // The model to use
  localField: '_id',       // Field in SlotDate
  foreignField: 'slotDate' // Field in SlotTime that references SlotDate
});

// Ensure virtual fields are included in toJSON output
slotDateSchema.set('toJSON', { virtuals: true });
slotDateSchema.set('toObject', { virtuals: true });


// Create the SlotDate model
export default mongoose.models.SlotDate || mongoose.model('SlotDate', slotDateSchema);
