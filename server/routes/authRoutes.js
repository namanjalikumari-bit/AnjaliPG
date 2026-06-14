import express from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import StudentProfile from '../models/StudentProfile.js';
import generateToken from '../utils/generateToken.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// POST /api/auth/login  (works for both admin & student)
router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase() }).select('+password');
    if (user && (await user.matchPassword(password))) {
      if (!user.isActive) {
        res.status(403);
        throw new Error('Account is inactive. Contact the PG admin.');
      }
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  })
);

// GET /api/auth/me
router.get(
  '/me',
  protect,
  asyncHandler(async (req, res) => {
    const profile =
      req.user.role === 'student'
        ? await StudentProfile.findOne({ user: req.user._id }).populate('room bed')
        : null;
    res.json({ user: req.user, profile });
  })
);

export default router;
