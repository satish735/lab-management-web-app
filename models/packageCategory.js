const mongoose = require('mongoose');
const { Schema } = mongoose;


const packageCategorySchema = new Schema({

  name: { type: String, required: true },
});

module.exports = mongoose.model('packagecategory', packageCategorySchema);
