import { useEffect, useState } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import api from '../../api/axios.js';
import { Reveal, Stagger, Item } from '../../components/Motion.jsx';
import { PageHead, Spinner, EmptyState, Panel, Modal, Field } from '../../components/UI.jsx';

const prio = ['normal', 'important', 'urgent'];
const tint = { normal: 'bg-slate-100 text-slate-500', important: 'bg-amber-50 text-amber-600', urgent: 'bg-rose-50 text-rose-600' };
const blank = { title: '', body: '', priority: 'normal' };

const Notices = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(blank);
  const [busy, setBusy] = useState(false);

  const load = () => {
    setLoading(true);
    api.get('/notices').then(({ data }) => setItems(data)).catch(() => setItems([])).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const add = async () => {
    setBusy(true);
    try { await api.post('/notices', form); setOpen(false); setForm(blank); load(); }
    finally { setBusy(false); }
  };
  const remove = async (n) => {
    if (!window.confirm('Delete this notice?')) return;
    await api.delete(`/notices/${n._id}`); load();
  };

  return (
    <Reveal>
      <PageHead title="Notices" subtitle="Broadcast announcements to all residents.">
        <button onClick={() => { setForm(blank); setOpen(true); }} className="btn btn-primary"><FiPlus /> New Notice</button>
      </PageHead>

      {loading ? <Spinner /> : items.length === 0 ? <EmptyState label="No notices posted." /> : (
        <Stagger className="space-y-3">
          {items.map((n) => (
            <Item key={n._id}>
              <Panel className="flex items-start justify-between gap-4 p-5">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900">{n.title}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize ${tint[n.priority]}`}>{n.priority}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{n.body}</p>
                  <p className="mt-2 text-xs text-slate-400">{new Date(n.createdAt).toLocaleString('en-IN')}</p>
                </div>
                <button onClick={() => remove(n)} className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600" aria-label="Delete"><FiTrash2 /></button>
              </Panel>
            </Item>
          ))}
        </Stagger>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="New Notice">
        <div className="grid gap-4">
          <Field label="Title"><input className="input" value={form.title} onChange={set('title')} /></Field>
          <Field label="Message"><textarea className="input min-h-[100px]" value={form.body} onChange={set('body')} /></Field>
          <Field label="Priority">
            <select className="input" value={form.priority} onChange={set('priority')}>
              {prio.map((p) => <option key={p} value={p} className="capitalize">{p}</option>)}
            </select>
          </Field>
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button onClick={() => setOpen(false)} className="btn btn-ghost">Cancel</button>
          <button onClick={add} disabled={busy || !form.title || !form.body} className="btn btn-primary disabled:opacity-60">{busy ? 'Posting…' : 'Post'}</button>
        </div>
      </Modal>
    </Reveal>
  );
};

export default Notices;
