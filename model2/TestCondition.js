import mongoose from 'mongoose';

const { Schema } = mongoose;

const TestConditionSchema = new Schema({
  name: { type: String, required: true,unique:true },
  image: { type: String },
  is_delete: { type: Boolean, default: false }
});

export default mongoose.models.TestCondition || mongoose.model('TestCondition', TestConditionSchema);
