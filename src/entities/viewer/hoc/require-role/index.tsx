import { useStore } from 'effector-react';
import { Navigate, useLocation } from 'react-router-dom';
import { viewerModel } from 'entities/viewer';
import { UserRole } from 'shared/api';

interface RequireRoleProps {
  viewerRole: UserRole;
  children: React.ReactElement;
}

export function RequireRole({ viewerRole, children }: RequireRoleProps) {
  const viewer = useStore(viewerModel.$viewer);

  const location = useLocation();

  if (!viewer) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (viewer.role !== viewerRole) {
    return <Navigate to="/" state={{ from: location.pathname }} replace />;
  }

  return children;
}
