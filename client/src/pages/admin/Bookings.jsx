import { useEffect, useState } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';
import api from '../../api/axios.js';
import { Reveal, Stagger, Item } from '../../components/Motion.jsx';
import { PageHead, Spinner, EmptyState, Panel, StatusPill } from '../../components/UI.jsx';

const Bookings = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [toast, setToast] = useState('');

  const load = () => {
    setLoading(true);
    api.get('/bookings').then(({ data }) => setItems(data)).catch(() => setItems([])).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const act = async (b, kind) => {
    if (kind === 'approve' && !window.confirm(`Approve ${b.name}? This creates a student account and emails login details.`)) return;
    setBusyId(b._id);
    try {
      await api.put(`/bookings/${b._id}/${kind}`);
      setToast(kind === 'approve' ? `Approved — account created for ${b.name}` : `Rejected ${b.name}`);
      setTimeout(() => setToast(''), 2800);
      load();
    } finally { setBusyId(null); }
  };

  return (
    <Reveal>
      <PageHead title="Booking Requests" subtitle="Approve visitors to create their student accounts." />
      {loading ? <Spinner /> : items.length === 0 ? <EmptyState label="No booking requests." /> : (
        <Stagger className="grid gap-4 lg:grid-cols-2">
          {items.map((b) => (
            <Item key={b._id}>
              <Panel className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-slate-900">{b.name}</h3>
                    <p className="text-xs text-slate-400">{new Date(b.createdAt).toLocaleDateString('en-IN')}</p>
                  </div>
                  <StatusPill value={b.status} />
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-y-1.5 text-sm">
                  <dt className="text-slate-400">Phone</dt><dd className="text-slate-700">{b.phone}</dd>
                  <dt className="text-slate-400">Email</dt><dd className="truncate text-slate-700">{b.email}</dd>
                  <dt className="text-slate-400">Room Type</dt><dd className="capitalize text-slate-700">{b.roomType}</dd>
                  <dt className="text-slate-400">College</dt><dd className="text-slate-700">{b.college || '—'}</dd>
                </dl>
                {b.message && <p className="mt-2 rounded-lg bg-slate-50 p-2 text-xs text-slate-500">{b.message}</p>}
                {b.status === 'pending' && (
                  <div className="mt-4 flex gap-2">
                    <button onClick={() => act(b, 'approve')} disabled={busyId === b._id} className="btn btn-primary flex-1 disabled:opacity-60"><FiCheck /> Approve</button>
                    <button onClick={() => act(b, 'reject')} disabled={busyId === b._id} className="btn btn-ghost flex-1 text-rose-500 disabled:opacity-60"><FiX /> Reject</button>
                  </div>
                )}
              </Panel>
            </Item>
          ))}
        </Stagger>
      )}
      {toast && <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-900 px-4 py-2 text-sm text-white shadow-lg">{toast}</div>}
    </Reveal>
  );
};

export default Bookings;
