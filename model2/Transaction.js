const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Transaction schema
const transactionSchema = new Schema({
  sequence: {
    type: Number,
    unique: true
  },
  transactionId: {
    type: String,
    // required: true,
    unique: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true,
    default: 'INR' // Default currency is INR (Indian Rupee)
  },
  transactionType: {
    type: String,
    enum: ['booking', 'refund'],
    required: true,
    default: "booking"
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    required: true,
    default: "application"
  },
  transactionDate: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String
  },
  referenceTransactionId: {
    type: String // Reference to another transaction if applicable
  },
  bookingId: [{
    type: Schema.Types.ObjectId,
    ref: 'Booking' // Reference to the Booking model
  }],
  transactionDetails: {
    type: Map,
    of: Schema.Types.Mixed // Values in the map can be any type
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Pre-save hook to generate and set the transactionId
transactionSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      // Find the latest transaction document
      const lastTransaction = await mongoose.model('Transaction').findOne().sort({ sequence: -1 });

      if (lastTransaction) {
        // Extract the last transaction ID number
        // const lastId = parseInt(lastTransaction.transactionId.replace('TXN-', ''), 10);
        const newId = lastTransaction?.sequence + 1;
        this.transactionId = `TXN-${newId}`;
        this.sequence = newId
      } else {
        // Start with TXN-1 if no previous transactions exist
        this.transactionId = 'TXN-1';
        this.sequence = 1
      }

      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

// Create the Transaction model
export default mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);

