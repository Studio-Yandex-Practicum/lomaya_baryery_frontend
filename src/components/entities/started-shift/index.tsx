import { useStore } from 'effector-react';
import React from 'react';
import { Navigate } from 'react-router-dom';
import * as startedShiftModel from './model';
import { ShiftDetailsTable } from '../../shift-details-table';

interface IStartedShiftProps {
  extClassName?: string;
  featureComponent?: React.ReactNode;
}

export function StartedShift({
  extClassName,
  featureComponent,
}: IStartedShiftProps) {
  const shift = useStore(startedShiftModel.store.startedShiftStore);

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
