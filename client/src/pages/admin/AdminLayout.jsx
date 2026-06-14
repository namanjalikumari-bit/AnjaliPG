import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  FiGrid, FiUsers, FiHome, FiLayers, FiCreditCard, FiAlertCircle, FiStar,
  FiInbox, FiMail, FiImage, FiList, FiCoffee, FiBell, FiLogOut,
} from 'react-icons/fi';
import { TbHome2 } from 'react-icons/tb';
import { useAuth } from '../../context/AuthContext.jsx';

const nav = [
  { to: '/admin', label: 'Dashboard', Icon: FiGrid, end: true },
  { to: '/admin/students', label: 'Students', Icon: FiUsers },
  { to: '/admin/rooms', label: 'Rooms & Beds', Icon: FiHome },
  { to: '/admin/fees', label: 'Fees', Icon: FiCreditCard },
  { to: '/admin/complaints', label: 'Complaints', Icon: FiAlertCircle },
  { to: '/admin/bookings', label: 'Booking Requests', Icon: FiInbox },
  { to: '/admin/inquiries', label: 'Contact Inquiries', Icon: FiMail },
  { to: '/admin/reviews', label: 'Reviews', Icon: FiStar },
  { to: '/admin/gallery', label: 'Gallery', Icon: FiImage },
  { to: '/admin/amenities', label: 'Amenities', Icon: FiLayers },
  { to: '/admin/mess', label: 'Mess Menu', Icon: FiCoffee },
  { to: '/admin/notices', label: 'Notices', Icon: FiBell },
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const out = () => { logout(); navigate('/admin/login'); };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-4 font-extrabold text-slate-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white"><TbHome2 /></span>
          Anjali PG
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {nav.map(({ to, label, Icon, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-brand-50 text-brand-600' : 'text-slate-500 hover:bg-slate-50'
                }`
              }>
              <Icon /> {label}
            </NavLink>
          ))}
        </nav>
        <button onClick={out} className="flex items-center gap-3 border-t border-slate-100 px-5 py-4 text-sm font-medium text-rose-500 hover:bg-rose-50">
          <FiLogOut /> Logout
        </button>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:px-8">
          <div className="flex items-center gap-2 lg:hidden font-bold text-slate-900">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500 text-white"><TbHome2 size={15} /></span>
            Anjali PG
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
              <p className="text-xs text-slate-400">Administrator</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-600">
              {user?.name?.[0] || 'A'}
            </div>
            <button onClick={out} className="lg:hidden text-rose-500" aria-label="Logout"><FiLogOut /></button>
          </div>
        </header>

        {/* mobile nav */}
        <nav className="flex gap-2 overflow-x-auto border-b border-slate-200 bg-white px-4 py-2 lg:hidden">
          {nav.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${isActive ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-500'}`
              }>{label}</NavLink>
          ))}
        </nav>

        <main className="flex-1 p-4 lg:p-8"><Outlet /></main>
      </div>
    </div>
  );
};

export default AdminLayout;
