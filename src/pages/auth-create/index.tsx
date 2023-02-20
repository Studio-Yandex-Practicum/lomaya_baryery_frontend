import { useStore } from 'effector-react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { appUserModel, PwdCreateForm } from '../../entities/app-user';
import { IAppLocation } from '../../shared/utils';

export function ResetPassword() {
  const { state: locationState }: IAppLocation = useLocation();
  const params = useParams();
  const isAuth = useStore(appUserModel.$isAuth);

  if (isAuth || !params.token) {
    return <Navigate to={locationState?.from || '/'} replace />;
  }

  return <PwdCreateForm token={params.token} />;
}
