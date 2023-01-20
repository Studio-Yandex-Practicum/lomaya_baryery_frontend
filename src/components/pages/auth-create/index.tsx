import { Navigate, useLocation, useParams } from 'react-router-dom';
import { IAppLocation } from '../../../utils';
import { useAppSelector } from '../../../redux-store/hooks';
import { selectAuth } from '../../../redux-store/auth';
import { PwdCreateForm } from '../../auth';

export function ResetPassword() {
  const { state: locationState }: IAppLocation = useLocation();
  const params = useParams();
  const { auth } = useAppSelector(selectAuth);

  if (auth || !params.token) {
    return <Navigate to={locationState?.from || '/'} replace />;
  }

  return <PwdCreateForm token={params.token} />;
}
