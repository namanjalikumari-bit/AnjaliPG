import mongoose from 'mongoose';

const bookingRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], default: 'male' },
    roomType: { type: String, enum: ['single', 'double', 'triple'], required: true },
    college: { type: String, default: '' },
    message: { type: String, default: '' },
    moveInDate: { type: Date },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  },
  { timestamps: true }
);

export default mongoose.model('BookingRequest', bookingRequestSchema);
