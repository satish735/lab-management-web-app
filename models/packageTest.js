const mongoose = require('mongoose');
const { Schema } = mongoose;

// PackageTest Schema
const packageTestSchema = new Schema({
  investigation: { type: String, required: true },
  parametername: { type: String },
  packageid: { type: String, required: true },
  mrp: { type: Number, required: true },
  slug: { type: String, required: true },
  seokeyword: { type: String }
});


module.exports = mongoose.model('packagetest', packageTestSchema);
