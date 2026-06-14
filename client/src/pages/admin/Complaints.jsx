import { useEffect, useState } from 'react';
import api from '../../api/axios.js';
import { Reveal, Stagger, Item } from '../../components/Motion.jsx';
import { PageHead, Spinner, EmptyState, Panel, StatusPill, Modal, Field } from '../../components/UI.jsx';

const statuses = ['open', 'in-progress', 'resolved'];
const prioTint = { high: 'text-rose-600', medium: 'text-amber-600', low: 'text-slate-500' };

const Complaints = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(null);
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('open');
  const [busy, setBusy] = useState(false);

  const load = () => {
    setLoading(true);
    api.get('/complaints').then(({ data }) => setItems(data)).catch(() => setItems([])).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const openOne = (c) => { setActive(c); setNote(c.adminNote || ''); setStatus(c.status); };
  const save = async () => {
    setBusy(true);
    try { await api.put(`/complaints/${active._id}`, { status, adminNote: note }); setActive(null); load(); }
    finally { setBusy(false); }
  };

  return (
    <Reveal>
      <PageHead title="Complaints" subtitle="Review and resolve resident complaints." />
      {loading ? <Spinner /> : items.length === 0 ? <EmptyState label="No complaints. All good!" /> : (
        <Stagger className="grid gap-4 lg:grid-cols-2">
          {items.map((c) => (
            <Item key={c._id}>
              <Panel className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-slate-900">{c.title}</h3>
                    <p className="text-xs text-slate-400">{c.student?.name} · {new Date(c.createdAt).toLocaleDateString('en-IN')}</p>
                  </div>
                  <StatusPill value={c.status} />
                </div>
                <p className="mt-3 text-sm text-slate-600">{c.description}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                  <span className="chip capitalize">{c.category}</span>
                  <span className={`font-semibold capitalize ${prioTint[c.priority]}`}>{c.priority} priority</span>
                </div>
                {c.aiSuggestion && <p className="mt-3 rounded-lg bg-brand-50 p-3 text-xs text-brand-700"><b>AI suggestion:</b> {c.aiSuggestion}</p>}
                {c.adminNote && <p className="mt-2 text-xs text-slate-500"><b>Note:</b> {c.adminNote}</p>}
                <button onClick={() => openOne(c)} className="btn btn-ghost mt-4 w-full">Update Status</button>
              </Panel>
            </Item>
          ))}
        </Stagger>
      )}

      <Modal open={!!active} onClose={() => setActive(null)} title="Update Complaint">
        {active && (
          <>
            <p className="mb-4 text-sm font-semibold text-slate-900">{active.title}</p>
            <Field label="Status">
              <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
                {statuses.map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
              </select>
            </Field>
            <div className="mt-4">
              <Field label="Admin note (visible to student)">
                <textarea className="input min-h-[90px]" value={note} onChange={(e) => setNote(e.target.value)} />
              </Field>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setActive(null)} className="btn btn-ghost">Cancel</button>
              <button onClick={save} disabled={busy} className="btn btn-primary disabled:opacity-60">{busy ? 'Saving…' : 'Save'}</button>
            </div>
          </>
        )}
      </Modal>
    </Reveal>
  );
};

export default Complaints;
