import React from 'react';
import cn from 'classnames';
import { CellDate, CellLink, CellText } from '../../../ui/table';
import styles from './styles.module.css';

interface ShiftRowProps {
  routePath: string;
  gridClassName: string;
  shiftParams: {
    sequence_number: number;
    title: string;
    started_at: string;
    finished_at: string;
    total_users: number;
  };
  label: React.ReactNode;
}

export function ShiftRow({
  gridClassName,
  routePath,
  shiftParams,
  label,
}: ShiftRowProps) {
  return (
    <div className={cn(styles.row, gridClassName, 'tableContentRow')}>
      <CellText text={shiftParams.sequence_number} />
      <CellLink text={shiftParams.title} routeTo={routePath} />
      <CellDate date={shiftParams.started_at} />
      <CellDate date={shiftParams.finished_at} />
      <CellText text={shiftParams.total_users} />
      {label}
    </div>
  );
}
