import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TbHome2 } from 'react-icons/tb';
import { useAuth } from '../../context/AuthContext.jsx';

const Login = ({ role }) => {
  const isAdmin = role === 'admin';
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError('');
    setLoading(true);
    try {
      const data = await login(form.email, form.password);
      if (isAdmin && data.role !== 'admin') {
        setError('This login is for admins only.');
        return;
      }
      navigate(data.role === 'admin' ? '/admin' : '/student');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl"
      >
        <div className="flex flex-col items-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 text-white">
            <TbHome2 size={24} />
          </span>
          <h1 className="mt-3 text-xl font-extrabold text-slate-900">Anjali PG</h1>
          <p className="text-lg font-bold text-brand-600">{isAdmin ? 'Admin Login' : 'Student Login'}</p>
          <p className="mt-1 text-xs text-slate-400">Welcome back! Please login to continue.</p>
        </div>

        <div className="mt-6 space-y-3">
          <input className="input" placeholder="Email" type="email" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            onKeyDown={(e) => e.key === 'Enter' && submit()} />
          <input className="input" placeholder="Password" type="password" value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            onKeyDown={(e) => e.key === 'Enter' && submit()} />
          {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-600">{error}</p>}
          <button onClick={submit} disabled={loading} className="btn-primary w-full">
            {loading ? 'Logging in…' : 'Login'}
          </button>
        </div>

        <div className="mt-5 text-center text-xs text-slate-400">
          {isAdmin ? (
            <Link to="/student/login" className="hover:text-brand-600">Student login →</Link>
          ) : (
            <Link to="/admin/login" className="hover:text-brand-600">Admin login →</Link>
          )}
          <span className="mx-2">·</span>
          <Link to="/" className="hover:text-brand-600">Back to site</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
