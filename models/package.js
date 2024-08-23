const mongoose = require('mongoose');
const { Schema } = mongoose;


const packageSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  rate: { type: Number, required: true },
  description: { type: String, required: true },
  pretestinfo: { type: String, required: true },
  bodyparts: { type: String, default: "" },
  conditions: { type: String, default: "" },
  totalmrp: { type: Number },
  gender: { type: String, required: true },
  fromage: { type: String},
  toage: { type: String},
  discountpercentage: { type: Number },
  reportgenerationtime: { type: String },
  reportgenerationhours: { type: String },
  image: {
    data: Buffer,
    contentType: String
  },
  testtype: { type: String, required: true },
  isbestseller: { type: Boolean, default: false },
  sampletype: { type: String },
  parametername: { type: String },
  homecollection: { type: Boolean },
  istrigger: { type: Boolean },
  aliasname: { type: String },
  slug: { type: String, required: true },
  seokeyword: { type: String },
  seotitle: { type: String },
  seodescription: { type: String },
  testcost: { type: String },
  nearme: { type: String },
  whatistestpackage: { type: String },
  whatisthepurpose: { type: String },
  whenprofilerecommended: { type: String },
  samplecollection: { type: String },
  preparation: { type: String },
  packagetestlist: { type: [packageTestSchema], default: [] }
});

module.exports = mongoose.model('Package', packageSchema);
