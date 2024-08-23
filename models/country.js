const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CountrySchema = new Schema({
  name: {
    type: String,
  },
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },
  iso2: {
    type: String,
  },
  iso3: {
    type: String,
  },
  numeric_code: {
    type: Number,
  },
});

module.exports =
  mongoose.models.Country || mongoose.model("Country", CountrySchema);
