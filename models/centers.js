const mongoose = require('mongoose');
const { Schema } = mongoose;


const centersSchema = new Schema({
  centre: { type: String, required: true },
  centrenameinapp: { type: String, required: true },
  address: { type: String, required: true },
  address2: { type: String, default: "" },
  contact: { type: String, required: true },
  pincode: { type: String, default: "" },
  email: { type: String, default: "" },
  labopeningtime: { type: String, required: true },
  labclosingtime: { type: String, required: true },
  centregroupid: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  distance: { type: Number, required: true }
});

module.exports = mongoose.model('Centers', centersSchema);
