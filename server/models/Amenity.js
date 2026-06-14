import mongoose from 'mongoose';

const amenitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    icon: { type: String, default: 'star' },
    category: {
      type: String,
      enum: ['room', 'common', 'service'],
      default: 'room',
    },
    description: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Amenity', amenitySchema);
