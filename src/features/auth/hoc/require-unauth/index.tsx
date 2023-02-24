import { useStore } from 'effector-react';
import { Navigate, useLocation } from 'react-router-dom';
import { viewerModel } from 'entities/viewer';
import { Loader } from 'shared/ui-kit/loader';
import { getFromProp } from 'shared/lib';

export function RequireUnauth({ children }: { children: React.ReactElement }) {
  const isAuth = useStore(viewerModel.$isAuth);
  const isVerifying = useStore(viewerModel.$isVerifying);

  const location = useLocation();

  if (isVerifying) {
    return <Loader fullScreen />;
  }

  if (isAuth) {
    return <Navigate to={getFromProp(location.state) || '/'} replace />;
  }

  return children;
}
