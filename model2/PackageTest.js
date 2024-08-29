import mongoose from 'mongoose';
import slugify from 'slugify';

const { Schema } = mongoose;

const PackageTestSchema = new Schema({
  itemId: [{ type: Schema.Types.ObjectId, ref: 'PackageTest' }],
  id: { type: String },
  name: { type: String, required: true },//For Test
  rate: { type: Number, required: true },//For Test
  desc: { type: String },//For Test
  preTestInfo: { type: String },//For Test
  bodyParts: [{ type: Schema.Types.ObjectId, ref: 'BodyPart' }],//For Test
  conditions: [{ type: Schema.Types.ObjectId, ref: 'TestCondition' }],//For Test
  totalMrp: { type: Number },//For Package
  gender: { type: String, enum: ['male', 'female', 'both'] },//For Test
  fromAge: { type: Number },//For Test
  toAge: { type: Number },//For Test
  observation: [{ type: String }],//For Test
  discountPercentage: { type: Number },//For Package
  reportGenerationTime: { type: String },//For Test
  reportGenerationHours: { type: Number },//For Test
  image: { type: String },//For Test
  testType: { type: String },//For Test
  isBestSeller: { type: Boolean, default: false },
  sampleType: { type: String },//For Test
  parameterName: { type: String },
  homeCollection: { type: Boolean, default: false },//For Test
  isTrigger: { type: Boolean, default: false },
  aliasName: { type: String },
  slug: { type: String, unique: true },
  seoKeyword: { type: String },
  seoTitle: { type: String },
  seoDescription: { type: String },
  testCost: { type: Number },//For Test
  nearMe: { type: Boolean, default: false },
  whatIsTestPackage: { type: String },
  whatIsThePurpose: { type: String },
  whenProfileRecommended: { type: String },
  sampleCollection: { type: String },//For Test
  preparation: { type: String },
  packageTestList: [{ type: String }],
  editorContent: { type: String },
  publishedAt: { type: Date },
  is_delete: { type: Boolean, default: false },
  slug: { type: String, unique: true }
});


PackageTestSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { replacement: "-", lower: true });
  next();
});

export default mongoose.models.PackageTest || mongoose.model('PackageTest', PackageTestSchema);



 