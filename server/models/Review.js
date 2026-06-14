import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    avatar: { type: String, default: '' },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Review', reviewSchema);
