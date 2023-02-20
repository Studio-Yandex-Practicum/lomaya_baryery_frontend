import { useStore } from 'effector-react';
import { Navigate, useLocation } from 'react-router-dom';
import { appUserModel } from '../..';

export function RequireAuth({ children }: { children: React.ReactElement }) {
  const isAuth = useStore(appUserModel.$isAuth);
  const location = useLocation();

  return isAuth ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
}
