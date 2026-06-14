import { useEffect, useState } from 'react';
import { FiBell, FiCheck } from 'react-icons/fi';
import api from '../../api/axios.js';
import { Reveal } from '../../components/Motion.jsx';
import { PageHead, Panel, Spinner, EmptyState, StatusPill, Modal, Field, inr } from '../../components/UI.jsx';

const Fees = () => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [active, setActive] = useState(null);
  const [pay, setPay] = useState('');
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState('');

  const load = () => {
    setLoading(true);
    api.get('/fees').then(({ data }) => setFees(data)).catch(() => setFees([])).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const collect = async () => {
    setBusy(true);
    try {
      const paidAmount = Math.min(active.totalAmount, (active.paidAmount || 0) + Number(pay || 0));
      await api.put(`/fees/${active._id}`, { paidAmount });
      setActive(null); setPay(''); load();
    } finally { setBusy(false); }
  };

  const remind = async (f) => {
    await api.post(`/fees/${f._id}/remind`);
    setToast(`Reminder queued for ${f.student?.name}`);
    setTimeout(() => setToast(''), 2500);
  };

  const filtered = filter === 'all' ? fees : fees.filter((f) => f.status === filter);
  const totalRevenue = fees.reduce((s, f) => s + (f.paidAmount || 0), 0);

  return (
    <Reveal>
      <PageHead title="Fees Management" subtitle="Track payments and send reminders.">
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input w-40">
          <option value="all">All Status</option>
          <option value="paid">Paid</option>
          <option value="partial">Partial</option>
          <option value="due">Due</option>
        </select>
      </PageHead>

      <Panel>
        {loading ? <Spinner /> : filtered.length === 0 ? <EmptyState label="No fee records." /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-slate-400">
                <tr className="border-b border-slate-100">
                  <th className="px-4 py-3 font-semibold">#</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Month</th>
                  <th className="px-4 py-3 font-semibold">Total</th>
                  <th className="px-4 py-3 font-semibold">Paid</th>
                  <th className="px-4 py-3 font-semibold">Due</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((f, i) => (
                  <tr key={f._id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-3 text-slate-400">{i + 1}</td>
                    <td className="px-4 py-3 font-semibold text-slate-900">{f.student?.name || '—'}</td>
                    <td className="px-4 py-3 text-slate-600">{f.month}</td>
                    <td className="px-4 py-3 text-slate-600">{inr(f.totalAmount)}</td>
                    <td className="px-4 py-3 text-slate-600">{inr(f.paidAmount)}</td>
                    <td className="px-4 py-3 text-slate-600">{inr(f.totalAmount - f.paidAmount)}</td>
                    <td className="px-4 py-3"><StatusPill value={f.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        {f.status !== 'paid' && (
                          <>
                            <button onClick={() => { setActive(f); setPay(''); }} className="rounded-lg p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600" aria-label="Collect"><FiCheck /></button>
                            <button onClick={() => remind(f)} className="rounded-lg p-2 text-slate-400 hover:bg-amber-50 hover:text-amber-600" aria-label="Remind"><FiBell /></button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-4 py-4 text-sm">
              <span className="text-slate-500">Total Revenue:</span>
              <span className="font-extrabold text-slate-900">{inr(totalRevenue)}</span>
            </div>
          </div>
        )}
      </Panel>

      <Modal open={!!active} onClose={() => setActive(null)} title="Collect Payment">
        {active && (
          <>
            <p className="text-sm text-slate-600">{active.student?.name} · {active.month}</p>
            <p className="mb-4 text-sm text-slate-400">Outstanding: <b className="text-slate-700">{inr(active.totalAmount - active.paidAmount)}</b></p>
            <Field label="Amount received now (₹)">
              <input type="number" className="input" value={pay} onChange={(e) => setPay(e.target.value)} placeholder={String(active.totalAmount - active.paidAmount)} />
            </Field>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setActive(null)} className="btn btn-ghost">Cancel</button>
              <button onClick={collect} disabled={busy} className="btn btn-primary disabled:opacity-60">{busy ? 'Saving…' : 'Record Payment'}</button>
            </div>
          </>
        )}
      </Modal>

      {toast && <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-900 px-4 py-2 text-sm text-white shadow-lg">{toast}</div>}
    </Reveal>
  );
};

export default Fees;
