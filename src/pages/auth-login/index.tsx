import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from 'effector-react';
import { IAppLocation } from '../../shared/utils';
import { appUserModel, SignInForm } from '../../entities/app-user';

export function Login() {
  const { state: locationState }: IAppLocation = useLocation();
  const isAuth = useStore(appUserModel.$isAuth);

  if (isAuth) {
    return <Navigate to={locationState?.from || '/'} replace />;
  }

  return <SignInForm />;
}
