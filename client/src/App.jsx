import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import PublicLayout from './components/PublicLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import PageTransition from './components/PageTransition.jsx';

// Public pages
import Home from './pages/public/Home.jsx';
import About from './pages/public/About.jsx';
import Rooms from './pages/public/Rooms.jsx';
import Facilities from './pages/public/Facilities.jsx';
import Meals from './pages/public/Meals.jsx';
import Gallery from './pages/public/Gallery.jsx';
import Reviews from './pages/public/Reviews.jsx';
import Contact from './pages/public/Contact.jsx';

// Auth
import Login from './pages/auth/Login.jsx';

// Admin
import AdminLayout from './pages/admin/AdminLayout.jsx';
import AdminDashboard from './pages/admin/Dashboard.jsx';
import AdminStudents from './pages/admin/Students.jsx';
import AdminRoomsBeds from './pages/admin/RoomsBeds.jsx';
import AdminFees from './pages/admin/Fees.jsx';
import AdminComplaints from './pages/admin/Complaints.jsx';
import AdminBookings from './pages/admin/Bookings.jsx';
import AdminInquiries from './pages/admin/Inquiries.jsx';
import AdminReviews from './pages/admin/Reviews.jsx';
import AdminGallery from './pages/admin/Gallery.jsx';
import AdminAmenities from './pages/admin/Amenities.jsx';
import AdminMess from './pages/admin/Mess.jsx';
import AdminNotices from './pages/admin/Notices.jsx';

// Student
import StudentLayout from './pages/student/StudentLayout.jsx';
import StudentDashboard from './pages/student/Dashboard.jsx';
import StudentProfile from './pages/student/Profile.jsx';
import StudentMyRoom from './pages/student/MyRoom.jsx';
import StudentMyFees from './pages/student/MyFees.jsx';
import StudentMyComplaints from './pages/student/MyComplaints.jsx';
import StudentNotices from './pages/student/Notices.jsx';
import StudentReviews from './pages/student/Reviews.jsx';
import StudentMessMenu from './pages/student/MessMenu.jsx';

const T = ({ children }) => <PageTransition>{children}</PageTransition>;

const App = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public site */}
        <Route element={<PublicLayout />}>
          <Route index element={<T><Home /></T>} />
          <Route path="about" element={<T><About /></T>} />
          <Route path="rooms" element={<T><Rooms /></T>} />
          <Route path="facilities" element={<T><Facilities /></T>} />
          <Route path="meals" element={<T><Meals /></T>} />
          <Route path="gallery" element={<T><Gallery /></T>} />
          <Route path="reviews" element={<T><Reviews /></T>} />
          <Route path="contact" element={<T><Contact /></T>} />
        </Route>

        {/* Auth */}
        <Route path="/admin/login" element={<Login role="admin" />} />
        <Route path="/student/login" element={<Login role="student" />} />

        {/* Admin panel */}
        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="rooms" element={<AdminRoomsBeds />} />
          <Route path="fees" element={<AdminFees />} />
          <Route path="complaints" element={<AdminComplaints />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="inquiries" element={<AdminInquiries />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="amenities" element={<AdminAmenities />} />
          <Route path="mess" element={<AdminMess />} />
          <Route path="notices" element={<AdminNotices />} />
        </Route>

        {/* Student panel */}
        <Route path="/student" element={<ProtectedRoute role="student"><StudentLayout /></ProtectedRoute>}>
          <Route index element={<StudentDashboard />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="room" element={<StudentMyRoom />} />
          <Route path="fees" element={<StudentMyFees />} />
          <Route path="complaints" element={<StudentMyComplaints />} />
          <Route path="notices" element={<StudentNotices />} />
          <Route path="reviews" element={<StudentReviews />} />
          <Route path="mess" element={<StudentMessMenu />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
