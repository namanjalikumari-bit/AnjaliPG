import express from 'express';
import asyncHandler from 'express-async-handler';
import Complaint from '../models/Complaint.js';
import sendEmail from '../utils/sendEmail.js';
import { analyzeComplaint } from '../utils/ai.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Admin: all complaints
router.get('/', protect, admin, asyncHandler(async (req, res) => {
  const complaints = await Complaint.find().populate('student', 'name email').sort('-createdAt');
  res.json(complaints);
}));

// Student: own complaints
router.get('/me', protect, asyncHandler(async (req, res) => {
  const complaints = await Complaint.find({ student: req.user._id }).sort('-createdAt');
  res.json(complaints);
}));

// Student: create (AI categorization if key present, otherwise defaults)
router.post('/', protect, asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const ai = await analyzeComplaint(title, description);
  const complaint = await Complaint.create({
    student: req.user._id,
    title,
    description,
    category: ai.category,
    priority: ai.priority,
    aiSuggestion: ai.aiSuggestion,
  });
  if (process.env.ADMIN_EMAIL) {
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `New complaint: ${title}`,
      html: `<p>${req.user.name} raised a complaint.</p><p><b>${title}</b><br/>${description}</p>`,
    });
  }
  res.status(201).json(complaint);
}));

// Admin: update status / note
router.put('/:id', protect, admin, asyncHandler(async (req, res) => {
  const complaint = await Complaint.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!complaint) { res.status(404); throw new Error('Complaint not found'); }
  res.json(complaint);
}));

export default router;
