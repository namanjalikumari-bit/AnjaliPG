import { useEffect, useState } from 'react';
import { FiPlus, FiTrash2, FiEdit2, FiStar } from 'react-icons/fi';
import api from '../../api/axios.js';
import { Reveal, Stagger, Item } from '../../components/Motion.jsx';
import { PageHead, Spinner, EmptyState, Panel, Modal, Field } from '../../components/UI.jsx';

const cats = ['room', 'common', 'service'];
const blank = { name: '', category: 'room', description: '', icon: 'star', order: 0 };

const Amenities = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);
  const [busy, setBusy] = useState(false);

  const load = () => {
    setLoading(true);
    api.get('/amenities').then(({ data }) => setItems(data)).catch(() => setItems([])).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const openAdd = () => { setEditing(null); setForm(blank); setOpen(true); };
  const openEdit = (a) => { setEditing(a); setForm({ name: a.name, category: a.category, description: a.description || '', icon: a.icon || 'star', order: a.order || 0 }); setOpen(true); };

  const save = async () => {
    setBusy(true);
    try {
      if (editing) await api.put(`/amenities/${editing._id}`, form);
      else await api.post('/amenities', form);
      setOpen(false); load();
    } finally { setBusy(false); }
  };
  const remove = async (a) => {
    if (!window.confirm(`Remove "${a.name}"?`)) return;
    await api.delete(`/amenities/${a._id}`); load();
  };

  const grouped = cats.map((c) => ({ cat: c, list: items.filter((i) => i.category === c) }));

  return (
    <Reveal>
      <PageHead title="Amenities" subtitle="Facilities shown across the public site.">
        <button onClick={openAdd} className="btn btn-primary"><FiPlus /> Add Amenity</button>
      </PageHead>

      {loading ? <Spinner /> : items.length === 0 ? <EmptyState label="No amenities yet." /> : (
        <div className="space-y-8">
          {grouped.map(({ cat, list }) => list.length > 0 && (
            <div key={cat}>
              <h3 className="mb-3 text-sm font-bold capitalize text-slate-700">{cat} amenities</h3>
              <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((a) => (
                  <Item key={a._id}>
                    <Panel className="flex items-start gap-3 p-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><FiStar /></span>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-slate-900">{a.name}</p>
                        {a.description && <p className="text-xs text-slate-400">{a.description}</p>}
                      </div>
                      <div className="flex flex-col gap-1">
                        <button onClick={() => openEdit(a)} className="text-slate-400 hover:text-brand-600" aria-label="Edit"><FiEdit2 size={15} /></button>
                        <button onClick={() => remove(a)} className="text-slate-400 hover:text-rose-600" aria-label="Delete"><FiTrash2 size={15} /></button>
                      </div>
                    </Panel>
                  </Item>
                ))}
              </Stagger>
            </div>
          ))}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit Amenity' : 'Add Amenity'}>
        <div className="grid gap-4">
          <Field label="Name"><input className="input" value={form.name} onChange={set('name')} /></Field>
          <Field label="Category">
            <select className="input" value={form.category} onChange={set('category')}>
              {cats.map((c) => <option key={c} value={c} className="capitalize">{c}</option>)}
            </select>
          </Field>
          <Field label="Description"><input className="input" value={form.description} onChange={set('description')} /></Field>
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button onClick={() => setOpen(false)} className="btn btn-ghost">Cancel</button>
          <button onClick={save} disabled={busy || !form.name} className="btn btn-primary disabled:opacity-60">{busy ? 'Saving…' : 'Save'}</button>
        </div>
      </Modal>
    </Reveal>
  );
};

export default Amenities;
