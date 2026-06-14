import mongoose from 'mongoose';

const contactInquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    message: { type: String, required: true },
    status: { type: String, enum: ['new', 'read', 'resolved'], default: 'new' },
  },
  { timestamps: true }
);

export default mongoose.model('ContactInquiry', contactInquirySchema);
