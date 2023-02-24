import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from 'effector-react';
import { ForgotPwdForm } from 'features/auth';
import { getFromProp } from 'shared/lib';
import { viewerModel } from 'entities/viewer';

export function ForgotPassword() {
  const location = useLocation();
  const isAuth = useStore(viewerModel.$isAuth);

  if (isAuth) {
    return <Navigate to={getFromProp(location.state) || '/'} replace />;
  }

  return <ForgotPwdForm />;
}
