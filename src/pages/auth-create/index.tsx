import { useStore } from 'effector-react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { PwdCreateForm } from 'features/auth';
import { getFromProp } from 'shared/utils';
import { viewerModel } from 'entities/viewer';

export function ResetPassword() {
  const location = useLocation();
  const params = useParams();
  const isAuth = useStore(viewerModel.$isAuth);

  if (isAuth || !params.token) {
    return <Navigate to={getFromProp(location.state) || '/'} replace />;
  }

  return <PwdCreateForm />;
}
