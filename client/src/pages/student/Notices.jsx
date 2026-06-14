import { useEffect, useState } from 'react';
import { FiBell } from 'react-icons/fi';
import api from '../../api/axios.js';
import { Reveal, Stagger, Item } from '../../components/Motion.jsx';
import { PageHead, Panel, Spinner, EmptyState } from '../../components/UI.jsx';

const tint = { normal: 'bg-slate-100 text-slate-500', important: 'bg-amber-50 text-amber-600', urgent: 'bg-rose-50 text-rose-600' };

const Notices = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/notices').then(({ data }) => setItems(data)).catch(() => setItems([])).finally(() => setLoading(false));
  }, []);

  return (
    <Reveal>
      <PageHead title="Notices" subtitle="Announcements from the PG management." />
      {loading ? <Spinner /> : items.length === 0 ? <EmptyState label="No notices right now." /> : (
        <Stagger className="space-y-3">
          {items.map((n) => (
            <Item key={n._id}>
              <Panel className="flex items-start gap-4 p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><FiBell /></span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900">{n.title}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize ${tint[n.priority]}`}>{n.priority}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{n.body}</p>
                  <p className="mt-2 text-xs text-slate-400">{new Date(n.createdAt).toLocaleString('en-IN')}</p>
                </div>
              </Panel>
            </Item>
          ))}
        </Stagger>
      )}
    </Reveal>
  );
};

export default Notices;
