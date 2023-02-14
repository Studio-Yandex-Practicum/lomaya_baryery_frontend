import { Navigate, useLocation } from 'react-router-dom';
import { IAppLocation } from '../../../utils';
import { SignInForm } from '../../auth';
import { useAuthStore } from '../../../services/store';

export function Login() {
  const { state: locationState }: IAppLocation = useLocation();
  const { isAuth } = useAuthStore();

  if (isAuth) {
    return <Navigate to={locationState?.from || '/'} replace />;
  }

  return <SignInForm />;
}
