import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/error.js';

import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import bedRoutes from './routes/bedRoutes.js';
import feeRoutes from './routes/feeRoutes.js';
import complaintRoutes from './routes/complaintRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import amenityRoutes from './routes/amenityRoutes.js';
import messRoutes from './routes/messRoutes.js';
import noticeRoutes from './routes/noticeRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL?.split(',') || '*',
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'Anjali PG API' }));

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/beds', bedRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/amenities', amenityRoutes);
app.use('/api/mess', messRoutes);
app.use('/api/notices', noticeRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✓ Server running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`));
