import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from 'effector-react';
import { SignInForm } from 'features/auth';
import { getFromProp } from 'shared/lib';
import { viewerModel } from 'entities/viewer';

export function Login() {
  const location = useLocation();
  const isAuth = useStore(viewerModel.$isAuth);

  if (isAuth) {
    return <Navigate to={getFromProp(location.state) || '/'} replace />;
  }

  return <SignInForm />;
}
