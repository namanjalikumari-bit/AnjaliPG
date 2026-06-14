import express from 'express';
import asyncHandler from 'express-async-handler';
import Review from '../models/Review.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Public: only approved reviews
router.get('/', asyncHandler(async (req, res) => {
  const reviews = await Review.find({ isApproved: true }).sort('-createdAt');
  res.json(reviews);
}));

// Admin: all reviews
router.get('/all', protect, admin, asyncHandler(async (req, res) => {
  const reviews = await Review.find().sort('-createdAt');
  res.json(reviews);
}));

// Public / student: submit a review (defaults to unapproved)
router.post('/', asyncHandler(async (req, res) => {
  const review = await Review.create(req.body);
  res.status(201).json(review);
}));

router.put('/:id', protect, admin, asyncHandler(async (req, res) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!review) { res.status(404); throw new Error('Review not found'); }
  res.json(review);
}));

router.delete('/:id', protect, admin, asyncHandler(async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ message: 'Review removed' });
}));

export default router;
