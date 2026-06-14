import express from 'express';
import asyncHandler from 'express-async-handler';
import Fee from '../models/Fee.js';
import User from '../models/User.js';
import sendEmail from '../utils/sendEmail.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Admin: all fees
router.get('/', protect, admin, asyncHandler(async (req, res) => {
  const fees = await Fee.find().populate('student', 'name email').sort('-createdAt');
  res.json(fees);
}));

// Student: own fees
router.get('/me', protect, asyncHandler(async (req, res) => {
  const fees = await Fee.find({ student: req.user._id }).sort('-createdAt');
  res.json(fees);
}));

router.post('/', protect, admin, asyncHandler(async (req, res) => {
  const fee = await Fee.create(req.body);
  res.status(201).json(fee);
}));

// Admin: record payment / update
router.put('/:id', protect, admin, asyncHandler(async (req, res) => {
  const fee = await Fee.findById(req.params.id);
  if (!fee) { res.status(404); throw new Error('Fee record not found'); }
  Object.assign(fee, req.body);
  if (fee.status === 'paid' && !fee.paidOn) fee.paidOn = new Date();
  await fee.save();
  res.json(fee);
}));

// Admin: send due reminder email
router.post('/:id/remind', protect, admin, asyncHandler(async (req, res) => {
  const fee = await Fee.findById(req.params.id).populate('student', 'name email');
  if (!fee) { res.status(404); throw new Error('Fee record not found'); }
  const due = fee.totalAmount - fee.paidAmount;
  await sendEmail({
    to: fee.student.email,
    subject: `Fee reminder — ${fee.month}`,
    html: `<p>Hi ${fee.student.name},</p><p>This is a friendly reminder that ₹${due} is pending for ${fee.month} at Anjali PG.</p><p>— Anjali PG</p>`,
  });
  res.json({ message: 'Reminder sent' });
}));

export default router;
