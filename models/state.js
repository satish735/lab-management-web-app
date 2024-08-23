const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StateSchema = new Schema({
  name: {
    type: String,
  },
  country_code: {
    type: String,
  },
  country_name: {
    type: String,
  },
  state_code: {
    type: String,
  },
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },
});

module.exports = mongoose.models.State || mongoose.model("State", StateSchema);
