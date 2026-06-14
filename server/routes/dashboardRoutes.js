import express from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import StudentProfile from '../models/StudentProfile.js';
import Bed from '../models/Bed.js';
import Fee from '../models/Fee.js';
import Complaint from '../models/Complaint.js';
import ContactInquiry from '../models/ContactInquiry.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get(
  '/stats',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const [students, profiles, beds, fees, complaints, inquiries] = await Promise.all([
      User.countDocuments({ role: 'student' }),
      StudentProfile.find(),
      Bed.find(),
      Fee.find(),
      Complaint.countDocuments({ status: { $ne: 'resolved' } }),
      ContactInquiry.countDocuments({ status: 'new' }),
    ]);

    const male = profiles.filter((p) => p.gender === 'male').length;
    const female = profiles.filter((p) => p.gender === 'female').length;
    const occupiedBeds = beds.filter((b) => b.status === 'occupied').length;
    const availableBeds = beds.filter((b) => b.status === 'available').length;

    const monthlyRevenue = fees.reduce((s, f) => s + (f.paidAmount || 0), 0);
    const pendingFees = fees.reduce((s, f) => s + Math.max(0, f.totalAmount - f.paidAmount), 0);

    // group paid amount by month for the revenue chart
    const revenueByMonth = {};
    fees.forEach((f) => {
      revenueByMonth[f.month] = (revenueByMonth[f.month] || 0) + (f.paidAmount || 0);
    });

    res.json({
      totalStudents: students,
      maleStudents: male,
      femaleStudents: female,
      occupiedBeds,
      availableBeds,
      monthlyRevenue,
      pendingFees,
      complaints,
      newInquiries: inquiries,
      charts: {
        revenue: Object.entries(revenueByMonth).map(([month, amount]) => ({ month, amount })),
        occupancy: [
          { name: 'Occupied', value: occupiedBeds },
          { name: 'Available', value: availableBeds },
        ],
      },
    });
  })
);

export default router;
