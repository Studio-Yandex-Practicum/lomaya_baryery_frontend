import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../services/store';

export function RequireAuth({ children }: { children: React.ReactElement }) {
  const { isAuth } = useAuthStore();
  const location = useLocation();

  return isAuth ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
}
