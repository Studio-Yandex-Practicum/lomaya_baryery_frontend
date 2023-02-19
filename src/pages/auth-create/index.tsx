import { Navigate, useLocation, useParams } from 'react-router-dom';
import { IAppLocation } from '../../shared/utils';
import { PwdCreateForm } from '../../auth';
import { useAuthStore } from '../../../deprecated-services/deprecated-store';

export function ResetPassword() {
  const { state: locationState }: IAppLocation = useLocation();
  const params = useParams();
  const { isAuth } = useAuthStore();

  if (isAuth || !params.token) {
    return <Navigate to={locationState?.from || '/'} replace />;
  }

  return <PwdCreateForm token={params.token} />;
}
