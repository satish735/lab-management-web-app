 
const mongoose = require('mongoose');
const { Schema } = mongoose;

const testPackageSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  slug: { type: String, required: true },
  description: { type: String, required: true },
  // body_parts_type: { type: String, default: "" },  multiple
  // medical_conditions: { type: String, default: "" },
  observations: { type: String, required: true },
  no_of_test_done: { type: Number, required: true },
  test_type: { type: String, required: false },
  // nearme: { type: [String] },
  gender: { type: String, required: false },
  age_group: { type: String, required: false },
  requirements: { type: Schema.Types.Mixed },
  features: { type: Schema.Types.Mixed }
});
//  faq  ,  center
 

export default mongoose.models.testpackage || mongoose.model('testpackage', testPackageSchema);
