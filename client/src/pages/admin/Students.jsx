import { useEffect, useState } from 'react';
import { FiPlus, FiEdit2, FiSearch, FiUserX } from 'react-icons/fi';
import api from '../../api/axios.js';
import { Reveal } from '../../components/Motion.jsx';
import { PageHead, Panel, Spinner, EmptyState, StatusPill, Modal, Field } from '../../components/UI.jsx';

const blank = { name: '', email: '', phone: '', password: '', gender: 'male', college: '', course: '' };

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  const load = () => {
    setLoading(true);
    api.get('/students').then(({ data }) => setStudents(data)).catch(() => setStudents([])).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const openAdd = () => { setEditing(null); setForm(blank); setErr(''); setOpen(true); };
  const openEdit = (s) => {
    setEditing(s);
    setForm({ gender: s.gender, college: s.college || '', course: s.course || '', name: s.user?.name || '', phone: s.user?.phone || '' });
    setErr(''); setOpen(true);
  };

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const save = async () => {
    setSaving(true); setErr('');
    try {
      if (editing) await api.put(`/students/${editing._id}`, { gender: form.gender, college: form.college, course: form.course });
      else await api.post('/students', form);
      setOpen(false); load();
    } catch (e) { setErr(e.response?.data?.message || 'Could not save student'); }
    finally { setSaving(false); }
  };

  const deactivate = async (s) => {
    if (!window.confirm(`Deactivate ${s.user?.name}?`)) return;
    await api.delete(`/students/${s._id}`); load();
  };

  const filtered = students.filter((s) =>
    [s.user?.name, s.user?.email, s.user?.phone, s.room?.roomNumber].join(' ').toLowerCase().includes(q.toLowerCase()));

  return (
    <Reveal>
      <PageHead title="Students" subtitle="Manage residents and their profiles.">
        <button onClick={openAdd} className="btn btn-primary"><FiPlus /> Add Student</button>
      </PageHead>

      <Panel>
        <div className="border-b border-slate-100 p-4">
          <div className="relative max-w-sm">
            <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search students…" className="input pl-9" />
          </div>
        </div>

        {loading ? <Spinner /> : filtered.length === 0 ? <EmptyState label="No students found." /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-slate-400">
                <tr className="border-b border-slate-100">
                  <th className="px-4 py-3 font-semibold">#</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Phone</th>
                  <th className="px-4 py-3 font-semibold">Room / Bed</th>
                  <th className="px-4 py-3 font-semibold">Join Date</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((s, i) => (
                  <tr key={s._id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-3 text-slate-400">{i + 1}</td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-slate-900">{s.user?.name}</p>
                      <p className="text-xs text-slate-400">{s.user?.email}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{s.user?.phone || '—'}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {s.room?.roomNumber ? `${s.room.roomNumber} / ${s.bed?.bedNumber || '—'}` : '—'}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{new Date(s.joinDate).toLocaleDateString('en-IN')}</td>
                    <td className="px-4 py-3"><StatusPill value={s.user?.isActive === false ? 'inactive' : s.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openEdit(s)} className="rounded-lg p-2 text-slate-400 hover:bg-brand-50 hover:text-brand-600" aria-label="Edit"><FiEdit2 /></button>
                        <button onClick={() => deactivate(s)} className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600" aria-label="Deactivate"><FiUserX /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit Student' : 'Add Student'}>
        <div className="grid gap-4 sm:grid-cols-2">
          {!editing && <Field label="Full Name"><input className="input" value={form.name} onChange={set('name')} /></Field>}
          {!editing && <Field label="Email"><input className="input" value={form.email} onChange={set('email')} /></Field>}
          {!editing && <Field label="Phone"><input className="input" value={form.phone} onChange={set('phone')} /></Field>}
          {!editing && <Field label="Temp Password"><input className="input" value={form.password} onChange={set('password')} placeholder="student123" /></Field>}
          <Field label="Gender">
            <select className="input" value={form.gender} onChange={set('gender')}>
              <option value="male">Male</option><option value="female">Female</option><option value="other">Other</option>
            </select>
          </Field>
          <Field label="College"><input className="input" value={form.college} onChange={set('college')} /></Field>
          <Field label="Course"><input className="input" value={form.course} onChange={set('course')} /></Field>
        </div>
        {err && <p className="mt-3 text-sm text-rose-500">{err}</p>}
        <div className="mt-5 flex justify-end gap-2">
          <button onClick={() => setOpen(false)} className="btn btn-ghost">Cancel</button>
          <button onClick={save} disabled={saving} className="btn btn-primary disabled:opacity-60">{saving ? 'Saving…' : 'Save'}</button>
        </div>
      </Modal>
    </Reveal>
  );
};

export default Students;
