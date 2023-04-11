import React from 'react';
import { CellLink, CellText, RowLow } from 'shared/ui-kit/table';
import styles from './styles.module.css';

interface MemberRowProps {
  routePath: string;
  label: React.ReactNode;
  gridClassName: string;
  shifts_number: number;
  memberParams?: {
    name: string;
    surname: string;
    city: string;
    phone_number: string;
    status: string;
  } | null;
}

export function MemberRow({
  routePath,
  memberParams,
  gridClassName,
  label,
}: MemberRowProps) {
  if (memberParams === null || !memberParams) {
    return null;
  }

  return (
    <RowLow extClassName={styles.row} gridClassName={gridClassName}>
      <CellLink
        text={`${memberParams.name} ${memberParams.surname}`}
        routeTo={routePath}
      />
      <CellText text={memberParams.city} />
      <CellText text={memberParams.phone_number} />
      <CellText text={memberParams.shifts_number} />
      {label}
    </RowLow>
  );
}
