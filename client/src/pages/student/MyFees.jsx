import { useEffect, useState } from 'react';
import api from '../../api/axios.js';
import { Reveal } from '../../components/Motion.jsx';
import { PageHead, Panel, Spinner, EmptyState, StatusPill, inr } from '../../components/UI.jsx';

const MyFees = () => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/fees/me').then(({ data }) => setFees(data)).catch(() => setFees([])).finally(() => setLoading(false));
  }, []);

  const due = fees.reduce((s, f) => s + Math.max(0, f.totalAmount - f.paidAmount), 0);
  const paid = fees.reduce((s, f) => s + (f.paidAmount || 0), 0);

  if (loading) return <Spinner label="Loading fees…" />;

  return (
    <Reveal>
      <PageHead title="My Fees" subtitle="Your payment history and dues." />
      <div className="mb-4 grid grid-cols-2 gap-4 sm:max-w-md">
        <Panel className="p-4"><p className="text-xs font-semibold uppercase text-slate-400">Total Paid</p><p className="mt-1 text-xl font-extrabold text-emerald-600">{inr(paid)}</p></Panel>
        <Panel className="p-4"><p className="text-xs font-semibold uppercase text-slate-400">Pending</p><p className="mt-1 text-xl font-extrabold text-rose-600">{inr(due)}</p></Panel>
      </div>
      <Panel>
        {fees.length === 0 ? <EmptyState label="No fee records yet." /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-slate-400">
                <tr className="border-b border-slate-100">
                  <th className="px-4 py-3 font-semibold">Month</th>
                  <th className="px-4 py-3 font-semibold">Total</th>
                  <th className="px-4 py-3 font-semibold">Paid</th>
                  <th className="px-4 py-3 font-semibold">Due</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {fees.map((f) => (
                  <tr key={f._id} className="hover:bg-slate-50/60">
                    <td className="px-4 py-3 font-semibold text-slate-900">{f.month}</td>
                    <td className="px-4 py-3 text-slate-600">{inr(f.totalAmount)}</td>
                    <td className="px-4 py-3 text-slate-600">{inr(f.paidAmount)}</td>
                    <td className="px-4 py-3 text-slate-600">{inr(f.totalAmount - f.paidAmount)}</td>
                    <td className="px-4 py-3"><StatusPill value={f.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </Reveal>
  );
};

export default MyFees;
