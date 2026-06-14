import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiCreditCard, FiAlertCircle, FiBell, FiArrowRight } from 'react-icons/fi';
import api from '../../api/axios.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { Reveal, Stagger, Item } from '../../components/Motion.jsx';
import { Panel, Spinner, StatusPill, inr } from '../../components/UI.jsx';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState({ profile: null, fees: [], complaints: [], notices: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      api.get('/students/me/profile'),
      api.get('/fees/me'),
      api.get('/complaints/me'),
      api.get('/notices'),
    ]).then(([p, f, c, n]) => {
      setData({
        profile: p.status === 'fulfilled' ? p.value.data : null,
        fees: f.status === 'fulfilled' ? f.value.data : [],
        complaints: c.status === 'fulfilled' ? c.value.data : [],
        notices: n.status === 'fulfilled' ? n.value.data : [],
      });
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner label="Loading your dashboard…" />;

  const dueTotal = data.fees.reduce((s, f) => s + Math.max(0, f.totalAmount - f.paidAmount), 0);
  const openComplaints = data.complaints.filter((c) => c.status !== 'resolved').length;
  const room = data.profile?.room;

  const cards = [
    { Icon: FiHome, label: 'My Room', value: room?.roomNumber ? `Room ${room.roomNumber}` : 'Not assigned', to: '/student/room', tint: 'bg-brand-50 text-brand-600' },
    { Icon: FiCreditCard, label: 'Pending Fees', value: inr(dueTotal), to: '/student/fees', tint: 'bg-amber-50 text-amber-600' },
    { Icon: FiAlertCircle, label: 'Open Complaints', value: openComplaints, to: '/student/complaints', tint: 'bg-rose-50 text-rose-600' },
    { Icon: FiBell, label: 'Notices', value: data.notices.length, to: '/student/notices', tint: 'bg-indigo-50 text-indigo-600' },
  ];

  return (
    <div>
      <Reveal>
        <h1 className="mb-1 text-2xl font-extrabold tracking-tight text-slate-900">Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
        <p className="mb-6 text-sm text-slate-500">Here's a quick look at your stay.</p>
      </Reveal>

      <Stagger className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <Item key={c.label}>
            <Link to={c.to}>
              <Panel className="p-5 transition hover:-translate-y-0.5 hover:shadow-card">
                <span className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl ${c.tint}`}><c.Icon size={20} /></span>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{c.label}</p>
                <p className="mt-1 text-lg font-extrabold text-slate-900">{c.value}</p>
              </Panel>
            </Link>
          </Item>
        ))}
      </Stagger>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Reveal>
          <Panel className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Recent Fees</h3>
              <Link to="/student/fees" className="text-sm font-medium text-brand-600 hover:underline">View all <FiArrowRight className="inline" /></Link>
            </div>
            {data.fees.length === 0 ? <p className="text-sm text-slate-400">No fee records yet.</p> : (
              <ul className="divide-y divide-slate-50">
                {data.fees.slice(0, 4).map((f) => (
                  <li key={f._id} className="flex items-center justify-between py-2.5 text-sm">
                    <span className="text-slate-600">{f.month}</span>
                    <span className="flex items-center gap-3"><span className="text-slate-500">{inr(f.totalAmount)}</span><StatusPill value={f.status} /></span>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </Reveal>

        <Reveal delay={0.1}>
          <Panel className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Latest Notices</h3>
              <Link to="/student/notices" className="text-sm font-medium text-brand-600 hover:underline">View all <FiArrowRight className="inline" /></Link>
            </div>
            {data.notices.length === 0 ? <p className="text-sm text-slate-400">No notices.</p> : (
              <ul className="space-y-3">
                {data.notices.slice(0, 4).map((n) => (
                  <li key={n._id}>
                    <p className="text-sm font-semibold text-slate-800">{n.title}</p>
                    <p className="line-clamp-1 text-xs text-slate-400">{n.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </Reveal>
      </div>
    </div>
  );
};

export default StudentDashboard;
