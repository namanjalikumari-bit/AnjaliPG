import express from 'express';
import asyncHandler from 'express-async-handler';
import Gallery from '../models/Gallery.js';
import { uploadImage } from '../utils/cloudinary.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.category && req.query.category !== 'all') filter.category = req.query.category;
  const items = await Gallery.find(filter).sort('order');
  res.json(items);
}));

// Admin: upload an image file (base64 data URI) to Cloudinary, returns the hosted URL
router.post('/upload', protect, admin, asyncHandler(async (req, res) => {
  const { image } = req.body;
  if (!image) { res.status(400); throw new Error('No image provided'); }
  const url = await uploadImage(image, 'anjali-pg/gallery');
  if (!url) { res.status(500); throw new Error('Image upload failed — check Cloudinary configuration'); }
  res.json({ url });
}));

router.post('/', protect, admin, asyncHandler(async (req, res) => {
  const item = await Gallery.create(req.body);
  res.status(201).json(item);
}));

router.delete('/:id', protect, admin, asyncHandler(async (req, res) => {
  await Gallery.findByIdAndDelete(req.params.id);
  res.json({ message: 'Image removed' });
}));

export default router;
