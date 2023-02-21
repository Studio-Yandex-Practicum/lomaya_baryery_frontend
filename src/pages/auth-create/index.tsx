import { useStore } from 'effector-react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { authModel, PwdCreateForm } from 'processes/auth';

export function ResetPassword() {
  const { state: locationState } = useLocation();
  const params = useParams();
  const isAuth = useStore(authModel.$isAuth);

  if (isAuth || !params.token) {
    return <Navigate to={locationState?.from || '/'} replace />;
  }

  return <PwdCreateForm token={params.token} />;
}
