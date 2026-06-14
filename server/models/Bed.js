import mongoose from 'mongoose';

const bedSchema = new mongoose.Schema(
  {
    bedNumber: { type: String, required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    status: { type: String, enum: ['available', 'occupied', 'maintenance'], default: 'available' },
    occupant: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentProfile', default: null },
  },
  { timestamps: true }
);

bedSchema.index({ room: 1, bedNumber: 1 }, { unique: true });

export default mongoose.model('Bed', bedSchema);
