const mongoose = require('mongoose');
const { Schema } = mongoose;


const facilitySchema = new Schema({
 
  facility: { type: String, required: true },
});

module.exports = mongoose.model('facility', facilitySchema);
