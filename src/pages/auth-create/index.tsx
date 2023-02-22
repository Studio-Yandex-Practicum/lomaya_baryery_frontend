import { useStore } from 'effector-react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { authModel, PwdCreateForm } from 'processes/auth';
import { getFromProp } from 'shared/utils';

export function ResetPassword() {
  const location = useLocation();
  const params = useParams();
  const isAuth = useStore(authModel.$isAuth);

  if (isAuth || !params.token) {
    return <Navigate to={getFromProp(location.state) || '/'} replace />;
  }

  return <PwdCreateForm />;
}
