import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from 'effector-react';
import { IAppLocation } from '../../../utils';
import { SignInForm } from '../../auth';
import { useAuthStore } from '../../../services/store';
import { $auth } from '../../../services/store/auth-store/auth';

export function Login() {
  const { state: locationState }: IAppLocation = useLocation();
  // const { isAuth } = useAuthStore();
  const isAuth = useStore($auth);

  if (isAuth) {
    return <Navigate to={locationState?.from || '/'} replace />;
  }

  return <SignInForm />;
}
