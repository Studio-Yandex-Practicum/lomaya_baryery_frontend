import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from 'effector-react';
import { authModel, ForgotPwdForm } from 'processes/auth';

export function ForgotPassword() {
  const { state: locationState } = useLocation();
  const isAuth = useStore(authModel.$isAuth);

  if (isAuth) {
    return <Navigate to={locationState?.from || '/'} replace />;
  }

  return <ForgotPwdForm />;
}
