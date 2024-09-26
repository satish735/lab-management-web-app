import mongoose from 'mongoose';

const { Schema } = mongoose;

const AddressSchema = new Schema({
  addressType: { type: String, enum: ['home', 'office', 'other'], required: true },
  houseNo: { type: String },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  phone: { type: String },
  pincode: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'Login', required: true },
  isDelete: { type: Boolean, default: false },
  lat: { type: String },
  lng: { type: String },

});

export default mongoose.models.Address || mongoose.model('Address', AddressSchema);
