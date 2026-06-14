import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

const PublicLayout = () => (
  <div className="flex min-h-screen flex-col">
    <Navbar />
    <div className="flex-1">
      <Outlet />
    </div>
    <Footer />
  </div>
);

export default PublicLayout;
