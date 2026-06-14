import { useEffect, useState } from 'react';
import { FiStar, FiTrash2, FiCheck, FiEyeOff } from 'react-icons/fi';
import api from '../../api/axios.js';
import { Reveal, Stagger, Item } from '../../components/Motion.jsx';
import { PageHead, Spinner, EmptyState, Panel } from '../../components/UI.jsx';

const Stars = ({ n }) => (
  <span className="flex gap-0.5 text-amber-400">
    {Array.from({ length: 5 }).map((_, i) => <FiStar key={i} size={14} fill={i < n ? 'currentColor' : 'none'} />)}
  </span>
);

const Reviews = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.get('/reviews/all').then(({ data }) => setItems(data)).catch(() => setItems([])).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const toggle = async (r) => {
    await api.put(`/reviews/${r._id}`, { isApproved: !r.isApproved });
    setItems((xs) => xs.map((x) => (x._id === r._id ? { ...x, isApproved: !x.isApproved } : x)));
  };
  const remove = async (r) => {
    if (!window.confirm('Delete this review?')) return;
    await api.delete(`/reviews/${r._id}`); load();
  };

  return (
    <Reveal>
      <PageHead title="Reviews" subtitle="Approve reviews to show them on the public site." />
      {loading ? <Spinner /> : items.length === 0 ? <EmptyState label="No reviews submitted." /> : (
        <Stagger className="grid gap-4 lg:grid-cols-2">
          {items.map((r) => (
            <Item key={r._id}>
              <Panel className={`p-5 ${r.isApproved ? '' : 'opacity-80'}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-slate-900">{r.name}</h3>
                    <Stars n={r.rating} />
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${r.isApproved ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                    {r.isApproved ? 'Published' : 'Hidden'}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-600">{r.comment}</p>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => toggle(r)} className="btn btn-ghost flex-1">
                    {r.isApproved ? <><FiEyeOff /> Hide</> : <><FiCheck /> Publish</>}
                  </button>
                  <button onClick={() => remove(r)} className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600" aria-label="Delete"><FiTrash2 /></button>
                </div>
              </Panel>
            </Item>
          ))}
        </Stagger>
      )}
    </Reveal>
  );
};

export default Reviews;
