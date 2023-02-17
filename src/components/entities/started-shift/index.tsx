import { useStore } from 'effector-react';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { shiftsModel } from '../../../services/models';
import { Button } from '../../../ui/button';
import { ShiftDetailsTable } from '../../shift-details-table';
import styles from './styles.module.css';

function FeatureButton() {
  return (
    <Button
      extClassName={styles.row__editButton}
      htmlType="button"
      type="secondary"
      size="small"
      onClick={() => {
        console.log('click');
      }}
    >
      Изменить
    </Button>
  );
}

interface IStartedShiftProps {
  extClassName: string;
  FeatureComponent: React.ComponentType;
}

export function StartedShift({
  extClassName,
  FeatureComponent,
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
      featureComponent={FeatureComponent}
      participants={shift.total_users}
    />
  );
}
