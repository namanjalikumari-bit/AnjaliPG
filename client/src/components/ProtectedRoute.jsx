import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const ProtectedRoute = ({ role, children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to={role === 'admin' ? '/admin/login' : '/student/login'} replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;
