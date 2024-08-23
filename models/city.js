const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CitySchema = new Schema({
  name: {
    type: String,
  },
  state_code: {
    type: String,
  },
  state_name: {
    type: String,
  },
  country_code: {
    type: String,
  },
  country_name: {
    type: String,
  },
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },
});

module.exports = mongoose.models.City || mongoose.model("City", CitySchema);
