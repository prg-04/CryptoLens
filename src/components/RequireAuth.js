import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RequireAuth = () => {
  const { currentUser } = useAuth();
  const location = useLocation();

  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/signup" state={{ from: location }} replace />
  );
};

export default RequireAuth;
