import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from 'effector-react';
import { IAppLocation } from '../../shared/utils';
import { appUserModel, ForgotPwdForm } from '../../entities/app-user';

export function ForgotPassword() {
  const { state: locationState }: IAppLocation = useLocation();
  const isAuth = useStore(appUserModel.$isAuth);

  if (isAuth) {
    return <Navigate to={locationState?.from || '/'} replace />;
  }

  return <ForgotPwdForm />;
}
