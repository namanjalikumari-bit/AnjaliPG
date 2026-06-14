import express from 'express';
import asyncHandler from 'express-async-handler';
import Notice from '../models/Notice.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Any logged-in user can read notices
router.get('/', protect, asyncHandler(async (req, res) => {
  const notices = await Notice.find().sort('-createdAt');
  res.json(notices);
}));

router.post('/', protect, admin, asyncHandler(async (req, res) => {
  const notice = await Notice.create({ ...req.body, postedBy: req.user._id });
  res.status(201).json(notice);
}));

router.delete('/:id', protect, admin, asyncHandler(async (req, res) => {
  await Notice.findByIdAndDelete(req.params.id);
  res.json({ message: 'Notice removed' });
}));

export default router;
