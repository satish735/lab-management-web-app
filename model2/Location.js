import mongoose from 'mongoose';

const { Schema } = mongoose;

const LocationSchema = new Schema({
    selectedLocation: {
        type: String,
        required: true,
      }
 });

export default mongoose.models.Location || mongoose.model('Location', LocationSchema);
