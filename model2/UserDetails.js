import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserDetailsSchema = new Schema({
  contactPhone: { type: String },
  name: { type: String, required: true },
  email: { type: String },//to be discuss unique ness
  gender: { type: String },
  relation: { type: String },
  image: { type: String },
  dob: { type: Date },
  status: { type: String },
  deleted: { type: Boolean, default: false },
  is_delete: { type: Boolean, default: false },
  loginId: {
    type: Schema.Types.ObjectId,
    ref: 'Login',
    required: true
  },
});


export default mongoose.models.UserDetails || mongoose.model('UserDetails', UserDetailsSchema);
