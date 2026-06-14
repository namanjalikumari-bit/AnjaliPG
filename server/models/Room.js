import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    roomNumber: { type: String, required: true, unique: true },
    type: { type: String, enum: ['single', 'double', 'triple'], required: true },
    floor: { type: Number, default: 0 },
    price: { type: Number, required: true },
    capacity: { type: Number, required: true },
    amenities: [{ type: String }],
    images: [{ type: String }],
    description: { type: String, default: '' },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Room', roomSchema);
