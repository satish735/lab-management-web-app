const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Booking schema
const bookingSchema = new Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true
  },
  centerId: {
    type: Schema.Types.ObjectId,
    ref: 'Center',
    required: true
  },
  packages: [{
    type: Schema.Types.ObjectId,
    ref: 'PackageTest'
  }],
  status: {
    type: String,
    enum: ['upcoming', 'completed', 'cancelled', 'rescheduled', 'no-show'],
    default: 'upcoming'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentType: {
    type: String,
    enum: ['online', 'cash'],
    required: true
  },
  collectionType: {
    type: String,
    enum: ['lab', 'home'],
    required: true
  },
  slotId: [{
    type: Schema.Types.ObjectId,
    ref: 'SlotTime'
  }, {
    type: Schema.Types.ObjectId,
    ref: 'SlotDate'
  }],
  teamMemberId: {
    type: Schema.Types.ObjectId,
    ref: 'UserDetails',
    required: true
  },
  testPackageId: {
    type: Schema.Types.ObjectId,
    ref: 'PackageTest'
  },
  discount: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  homeCollectionCharge: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true
  },
  addressId: {
    type: Schema.Types.ObjectId,
    ref: 'Address',
    required: true
  },
  couponSelectedId: {
    type: Schema.Types.ObjectId,
    ref: 'Coupon'
  },
  membershipUsed: {
    type: Schema.Types.ObjectId,
    ref: 'Membership'
  }
}, {
  timestamps: true // Mongoose will automatically add createdAt and updatedAt fields
});

// Pre-save hook to generate and set the bookingId
bookingSchema.pre('save', async function(next) {
  if (this.isNew) {
    try {
      // Find the latest booking document
      const lastBooking = await mongoose.model('Booking').findOne().sort({ bookingId: -1 });

      if (lastBooking) {
        // Extract the last booking ID number
        const lastId = parseInt(lastBooking.bookingId.replace('BKN-', ''), 10);
        const newId = lastId + 1;
        this.bookingId = `BKN-${newId}`;
      } else {
        // If no bookings exist, start with BKN-1
        this.bookingId = 'BKN-1';
      }

      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

// Create the Booking model
export default mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

