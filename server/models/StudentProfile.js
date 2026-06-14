import mongoose from 'mongoose';

const studentProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    gender: { type: String, enum: ['male', 'female', 'other'], default: 'male' },
    college: { type: String, default: '' },
    course: { type: String, default: '' },
    address: { type: String, default: '' },
    guardianName: { type: String, default: '' },
    guardianPhone: { type: String, default: '' },
    emergencyContact: { type: String, default: '' },
    idProof: { type: String, default: '' },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
    bed: { type: mongoose.Schema.Types.ObjectId, ref: 'Bed' },
    joinDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  { timestamps: true }
);

export default mongoose.model('StudentProfile', studentProfileSchema);
