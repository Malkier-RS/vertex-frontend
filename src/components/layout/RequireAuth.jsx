import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { LoadingState } from '../ui/LoadingState.jsx';

export function RequireAuth() {
  const { user, authReady } = useAuth();
  if (!authReady) return <LoadingState />;
  if (!user) return <Navigate to="/login" replace state={{ from: 'protected' }} />;
  return <Outlet />;
}
