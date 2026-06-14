import { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import api from '../../api/axios.js';
import { Reveal, Stagger, Item } from '../../components/Motion.jsx';
import { PageHead, Panel, Spinner, EmptyState, StatusPill, Modal, Field } from '../../components/UI.jsx';

const blank = { title: '', description: '' };

const MyComplaints = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(blank);
  const [busy, setBusy] = useState(false);

  const load = () => {
    setLoading(true);
    api.get('/complaints/me').then(({ data }) => setItems(data)).catch(() => setItems([])).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = async () => {
    setBusy(true);
    try { await api.post('/complaints', form); setOpen(false); setForm(blank); load(); }
    finally { setBusy(false); }
  };

  return (
    <Reveal>
      <PageHead title="My Complaints" subtitle="Raise an issue and track its status.">
        <button onClick={() => { setForm(blank); setOpen(true); }} className="btn btn-primary"><FiPlus /> New Complaint</button>
      </PageHead>

      {loading ? <Spinner /> : items.length === 0 ? <EmptyState label="No complaints raised." /> : (
        <Stagger className="grid gap-4 lg:grid-cols-2">
          {items.map((c) => (
            <Item key={c._id}>
              <Panel className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-slate-900">{c.title}</h3>
                    <p className="text-xs text-slate-400">{new Date(c.createdAt).toLocaleDateString('en-IN')} · <span className="capitalize">{c.category}</span></p>
                  </div>
                  <StatusPill value={c.status} />
                </div>
                <p className="mt-3 text-sm text-slate-600">{c.description}</p>
                {c.adminNote && <p className="mt-3 rounded-lg bg-brand-50 p-3 text-xs text-brand-700"><b>Admin response:</b> {c.adminNote}</p>}
              </Panel>
            </Item>
          ))}
        </Stagger>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Raise a Complaint">
        <div className="grid gap-4">
          <Field label="Title"><input className="input" value={form.title} onChange={set('title')} placeholder="e.g. WiFi not working" /></Field>
          <Field label="Describe the issue"><textarea className="input min-h-[110px]" value={form.description} onChange={set('description')} /></Field>
        </div>
        <p className="mt-2 text-xs text-slate-400">Your complaint will be categorized and routed to the admin automatically.</p>
        <div className="mt-5 flex justify-end gap-2">
          <button onClick={() => setOpen(false)} className="btn btn-ghost">Cancel</button>
          <button onClick={submit} disabled={busy || !form.title || !form.description} className="btn btn-primary disabled:opacity-60">{busy ? 'Submitting…' : 'Submit'}</button>
        </div>
      </Modal>
    </Reveal>
  );
};

export default MyComplaints;
