import { Navigate, useLocation } from 'react-router-dom';
import { IAppLocation } from '../../../utils';
import { useAppSelector } from '../../../redux-store/hooks';
import { selectAuth } from '../../../redux-store/auth';
import { SignInForm } from '../../auth';

export function Login() {
  const { state: locationState }: IAppLocation = useLocation();
  const { auth } = useAppSelector(selectAuth);

  if (auth) {
    return <Navigate to={locationState?.from || '/'} replace />;
  }

  return <SignInForm />;
}
