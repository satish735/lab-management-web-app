const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Transaction schema
const transactionSchema = new Schema({
  transactionId: {
    type: String,
    required: true,
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
    enum: ['credit', 'debit', 'refund'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['credit card', 'debit card', 'paypal', 'bank transfer', 'cash'],
    required: true
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
  bookingId: {
    type: Schema.Types.ObjectId,
    ref: 'Booking' // Reference to the Booking model
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Pre-save hook to generate and set the transactionId
transactionSchema.pre('save', async function(next) {
  if (this.isNew) {
    try {
      // Find the latest transaction document
      const lastTransaction = await mongoose.model('Transaction').findOne().sort({ transactionId: -1 });

      if (lastTransaction) {
        // Extract the last transaction ID number
        const lastId = parseInt(lastTransaction.transactionId.replace('TXN-', ''), 10);
        const newId = lastId + 1;
        this.transactionId = `TXN-${newId}`;
      } else {
        // Start with TXN-1 if no previous transactions exist
        this.transactionId = 'TXN-1';
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

