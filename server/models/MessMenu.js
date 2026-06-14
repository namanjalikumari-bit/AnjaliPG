import mongoose from 'mongoose';

const messMenuSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true,
      unique: true,
    },
    breakfast: { type: String, default: '' },
    lunch: { type: String, default: '' },
    snacks: { type: String, default: '' },
    dinner: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('MessMenu', messMenuSchema);
