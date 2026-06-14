import express from 'express';
import asyncHandler from 'express-async-handler';
import Bed from '../models/Bed.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, admin, asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.room) filter.room = req.query.room;
  const beds = await Bed.find(filter)
    .populate('room', 'roomNumber type')
    .populate({ path: 'occupant', populate: { path: 'user', select: 'name' } });
  res.json(beds);
}));

router.post('/', protect, admin, asyncHandler(async (req, res) => {
  const bed = await Bed.create(req.body);
  res.status(201).json(bed);
}));

router.put('/:id', protect, admin, asyncHandler(async (req, res) => {
  const bed = await Bed.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!bed) { res.status(404); throw new Error('Bed not found'); }
  res.json(bed);
}));

router.delete('/:id', protect, admin, asyncHandler(async (req, res) => {
  await Bed.findByIdAndDelete(req.params.id);
  res.json({ message: 'Bed removed' });
}));

export default router;
