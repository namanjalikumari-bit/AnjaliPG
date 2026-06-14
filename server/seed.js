import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/db.js';

import User from './models/User.js';
import StudentProfile from './models/StudentProfile.js';
import Room from './models/Room.js';
import Bed from './models/Bed.js';
import Fee from './models/Fee.js';
import Complaint from './models/Complaint.js';
import Review from './models/Review.js';
import Gallery from './models/Gallery.js';
import MessMenu from './models/MessMenu.js';
import Amenity from './models/Amenity.js';
import Notice from './models/Notice.js';
import BookingRequest from './models/BookingRequest.js';
import ContactInquiry from './models/ContactInquiry.js';

dotenv.config();
await connectDB();

const wipe = async () => {
  await Promise.all([
    User.deleteMany(),
    StudentProfile.deleteMany(),
    Room.deleteMany(),
    Bed.deleteMany(),
    Fee.deleteMany(),
    Complaint.deleteMany(),
    Review.deleteMany(),
    Gallery.deleteMany(),
    MessMenu.deleteMany(),
    Amenity.deleteMany(),
    Notice.deleteMany(),
    BookingRequest.deleteMany(),
    ContactInquiry.deleteMany(),
  ]);
};

if (process.argv.includes('--destroy')) {
  await wipe();
  console.log('✓ Database cleared');
  process.exit();
}

