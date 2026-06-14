import express from 'express';
import asyncHandler from 'express-async-handler';
import MessMenu from '../models/MessMenu.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

const ORDER = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

router.get('/', asyncHandler(async (req, res) => {
  const menu = await MessMenu.find();
  menu.sort((a, b) => ORDER.indexOf(a.day) - ORDER.indexOf(b.day));
  res.json(menu);
}));

// Upsert by day
router.put('/:day', protect, admin, asyncHandler(async (req, res) => {
  const item = await MessMenu.findOneAndUpdate(
    { day: req.params.day },
    { ...req.body, day: req.params.day },
    { new: true, upsert: true }
  );
  res.json(item);
}));

export default router;
