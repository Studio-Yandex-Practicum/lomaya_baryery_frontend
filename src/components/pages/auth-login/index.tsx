import { Navigate, useLocation } from 'react-router-dom';
import { IAppLocation } from '../../../utils';
import { useAppSelector } from '../../../redux-store/hooks';
import { selectAuth } from '../../../redux-store/auth';
import { AuthContainer, SignInForm } from '../../auth-form';

export function Login() {
  const { state: locationState }: IAppLocation = useLocation();
  const { auth } = useAppSelector(selectAuth);

  if (auth) {
    return <Navigate to={locationState || '/'} />;
  }

  return <AuthContainer title="Вход" form={<SignInForm />} />;
}
