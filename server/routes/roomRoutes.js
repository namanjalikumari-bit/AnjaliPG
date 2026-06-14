import express from 'express';
import asyncHandler from 'express-async-handler';
import Room from '../models/Room.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const filter = {};
    if (req.query.type && req.query.type !== 'all') filter.type = req.query.type;
    const rooms = await Room.find(filter).sort('price');
    res.json(rooms);
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const room = await Room.findById(req.params.id);
    if (!room) {
      res.status(404);
      throw new Error('Room not found');
    }
    res.json(room);
  })
);

router.post('/', protect, admin, asyncHandler(async (req, res) => {
  const room = await Room.create(req.body);
  res.status(201).json(room);
}));

router.put('/:id', protect, admin, asyncHandler(async (req, res) => {
  const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!room) { res.status(404); throw new Error('Room not found'); }
  res.json(room);
}));

router.delete('/:id', protect, admin, asyncHandler(async (req, res) => {
  await Room.findByIdAndDelete(req.params.id);
  res.json({ message: 'Room removed' });
}));

export default router;
