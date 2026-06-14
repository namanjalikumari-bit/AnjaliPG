import mongoose from 'mongoose';

const feeSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    month: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    paidAmount: { type: Number, default: 0 },
    dueDate: { type: Date },
    status: { type: String, enum: ['paid', 'partial', 'due'], default: 'due' },
    paidOn: { type: Date },
  },
  { timestamps: true }
);

feeSchema.pre('save', function (next) {
  if (this.paidAmount >= this.totalAmount) this.status = 'paid';
  else if (this.paidAmount > 0) this.status = 'partial';
  else this.status = 'due';
  next();
});

export default mongoose.model('Fee', feeSchema);
