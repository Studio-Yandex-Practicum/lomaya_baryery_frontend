import React from 'react';
import { CellText, RowHigh, CellLink } from 'shared/ui-kit/table';
import { AdminLabel } from '../label';

interface AdminRowProps {
  routePath: string;
  gridClassName: string;
  extClassName?: string;
  data: {
    name: string;
    surname: string;
    email: string;
    role: 'administrator' | 'expert';
    status: 'active' | 'blocked';
  };
  feature?: React.ReactNode;
}

export function AdminRow({
  gridClassName,
  extClassName,
  data,
  feature,
  routePath,
}: AdminRowProps) {
  return (
    <RowHigh gridClassName={gridClassName} extClassName={extClassName}>
      <CellLink routeTo={routePath} text={`${data.surname} ${data.name}`} />
      <CellText text={data.email} />
      <CellText
        text={data.role === 'administrator' ? 'Администратор' : 'Эксперт'}
      />
      <AdminLabel adminStatus={data.status} />
      {feature}
    </RowHigh>
  );
}
