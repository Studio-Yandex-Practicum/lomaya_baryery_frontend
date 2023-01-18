import { Navigate, useLocation } from 'react-router-dom';
import { selectAuth } from '../../redux-store/auth';
import { useAppSelector } from '../../redux-store/hooks';

export function RequireAuth({ children }: { children: React.ReactElement }) {
  const { auth } = useAppSelector(selectAuth);
  const location = useLocation();

  return auth ? children : <Navigate to="/login" state={{ from: location.pathname }} replace />;
}
