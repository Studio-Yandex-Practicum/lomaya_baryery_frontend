import { useStore } from 'effector-react';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { shiftsModel } from '../../../services/models';
import { ShiftDetailsTable } from '../../shift-details-table';

interface IStartedShiftProps {
  extClassName?: string;
  featureComponent?: React.ReactNode;
}

export function StartedShift({
  extClassName,
  featureComponent,
}: IStartedShiftProps) {
  const { started: shift } = useStore(shiftsModel.store.$shifts);

  if (!shift) {
    return <Navigate to="/shifts/all" replace />;
  }

  return (
    <ShiftDetailsTable
      extClassName={extClassName}
      title={shift.title}
      start={shift.started_at}
      finish={shift.finished_at}
      featureComponent={featureComponent}
      participants={shift.total_users}
    />
  );
}
