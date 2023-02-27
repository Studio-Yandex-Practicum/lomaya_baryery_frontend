import React from 'react';
import { CellText, RowHigh } from 'shared/ui-kit/table';
import { AdminLabel } from '../label';

interface AdminRowProps {
  gridClassName: string;
  extClassName?: string;
  data: {
    name: string;
    surname: string;
    email: string;
    role: 'administrator' | 'psychologist';
    status: 'active' | 'blocked';
  };
  feature?: React.ReactNode;
}

export function AdminRow({
  gridClassName,
  extClassName,
  data,
  feature,
}: AdminRowProps) {
  return (
    <RowHigh gridClassName={gridClassName} extClassName={extClassName}>
      <CellText type="accent" text={`${data.surname} ${data.name}`} />
      <CellText text={data.email} />
      <CellText
        text={data.role === 'administrator' ? 'Администратор' : 'Педагог'}
      />
      <AdminLabel adminStatus={data.status} />
      {feature}
    </RowHigh>
  );
}
