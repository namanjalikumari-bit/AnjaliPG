import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ['rooms', 'common', 'dining', 'events', 'gym', 'study', 'other'],
      default: 'other',
    },
    image: { type: String, required: true },
    key: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Gallery', gallerySchema);
