import mongoose from 'mongoose';
const { Schema } = mongoose;

const AdminLoginSchema = new Schema({
  email: { type: String, required: true, unique: true },
  bcryptPassword: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  phone: { type: String },
  name: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  dob: { type: Date, required: true },
  image: { type: String },
  iscenter: [{
    type: Schema.Types.Mixed,
    validate: {
      validator: function (value) {
        // Allow "*" or check if the value is a valid ObjectId
        return value === '*' || Types.ObjectId.isValid(value);
      },
      message: props => `${props.value} is not a valid ObjectId or "*" for full access.`
    },
    ref: "Center" // Adding reference for ObjectId type values
  }],
  currentCenter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Center"
  },
  is_delete: { type: Boolean, default: false }
});

export default mongoose.models.AdminLogin || mongoose.model('AdminLogin', AdminLoginSchema);
