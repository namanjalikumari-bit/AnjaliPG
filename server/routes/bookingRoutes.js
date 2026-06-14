import express from 'express';
import asyncHandler from 'express-async-handler';
import BookingRequest from '../models/BookingRequest.js';
import User from '../models/User.js';
import StudentProfile from '../models/StudentProfile.js';
import sendEmail from '../utils/sendEmail.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Public: create booking request
router.post('/', asyncHandler(async (req, res) => {
  const booking = await BookingRequest.create(req.body);
  if (process.env.ADMIN_EMAIL) {
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `New booking request — ${booking.name}`,
      html: `<p>New booking request received:</p>
        <ul><li>Name: ${booking.name}</li><li>Phone: ${booking.phone}</li>
        <li>Email: ${booking.email}</li><li>Room: ${booking.roomType}</li></ul>`,
    });
  }
  res.status(201).json(booking);
}));

// Admin: list
router.get('/', protect, admin, asyncHandler(async (req, res) => {
  const bookings = await BookingRequest.find().sort('-createdAt');
  res.json(bookings);
}));

// Admin: approve -> creates a student account
router.put('/:id/approve', protect, admin, asyncHandler(async (req, res) => {
  const booking = await BookingRequest.findById(req.params.id);
  if (!booking) { res.status(404); throw new Error('Booking not found'); }

  let user = await User.findOne({ email: booking.email.toLowerCase() });
  const tempPassword = Math.random().toString(36).slice(-8);
  if (!user) {
    user = await User.create({
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      password: tempPassword,
      role: 'student',
    });
    await StudentProfile.create({ user: user._id, gender: booking.gender, college: booking.college });
  }
  booking.status = 'approved';
  await booking.save();

  await sendEmail({
    to: booking.email,
    subject: 'Your Anjali PG booking is approved 🎉',
    html: `<p>Hi ${booking.name},</p><p>Your booking is approved! Login with:</p>
      <p>Email: ${booking.email}<br/>Temporary password: <b>${tempPassword}</b></p>`,
  });
  res.json({ message: 'Approved & student account created', booking });
}));

router.put('/:id/reject', protect, admin, asyncHandler(async (req, res) => {
  const booking = await BookingRequest.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
  if (!booking) { res.status(404); throw new Error('Booking not found'); }
  res.json(booking);
}));

export default router;
