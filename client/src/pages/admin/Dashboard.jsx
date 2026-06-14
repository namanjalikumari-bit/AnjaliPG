import { useEffect, useState } from 'react';
import {
  FiUsers, FiUser, FiHome, FiCheckCircle, FiTrendingUp, FiClock, FiAlertCircle, FiMail,
} from 'react-icons/fi';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell,
} from 'recharts';
import api from '../../api/axios.js';
import { Reveal, Stagger, Item } from '../../components/Motion.jsx';
import { Panel, Spinner, inr } from '../../components/UI.jsx';

const COLORS = ['#7c3aed', '#e9d5ff'];

const StatCard = ({ Icon, label, value, tint }) => (
  <Item>
    <Panel className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
          <p className="mt-2 text-2xl font-extrabold text-slate-900">{value}</p>
        </div>
        <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${tint}`}><Icon size={20} /></span>
      </div>
    </Panel>
  </Item>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard/stats')
      .then(({ data }) => setStats(data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner label="Loading dashboard…" />;
  if (!stats) return <p className="text-sm text-slate-500">Could not load dashboard. Is the API running?</p>;

  const cards = [
    { Icon: FiUsers, label: 'Total Students', value: stats.totalStudents, tint: 'bg-brand-50 text-brand-600' },
    { Icon: FiUser, label: 'Male Students', value: stats.maleStudents, tint: 'bg-sky-50 text-sky-600' },
    { Icon: FiUser, label: 'Female Students', value: stats.femaleStudents, tint: 'bg-pink-50 text-pink-600' },
    { Icon: FiHome, label: 'Occupied Beds', value: stats.occupiedBeds, tint: 'bg-rose-50 text-rose-600' },
    { Icon: FiCheckCircle, label: 'Available Beds', value: stats.availableBeds, tint: 'bg-emerald-50 text-emerald-600' },
    { Icon: FiTrendingUp, label: 'Monthly Revenue', value: inr(stats.monthlyRevenue), tint: 'bg-violet-50 text-violet-600' },
    { Icon: FiClock, label: 'Pending Fees', value: inr(stats.pendingFees), tint: 'bg-amber-50 text-amber-600' },
    { Icon: FiAlertCircle, label: 'Complaints', value: stats.complaints, tint: 'bg-orange-50 text-orange-600' },
    { Icon: FiMail, label: 'New Inquiries', value: stats.newInquiries, tint: 'bg-indigo-50 text-indigo-600' },
  ];

  const revenue = stats.charts?.revenue || [];
  const occupancy = stats.charts?.occupancy || [];
  const totalBeds = occupancy.reduce((s, o) => s + o.value, 0) || 1;
  const occPct = Math.round(((occupancy.find((o) => o.name === 'Occupied')?.value || 0) / totalBeds) * 100);

  return (
    <div>
      <Reveal>
        <h1 className="mb-1 text-2xl font-extrabold tracking-tight text-slate-900">Dashboard</h1>
        <p className="mb-6 text-sm text-slate-500">Overview of your PG at a glance.</p>
      </Reveal>

      <Stagger className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-3">
        {cards.map((c) => <StatCard key={c.label} {...c} />)}
      </Stagger>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <Panel className="p-5">
            <h3 className="mb-4 font-bold text-slate-900">Monthly Revenue</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenue} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} tickLine={false} axisLine={false} />
                  <Tooltip formatter={(v) => inr(v)} cursor={{ fill: '#faf5ff' }}
                    contentStyle={{ borderRadius: 12, border: '1px solid #ede9fe', fontSize: 13 }} />
                  <Bar dataKey="amount" fill="#7c3aed" radius={[6, 6, 0, 0]} maxBarSize={42} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </Reveal>

        <Reveal delay={0.1}>
          <Panel className="flex flex-col items-center p-5">
            <h3 className="mb-2 self-start font-bold text-slate-900">Occupancy Overview</h3>
            <div className="relative h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={occupancy} dataKey="value" innerRadius={62} outerRadius={86} paddingAngle={3} stroke="none">
                    {occupancy.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #ede9fe', fontSize: 13 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-slate-900">{occPct}%</span>
                <span className="text-xs font-medium text-slate-400">Occupied</span>
              </div>
            </div>
            <div className="mt-2 flex gap-4 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-brand-500" />Occupied</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-brand-100" />Available</span>
            </div>
          </Panel>
        </Reveal>
      </div>
    </div>
  );
};

export default AdminDashboard;
