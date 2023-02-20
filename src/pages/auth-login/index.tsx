import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from 'effector-react';
import { IAppLocation } from '../../shared/utils';
import { authModel, SignInForm } from '../../processes/auth';

export function Login() {
  const { state: locationState }: IAppLocation = useLocation();
  const isAuth = useStore(authModel.$isAuth);

  if (isAuth) {
    return <Navigate to={locationState?.from || '/'} replace />;
  }

  return <SignInForm />;
}
