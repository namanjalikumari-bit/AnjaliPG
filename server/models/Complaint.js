import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, default: 'general' },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    status: { type: String, enum: ['open', 'in-progress', 'resolved'], default: 'open' },
    aiSuggestion: { type: String, default: '' },
    adminNote: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Complaint', complaintSchema);
