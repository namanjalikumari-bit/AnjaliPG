import { useEffect, useState } from 'react';
import { FiPlus, FiTrash2, FiUpload } from 'react-icons/fi';
import api from '../../api/axios.js';
import { Reveal, Stagger, Item } from '../../components/Motion.jsx';
import { PageHead, Spinner, EmptyState, Panel, Modal, Field } from '../../components/UI.jsx';
import SmartImage from '../../components/SmartImage.jsx';
import { IMAGES } from '../../data/galleryImages.js';

const categories = ['rooms', 'common', 'dining', 'events', 'gym', 'study', 'other'];
const blank = { title: '', category: 'rooms', image: '', key: '' };

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(blank);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);

  const load = () => {
    setLoading(true);
    api.get('/gallery').then(({ data }) => setItems(data)).catch(() => setItems([])).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const pickKey = (e) => {
    const key = e.target.value;
    setForm((f) => ({ ...f, key, image: IMAGES[key]?.src || f.image, title: f.title || IMAGES[key]?.alt || '' }));
  };

  const add = async () => {
    setBusy(true);
    try { await api.post('/gallery', form); setOpen(false); setForm(blank); load(); }
    finally { setBusy(false); }
  };
  const remove = async (g) => {
    if (!window.confirm('Remove this image?')) return;
    await api.delete(`/gallery/${g._id}`); load();
  };

  const upload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const { data } = await api.post('/gallery/upload', { image: dataUrl });
      setForm((f) => ({ ...f, image: data.url, key: '' }));
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <Reveal>
      <PageHead title="Gallery" subtitle="Curate the images shown on the public gallery.">
        <button onClick={() => { setForm(blank); setOpen(true); }} className="btn btn-primary"><FiPlus /> Add Image</button>
      </PageHead>

      {loading ? <Spinner /> : items.length === 0 ? <EmptyState label="No gallery images." /> : (
        <Stagger className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((g) => (
            <Item key={g._id}>
              <Panel className="group overflow-hidden">
                <SmartImage src={g.image} alt={g.title} aspect="aspect-[4/3]" />
                <div className="flex items-center justify-between p-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">{g.title}</p>
                    <p className="text-xs capitalize text-slate-400">{g.category}</p>
                  </div>
                  <button onClick={() => remove(g)} className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600" aria-label="Delete"><FiTrash2 /></button>
                </div>
              </Panel>
            </Item>
          ))}
        </Stagger>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Add Gallery Image">
        <div className="grid gap-4">
          <Field label="Use a project image">
            <select className="input" value={form.key} onChange={pickKey}>
              <option value="">— select —</option>
              {Object.entries(IMAGES).map(([k, v]) => <option key={k} value={k}>{v.alt}</option>)}
            </select>
          </Field>
          <Field label="Image URL"><input className="input" value={form.image} onChange={set('image')} placeholder="/images/room-single.jpg" /></Field>
          <Field label="Or upload from device">
            <label className="btn btn-ghost cursor-pointer">
              <FiUpload /> {uploading ? 'Uploading…' : 'Choose file'}
              <input type="file" accept="image/*" className="hidden" onChange={upload} disabled={uploading} />
            </label>
          </Field>
          {form.image && (
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <SmartImage src={form.image} alt="Preview" aspect="aspect-[4/3]" />
            </div>
          )}
          <Field label="Title"><input className="input" value={form.title} onChange={set('title')} /></Field>
          <Field label="Category">
            <select className="input" value={form.category} onChange={set('category')}>
              {categories.map((c) => <option key={c} value={c} className="capitalize">{c}</option>)}
            </select>
          </Field>
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button onClick={() => setOpen(false)} className="btn btn-ghost">Cancel</button>
          <button onClick={add} disabled={busy || !form.image} className="btn btn-primary disabled:opacity-60">{busy ? 'Saving…' : 'Add'}</button>
        </div>
      </Modal>
    </Reveal>
  );
};

export default Gallery;
