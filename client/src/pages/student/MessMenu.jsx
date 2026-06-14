import { useEffect, useState } from 'react';
import api from '../../api/axios.js';
import { Reveal } from '../../components/Motion.jsx';
import { PageHead, Panel, Spinner, EmptyState } from '../../components/UI.jsx';
import { fallbackMenu } from '../../data/content.js';

const cols = [['breakfast', 'Breakfast'], ['lunch', 'Lunch'], ['snacks', 'Evening Snacks'], ['dinner', 'Dinner']];

const MessMenu = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/mess')
      .then(({ data }) => setMenu(data.length ? data : fallbackMenu))
      .catch(() => setMenu(fallbackMenu))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner label="Loading menu…" />;

  return (
    <Reveal>
      <PageHead title="Mess Menu" subtitle="This week's meals, served fresh every day." />
      <Panel className="overflow-x-auto">
        {menu.length === 0 ? <EmptyState label="Menu not set yet." /> : (
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-50/60 text-xs uppercase tracking-wide text-brand-700">
              <tr>
                <th className="px-4 py-3 font-semibold">Day</th>
                {cols.map(([, label]) => <th key={label} className="px-4 py-3 font-semibold">{label}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {menu.map((row) => (
                <tr key={row.day} className="hover:bg-slate-50/60">
                  <td className="px-4 py-3 font-semibold text-slate-900">{row.day}</td>
                  {cols.map(([k]) => <td key={k} className="px-4 py-3 text-slate-600">{row[k] || '—'}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Panel>
      <p className="mt-3 text-xs text-slate-400">*Menu is subject to change.</p>
    </Reveal>
  );
};

export default MessMenu;
