import { useStore } from 'effector-react';
import { Navigate, useLocation } from 'react-router-dom';
import { viewerModel } from 'entities/viewer';
import { Loader } from 'shared/ui-kit/loader';

export function RequireAuth({ children }: { children: React.ReactElement }) {
  const isAuth = useStore(viewerModel.$isAuth);
  const isVerifying = useStore(viewerModel.$isVerifying);

  const location = useLocation();

  if (isVerifying) {
    return <Loader fullScreen />;
  }

  return isAuth ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
}
