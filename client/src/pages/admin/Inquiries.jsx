import { useEffect, useState } from 'react';
import { FiMail, FiPhone } from 'react-icons/fi';
import api from '../../api/axios.js';
import { Reveal, Stagger, Item } from '../../components/Motion.jsx';
import { PageHead, Spinner, EmptyState, Panel, StatusPill } from '../../components/UI.jsx';

const flow = { new: 'read', read: 'resolved', resolved: 'new' };

const Inquiries = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.get('/contact').then(({ data }) => setItems(data)).catch(() => setItems([])).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const cycle = async (q) => {
    const status = flow[q.status];
    await api.put(`/contact/${q._id}`, { status });
    setItems((xs) => xs.map((x) => (x._id === q._id ? { ...x, status } : x)));
  };

  return (
    <Reveal>
      <PageHead title="Contact Inquiries" subtitle="Messages from the public contact form." />
      {loading ? <Spinner /> : items.length === 0 ? <EmptyState label="No inquiries yet." /> : (
        <Stagger className="grid gap-4 lg:grid-cols-2">
          {items.map((q) => (
            <Item key={q._id}>
              <Panel className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-slate-900">{q.name}</h3>
                    <p className="text-xs text-slate-400">{new Date(q.createdAt).toLocaleString('en-IN')}</p>
                  </div>
                  <button onClick={() => cycle(q)} title="Click to change status"><StatusPill value={q.status} /></button>
                </div>
                <p className="mt-3 text-sm text-slate-600">{q.message}</p>
                <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
                  <a href={`mailto:${q.email}`} className="flex items-center gap-1.5 hover:text-brand-600"><FiMail /> {q.email}</a>
                  {q.phone && <a href={`tel:${q.phone}`} className="flex items-center gap-1.5 hover:text-brand-600"><FiPhone /> {q.phone}</a>}
                </div>
              </Panel>
            </Item>
          ))}
        </Stagger>
      )}
    </Reveal>
  );
};

export default Inquiries;
