import { useStore } from 'effector-react';
import { Navigate, useLocation } from 'react-router-dom';
import { $auth } from '../../../../../deprecated-services/deprecated-store/auth-store/auth';

export function RequireAuth({ children }: { children: React.ReactElement }) {
  const isAuth = useStore($auth);
  const location = useLocation();

  return isAuth ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
}
