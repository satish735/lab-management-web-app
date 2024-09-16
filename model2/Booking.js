const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Booking schema
const bookingSchema = new Schema({
  bookingId: {
    type: String,
    // required: true,
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
    enum: ['created', 'confirmed', 'process_assigned', 'started', 'collection_done', "sample_reached", "report_approved", "completed"],
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
  slotId: {
    type: Schema.Types.ObjectId,
    ref: 'SlotTime'
  },
  teamMemberId: {
    type: Schema.Types.ObjectId,
    ref: 'UserDetails',
    // required: true
  },
  // testPackageId: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'PackageTest'
  // },
  discount: {
    type: Number,
    // min: 0,
    // max: 100,
    default: 0
  },
  homeCollectionCharge: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true,
    default: 0
  },
  testAmount: {
    type: Number,
    required: true,
    default: 0
  },
  addressId: {
    type: Schema.Types.ObjectId,
    ref: 'Address',
    // required: true
  },
  couponSelectedId: {
    type: Schema.Types.ObjectId,
    ref: 'Coupon'
  },
  membershipUsed: {
    type: Schema.Types.ObjectId,
    ref: 'Membership'
  },
  isCancelled: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true // Mongoose will automatically add createdAt and updatedAt fields
});

// Pre-save hook to generate and set the bookingId
bookingSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      // Find the latest booking document
      const lastBooking = await mongoose.model('Booking').findOne().sort({ createdAt: -1 });

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



// Define a virtual field for homeCollection
bookingSchema.virtual('homeCollection', {
  ref: 'HomeCollection',         // The model to use
  localField: '_id',       // Field in HomeCollection
  foreignField: 'bookingId', // Field in HomeCollection that references Booking
  justOne: true
});

// Define a virtual field for the BookingActivity
bookingSchema.virtual('activities', {
  ref: 'BookingActivity', // The model to use
  localField: '_id', // Field in the Booking model
  foreignField: 'bookingId', // Field in the Activity model
  justOne: false // Return multiple documents
});

// Define a virtual field for the BookingActivity
bookingSchema.virtual('transactions', {
  ref: 'Transaction', // The model to use
  localField: '_id', // Field in the Booking model
  foreignField: 'bookingId', // Field in the Activity model
  justOne: false // Return multiple documents
});

// Ensure virtual fields are included in toJSON output
bookingSchema.set('toJSON', { virtuals: true });
bookingSchema.set('toObject', { virtuals: true });



// Create the Booking model
export default mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

