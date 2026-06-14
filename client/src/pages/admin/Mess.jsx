import { useEffect, useState } from 'react';
import { FiSave } from 'react-icons/fi';
import api from '../../api/axios.js';
import { Reveal } from '../../components/Motion.jsx';
import { PageHead, Spinner, Panel } from '../../components/UI.jsx';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEALS = [['breakfast', 'Breakfast'], ['lunch', 'Lunch'], ['snacks', 'Evening Snacks'], ['dinner', 'Dinner']];
const empty = () => DAYS.reduce((a, d) => ({ ...a, [d]: { breakfast: '', lunch: '', snacks: '', dinner: '' } }), {});

const Mess = () => {
  const [menu, setMenu] = useState(empty());
  const [loading, setLoading] = useState(true);
  const [savingDay, setSavingDay] = useState('');
  const [toast, setToast] = useState('');

  useEffect(() => {
    api.get('/mess').then(({ data }) => {
      const m = empty();
      data.forEach((row) => { m[row.day] = { breakfast: row.breakfast, lunch: row.lunch, snacks: row.snacks, dinner: row.dinner }; });
      setMenu(m);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const edit = (day, meal) => (e) => setMenu((m) => ({ ...m, [day]: { ...m[day], [meal]: e.target.value } }));

  const saveDay = async (day) => {
    setSavingDay(day);
    try {
      await api.put(`/mess/${day}`, menu[day]);
      setToast(`${day} saved`); setTimeout(() => setToast(''), 2000);
    } finally { setSavingDay(''); }
  };

  if (loading) return <Spinner label="Loading menu…" />;

  return (
    <Reveal>
      <PageHead title="Mess Menu" subtitle="Edit the weekly menu. Changes show on the public Meals page." />
      <div className="space-y-4">
        {DAYS.map((day) => (
          <Panel key={day} className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">{day}</h3>
              <button onClick={() => saveDay(day)} disabled={savingDay === day} className="btn btn-ghost text-brand-600 disabled:opacity-60">
                <FiSave /> {savingDay === day ? 'Saving…' : 'Save'}
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {MEALS.map(([k, label]) => (
                <label key={k} className="block">
                  <span className="mb-1 block text-xs font-semibold text-slate-500">{label}</span>
                  <input className="input" value={menu[day][k]} onChange={edit(day, k)} placeholder="—" />
                </label>
              ))}
            </div>
          </Panel>
        ))}
      </div>
      {toast && <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-900 px-4 py-2 text-sm text-white shadow-lg">{toast}</div>}
    </Reveal>
  );
};

export default Mess;
