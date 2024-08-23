const mongoose = require('mongoose');
const { Schema } = mongoose;



const testConditionsSchema = new Schema({
  name: { type: String, required: true },
  image: {
    data: Buffer, 
    contentType: String 
},
  slug: { type: String, required: true },
});

module.exports = mongoose.model('testconditions', testConditionsSchema);
