import express from 'express';
import asyncHandler from 'express-async-handler';
import Amenity from '../models/Amenity.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.category) filter.category = req.query.category;
  const items = await Amenity.find(filter).sort('order');
  res.json(items);
}));

router.post('/', protect, admin, asyncHandler(async (req, res) => {
  const item = await Amenity.create(req.body);
  res.status(201).json(item);
}));

router.put('/:id', protect, admin, asyncHandler(async (req, res) => {
  const item = await Amenity.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) { res.status(404); throw new Error('Amenity not found'); }
  res.json(item);
}));

router.delete('/:id', protect, admin, asyncHandler(async (req, res) => {
  await Amenity.findByIdAndDelete(req.params.id);
  res.json({ message: 'Amenity removed' });
}));

export default router;
