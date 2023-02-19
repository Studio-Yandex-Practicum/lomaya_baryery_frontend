import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from 'effector-react';
import { IAppLocation } from '../../shared/utils';
import { SignInForm } from '../../auth';
import { useAuthStore } from '../../../deprecated-services/deprecated-store';
import { $auth } from '../../../deprecated-services/deprecated-store/auth-store/auth';

export function Login() {
  const { state: locationState }: IAppLocation = useLocation();
  // const { isAuth } = useAuthStore();
  const isAuth = useStore($auth);

  if (isAuth) {
    return <Navigate to={locationState?.from || '/'} replace />;
  }

  return <SignInForm />;
}
