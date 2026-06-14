import express from 'express';
import asyncHandler from 'express-async-handler';
import ContactInquiry from '../models/ContactInquiry.js';
import sendEmail from '../utils/sendEmail.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
  const inquiry = await ContactInquiry.create(req.body);
  if (process.env.ADMIN_EMAIL) {
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `New inquiry from ${inquiry.name}`,
      html: `<p>${inquiry.message}</p><p>From: ${inquiry.name} (${inquiry.email}, ${inquiry.phone})</p>`,
    });
  }
  res.status(201).json({ message: 'Message received. We will get back to you soon.' });
}));

router.get('/', protect, admin, asyncHandler(async (req, res) => {
  const inquiries = await ContactInquiry.find().sort('-createdAt');
  res.json(inquiries);
}));

router.put('/:id', protect, admin, asyncHandler(async (req, res) => {
  const inquiry = await ContactInquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!inquiry) { res.status(404); throw new Error('Inquiry not found'); }
  res.json(inquiry);
}));

export default router;
