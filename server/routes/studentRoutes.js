import express from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import StudentProfile from '../models/StudentProfile.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Admin: list all students with profile + room
router.get(
  '/',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const profiles = await StudentProfile.find()
      .populate('user', 'name email phone role isActive')
      .populate('room', 'roomNumber type')
      .populate('bed', 'bedNumber')
      .sort('-createdAt');
    res.json(profiles);
  })
);

// Admin: create student (user + profile)
router.post(
  '/',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, email, phone, password, gender, college, course, roomId, bedId } = req.body;
    const exists = await User.findOne({ email: email?.toLowerCase() });
    if (exists) {
      res.status(400);
      throw new Error('A user with this email already exists');
    }
    const user = await User.create({
      name,
      email,
      phone,
      password: password || 'student123',
      role: 'student',
    });
    const profile = await StudentProfile.create({
      user: user._id,
      gender,
      college,
      course,
      room: roomId || undefined,
      bed: bedId || undefined,
    });
    res.status(201).json({ user, profile });
  })
);

// Admin: update a profile
router.put(
  '/:id',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const profile = await StudentProfile.findById(req.params.id);
    if (!profile) {
      res.status(404);
      throw new Error('Student profile not found');
    }
    Object.assign(profile, req.body);
    await profile.save();
    res.json(profile);
  })
);

// Admin: toggle active / delete
router.delete(
  '/:id',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const profile = await StudentProfile.findById(req.params.id);
    if (!profile) {
      res.status(404);
      throw new Error('Student profile not found');
    }
    await User.findByIdAndUpdate(profile.user, { isActive: false });
    res.json({ message: 'Student deactivated' });
  })
);

// Student: own profile
router.get(
  '/me/profile',
  protect,
  asyncHandler(async (req, res) => {
    const profile = await StudentProfile.findOne({ user: req.user._id })
      .populate('room')
      .populate('bed');
    res.json(profile);
  })
);

export default router;
