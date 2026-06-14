import { useEffect, useState } from 'react';
import { FiSave } from 'react-icons/fi';
import api from '../../api/axios.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { Reveal } from '../../components/Motion.jsx';
import { PageHead, Panel, Spinner, Field } from '../../components/UI.jsx';

const fields = [
  ['college', 'College'], ['course', 'Course'], ['address', 'Home Address'],
  ['guardianName', 'Guardian Name'], ['guardianPhone', 'Guardian Phone'], ['emergencyContact', 'Emergency Contact'],
];

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    api.get('/students/me/profile').then(({ data }) => {
      setProfile(data);
      setForm(data || {});
    }).catch(() => setProfile(null)).finally(() => setLoading(false));
  }, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const save = async () => {
    if (!profile?._id) return;
    setBusy(true);
    try {
      const payload = Object.fromEntries(fields.map(([k]) => [k, form[k] || '']));
      payload.gender = form.gender || profile.gender;
      await api.put(`/students/${profile._id}`, payload);
      setToast('Profile updated'); setTimeout(() => setToast(''), 2000);
    } finally { setBusy(false); }
  };

  if (loading) return <Spinner label="Loading profile…" />;

  return (
    <Reveal>
      <PageHead title="My Profile" subtitle="Keep your details up to date." />
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel className="p-6 text-center lg:col-span-1">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-100 text-3xl font-extrabold text-brand-600">
            {user?.name?.[0] || 'S'}
          </div>
          <h3 className="mt-3 text-lg font-bold text-slate-900">{user?.name}</h3>
          <p className="text-sm text-slate-400">{user?.email}</p>
          <p className="mt-1 text-sm text-slate-400">{user?.phone}</p>
          <span className="mt-3 inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold capitalize text-brand-600">
            {profile?.gender || '—'}
          </span>
        </Panel>

        <Panel className="p-6 lg:col-span-2">
          {!profile ? <p className="text-sm text-slate-400">No profile found.</p> : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                {fields.map(([k, label]) => (
                  <Field key={k} label={label}>
                    <input className="input" value={form[k] || ''} onChange={set(k)} />
                  </Field>
                ))}
              </div>
              <div className="mt-5 flex justify-end">
                <button onClick={save} disabled={busy} className="btn btn-primary disabled:opacity-60"><FiSave /> {busy ? 'Saving…' : 'Save Changes'}</button>
              </div>
            </>
          )}
        </Panel>
      </div>
      {toast && <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-900 px-4 py-2 text-sm text-white shadow-lg">{toast}</div>}
    </Reveal>
  );
};

export default Profile;