const run = async () => {
  await wipe();

  // ---- Admin ----
  const admin = await User.create({
    name: process.env.ADMIN_NAME || 'Anjali Owner',
    email: process.env.ADMIN_LOGIN_EMAIL || 'admin@anjalipg.com',
    password: process.env.ADMIN_LOGIN_PASSWORD || 'admin123',
    role: 'admin',
    phone: '9876543210',
  });

  // ---- Rooms ----
  const rooms = await Room.insertMany([
    { roomNumber: '101', type: 'triple', floor: 1, price: 6000, capacity: 3, amenities: ['Attached Washroom', 'Study Table', 'Wardrobe'], images: ['/images/room-triple.jpg'], description: 'Spacious triple sharing, fully furnished.', isAvailable: true },
    { roomNumber: '102', type: 'triple', floor: 1, price: 6000, capacity: 3, amenities: ['Attached Washroom', 'Study Table', 'Wardrobe'], images: ['/images/room-triple.jpg'], isAvailable: true },
    { roomNumber: '103', type: 'double', floor: 1, price: 7500, capacity: 2, amenities: ['Attached Washroom', 'Study Table', 'Wardrobe'], images: ['/images/room-double.jpg'], isAvailable: true },
    { roomNumber: '104', type: 'single', floor: 1, price: 9000, capacity: 1, amenities: ['Attached Washroom', 'Study Table', 'Wardrobe'], images: ['/images/room-single.jpg'], isAvailable: true },
    { roomNumber: '201', type: 'triple', floor: 2, price: 6000, capacity: 3, amenities: ['Attached Washroom', 'AC', 'Wardrobe'], images: ['/images/room-triple.jpg'], isAvailable: true },
    { roomNumber: '202', type: 'double', floor: 2, price: 7500, capacity: 2, amenities: ['Attached Washroom', 'AC', 'Wardrobe'], images: ['/images/room-double.jpg'], isAvailable: true },
  ]);

  // ---- Beds ----
  const beds = [];
  for (const room of rooms) {
    for (let i = 0; i < room.capacity; i++) {
      beds.push({ bedNumber: `Bed ${String.fromCharCode(65 + i)}`, room: room._id, status: 'available' });
    }
  }
  const createdBeds = await Bed.insertMany(beds);

  // ---- Students ----
  const studentSeed = [
    { name: 'Salu Kumari', email: 'salu@example.com', phone: '9876543210', gender: 'female' },
    { name: 'Anishay Singh', email: 'anishay@example.com', phone: '8765432109', gender: 'male' },
    { name: 'Shikha Verma', email: 'shikha@example.com', phone: '7654321098', gender: 'female' },
    { name: 'Rohit Sharma', email: 'rohit@example.com', phone: '6543210987', gender: 'male' },
    { name: 'Anita Kumari', email: 'anita@example.com', phone: '5432109876', gender: 'female' },
    { name: 'Vikash Singh', email: 'vikash@example.com', phone: '4321098765', gender: 'male' },
  ];

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  let bedIdx = 0;
  for (let s = 0; s < studentSeed.length; s++) {
    const sd = studentSeed[s];
    const user = await User.create({ ...sd, password: 'student123', role: 'student' });
    const room = rooms[s % rooms.length];
    const bed = createdBeds[bedIdx++];
    bed.status = 'occupied';
    await bed.save();
    const profile = await StudentProfile.create({
      user: user._id, gender: sd.gender, college: 'City College', course: 'B.Tech',
      room: room._id, bed: bed._id, status: 'active',
    });
    bed.occupant = profile._id;
    await bed.save();

    // fees across months
    for (let m = 0; m < months.length; m++) {
      const paid = m < months.length - 1; // last month due
      await Fee.create({
        student: user._id,
        month: `${months[m]} 2026`,
        totalAmount: room.price,
        paidAmount: paid ? room.price : (m === months.length - 1 && s % 2 === 0 ? room.price / 2 : 0),
        dueDate: new Date(2026, m, 5),
      });
    }

    // one complaint for the first student
    if (s === 0) {
      await Complaint.create({
        student: user._id, title: 'WiFi slow in room 101',
        description: 'Internet speed drops in the evening hours.',
        category: 'wifi', priority: 'medium', status: 'in-progress',
      });
    }
  }

  // ---- Reviews ----
  await Review.insertMany([
    { name: 'Salu', rating: 5, comment: 'The PG is clean, safe and comfortable. Food quality is also really good. Staff is very helpful.', avatar: '/images/students-studying.jpg', isApproved: true },
    { name: 'Anishay', rating: 5, comment: 'Rooms are fully furnished and WiFi works perfectly. Great place to live and study.', avatar: '/images/hostel-lifestyle.jpg', isApproved: true },
    { name: 'Shikha', rating: 5, comment: 'I love the community events and gaming zone. Laundry service is very convenient.', avatar: '/images/community-events.jpg', isApproved: true },
  ]);

  // ---- Gallery (mapped to the 20 official asset filenames) ----
  await Gallery.insertMany([
    { title: 'PG Building', category: 'other', image: '/images/pg-exterior.jpg', order: 1 },
    { title: 'Reception', category: 'common', image: '/images/reception.jpg', order: 2 },
    { title: 'Single Room', category: 'rooms', image: '/images/room-single.jpg', order: 3 },
    { title: 'Double Room', category: 'rooms', image: '/images/room-double.jpg', order: 4 },
    { title: 'Triple Room', category: 'rooms', image: '/images/room-triple.jpg', order: 5 },
    { title: 'Dining Area', category: 'dining', image: '/images/dining-area.jpg', order: 6 },
    { title: 'Mess Food', category: 'dining', image: '/images/mess-food.jpg', order: 7 },
    { title: 'Gym', category: 'common', image: '/images/gym.jpg', order: 8 },
    { title: 'Gaming Area', category: 'common', image: '/images/gaming-area.jpg', order: 9 },
    { title: 'Community Events', category: 'events', image: '/images/community-events.jpg', order: 10 },
    { title: 'Study Area', category: 'study', image: '/images/study-area.jpg', order: 11 },
    { title: 'Laundry', category: 'common', image: '/images/laundry-area.jpg', order: 12 },
    { title: 'Common Area', category: 'common', image: '/images/common-area.jpg', order: 13 },
    { title: 'Security', category: 'common', image: '/images/security-area.jpg', order: 14 },
    { title: 'Hostel Life', category: 'events', image: '/images/hostel-lifestyle.jpg', order: 15 },
  ]);

  // ---- Amenities ----
  await Amenity.insertMany([
    { name: 'Kitchen', icon: 'utensils', category: 'room', order: 1 },
    { name: 'Live Water', icon: 'droplet', category: 'room', order: 2 },
    { name: 'WiFi', icon: 'wifi', category: 'room', order: 3 },
    { name: 'Power Backup', icon: 'battery', category: 'room', order: 4 },
    { name: 'Daily Housekeeping', icon: 'broom', category: 'room', order: 5 },
    { name: 'Four Time Meals', icon: 'utensils', category: 'room', order: 6 },
    { name: 'AC & Geyser', icon: 'snowflake', category: 'room', order: 7 },
    { name: 'Triple Fully Furnished Bedroom', icon: 'bed', category: 'room', order: 8 },
    { name: 'Community Events', icon: 'users', category: 'common', order: 9 },
    { name: 'Gaming Zone', icon: 'gamepad', category: 'common', order: 10 },
    { name: 'Recycling Zone', icon: 'recycle', category: 'common', order: 11 },
    { name: 'Free Gym Subscription', icon: 'dumbbell', category: 'common', order: 12 },
    { name: '24x7 Service', icon: 'clock', category: 'service', order: 13 },
    { name: 'Cleanliness & Helpline', icon: 'phone', category: 'service', order: 14 },
    { name: 'Sick Meal', icon: 'heart', category: 'service', order: 15 },
    { name: '24x7 Security Guard', icon: 'shield', category: 'service', order: 16 },
    { name: 'Lunch Delivery To College', icon: 'truck', category: 'service', order: 17 },
    { name: 'Unlimited Laundry', icon: 'shirt', category: 'service', order: 18 },
    { name: 'CCTV Surveillance', icon: 'camera', category: 'service', order: 19 },
    { name: 'Doctor On Call', icon: 'stethoscope', category: 'service', order: 20 },
  ]);

  // ---- Mess Menu ----
  await MessMenu.insertMany([
    { day: 'Monday', breakfast: 'Poha, Tea', lunch: 'Dal, Rice, Roti', snacks: 'Sandwich, Tea', dinner: 'Paneer, Roti, Salad' },
    { day: 'Tuesday', breakfast: 'Upma, Tea', lunch: 'Rajma, Rice, Roti', snacks: 'Maggi, Tea', dinner: 'Mix Veg, Roti, Salad' },
    { day: 'Wednesday', breakfast: 'Idli, Sambar', lunch: 'Chole, Rice, Roti', snacks: 'Poha, Tea', dinner: 'Dal, Rice, Roti' },
    { day: 'Thursday', breakfast: 'Paratha, Curd', lunch: 'Dal, Rice, Sabzi, Roti', snacks: 'Sandwich, Tea', dinner: 'Paneer, Roti, Salad' },
    { day: 'Friday', breakfast: 'Bread Omelette, Tea', lunch: 'Rajma, Rice, Roti', snacks: 'Pakora, Tea', dinner: 'Mix Veg, Roti, Salad' },
    { day: 'Saturday', breakfast: 'Aloo Poratha, Tea', lunch: 'Kadhi, Rice, Roti', snacks: 'Pasta, Tea', dinner: 'Paneer, Roti, Salad' },
    { day: 'Sunday', breakfast: 'Chole Bhature', lunch: 'Special Thali', snacks: 'Samosa, Tea', dinner: 'Veg Biryani, Raita' },
  ]);

  // ---- Notices ----
  await Notice.insertMany([
    { title: 'Diwali Celebration', body: 'Community Diwali event in the common area this Saturday at 7 PM.', priority: 'normal', postedBy: admin._id },
    { title: 'Water supply maintenance', body: 'Water tank cleaning on Sunday 9 AM - 12 PM.', priority: 'important', postedBy: admin._id },
  ]);

  // ---- A couple of pending requests for the dashboard ----
  await BookingRequest.create({ name: 'Pooja Sharma', email: 'pooja@example.com', phone: '2100000000', gender: 'female', roomType: 'double', college: 'City College', status: 'pending' });
  await ContactInquiry.create({ name: 'Neha Patel', email: 'neha@example.com', phone: '3210000000', message: 'Is a single room available from next month?', status: 'new' });

  console.log('✓ Seed complete');
  console.log(`  Admin login: ${admin.email} / ${process.env.ADMIN_LOGIN_PASSWORD || 'admin123'}`);
  console.log('  Student login: salu@example.com / student123');
  process.exit();
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
