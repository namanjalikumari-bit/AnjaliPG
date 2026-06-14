import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiInbox } from 'react-icons/fi';

// Page header inside dashboards
export const PageHead = ({ title, subtitle, children }) => (
  <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
    </div>
    {children && <div className="flex items-center gap-2">{children}</div>}
  </div>
);

// White rounded panel
export const Panel = ({ className = '', children }) => (
  <div className={`rounded-2xl border border-slate-200 bg-white shadow-soft ${className}`}>{children}</div>
);

export const Spinner = ({ label = 'Loading…' }) => (
  <div className="flex items-center justify-center gap-3 py-16 text-slate-400">
    <span className="h-5 w-5 animate-spin rounded-full border-2 border-brand-200 border-t-brand-500" />
    <span className="text-sm font-medium">{label}</span>
  </div>
);

export const EmptyState = ({ label = 'Nothing here yet.' }) => (
  <div className="flex flex-col items-center justify-center gap-2 py-16 text-slate-400">
    <FiInbox size={26} />
    <p className="text-sm font-medium">{label}</p>
  </div>
);

const statusMap = {
  paid: 'bg-emerald-50 text-emerald-600',
  active: 'bg-emerald-50 text-emerald-600',
  approved: 'bg-emerald-50 text-emerald-600',
  resolved: 'bg-emerald-50 text-emerald-600',
  available: 'bg-emerald-50 text-emerald-600',
  partial: 'bg-amber-50 text-amber-600',
  'in-progress': 'bg-amber-50 text-amber-600',
  pending: 'bg-amber-50 text-amber-600',
  read: 'bg-amber-50 text-amber-600',
  maintenance: 'bg-amber-50 text-amber-600',
  due: 'bg-rose-50 text-rose-600',
  open: 'bg-rose-50 text-rose-600',
  inactive: 'bg-rose-50 text-rose-600',
  rejected: 'bg-rose-50 text-rose-600',
  occupied: 'bg-rose-50 text-rose-600',
  new: 'bg-brand-50 text-brand-600',
};

export const StatusPill = ({ value }) => (
  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusMap[value] || 'bg-slate-100 text-slate-500'}`}>
    {value}
  </span>
);

// Lightweight modal
export const Modal = ({ open, onClose, title, children, wide = false }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={`w-full ${wide ? 'max-w-2xl' : 'max-w-lg'} overflow-hidden rounded-2xl bg-white shadow-2xl`}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h3 className="font-bold text-slate-900">{title}</h3>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600" aria-label="Close"><FiX /></button>
          </div>
          <div className="max-h-[70vh] overflow-y-auto p-5">{children}</div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export const Field = ({ label, children }) => (
  <label className="block">
    <span className="mb-1 block text-xs font-semibold text-slate-500">{label}</span>
    {children}
  </label>
);

export const inr = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;
