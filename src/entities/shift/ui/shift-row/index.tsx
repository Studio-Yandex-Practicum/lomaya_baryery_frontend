import React from 'react';
import { CellDate, CellLink, CellText, RowLow } from 'shared/ui-kit/table';
import { Button } from 'shared/ui-kit/button';
import { api } from 'shared/api';
import styles from './styles.module.css';

interface ShiftRowProps {
  routePath: string;
  label: React.ReactNode;
  gridClassName: string;
  shiftParams?: {
    id: string;
    sequence_number: number;
    title: string;
    started_at: string;
    finished_at: string;
    total_users: number;
  } | null;
}

export function ShiftRow({
  routePath,
  label,
  gridClassName,
  shiftParams,
}: ShiftRowProps) {
  if (shiftParams === null || !shiftParams) {
    return null;
  }

  const handleDownloadFile = () =>
    // eslint-disable-next-line no-void
    void api.downloadReportByShiftId(shiftParams.id, shiftParams.title);

  return (
    <RowLow extClassName={styles.row} gridClassName={gridClassName}>
      <CellText text={shiftParams.sequence_number} />
      <CellLink text={shiftParams.title} routeTo={routePath} />
      <CellDate date={shiftParams.started_at} />
      <CellDate date={shiftParams.finished_at} />
      <CellText text={shiftParams.total_users} />
      {label}
      <Button
        extClassName={styles.report}
        htmlType="button"
        type="secondary"
        size="small"
        onClick={handleDownloadFile}
      >
        Отчет
      </Button>
    </RowLow>
  );
}
