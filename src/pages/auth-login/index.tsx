import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from 'effector-react';
import { authModel, SignInForm } from 'processes/auth';
import { getFromProp } from 'shared/utils';

export function Login() {
  const location = useLocation();
  const isAuth = useStore(authModel.$isAuth);

  if (isAuth) {
    return <Navigate to={getFromProp(location.state) || '/'} replace />;
  }

  return <SignInForm />;
}
