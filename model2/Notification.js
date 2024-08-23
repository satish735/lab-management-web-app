import mongoose from 'mongoose';

const { Schema } = mongoose;

const NotificationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'UserDetails', required: true },
  notificationHeader: { type: String, required: true },
  notificationDescription: { type: String, required: true },
  dateTime: { type: Date, required: true },
  isRead: { type: Boolean, default: false },
  sentBy: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'AdminLogin' },
  is_delete: { type: Boolean, default: false },
 
});

export default mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);
