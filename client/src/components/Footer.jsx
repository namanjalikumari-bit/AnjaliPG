import { Link } from 'react-router-dom';
import { TbHome2 } from 'react-icons/tb';

// Intentionally compact — "NO LONG FOOTER" per the brief.
const Footer = () => (
  <footer className="border-t border-slate-100 bg-white">
    <div className="container-x flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
      <Link to="/" className="flex items-center gap-2 font-bold text-slate-900">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500 text-white">
          <TbHome2 size={16} />
        </span>
        Anjali PG
      </Link>
      <p className="text-xs text-slate-400">© {new Date().getFullYear()} Anjali PG. All rights reserved.</p>
      <div className="flex gap-4 text-xs text-slate-500">
        <Link to="/rooms" className="hover:text-brand-600">Rooms</Link>
        <Link to="/contact" className="hover:text-brand-600">Contact</Link>
        <Link to="/admin/login" className="hover:text-brand-600">Admin</Link>
        <Link to="/student/login" className="hover:text-brand-600">Student</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
