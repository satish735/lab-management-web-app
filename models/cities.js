const mongoose = require('mongoose');
const { Schema } = mongoose;


const citiesSchema = new Schema({
  cityid: { type: Number, required: true, unique: true },
  cityname: { type: String, required: true },
  querycityname: { type: String, required: true },
  panel_id: { type: Number, required: true },
  panelname: { type: String, required: true },
  longitude: { type: String, required: true },
  latitude: { type: String, required: true },
  status: { type: Number, required: true },
  slug: { type: String, required: true },
  metatitle: { type: String, required: true },
  metadescription: { type: String, required: true },
  keywords: { type: [String], required: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
});

module.exports = mongoose.model('cities', citiesSchema);
