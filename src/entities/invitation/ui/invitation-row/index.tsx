import React from 'react';
import { CellText, RowHigh } from 'shared/ui-kit/table';

interface InvitationRowProps {
  gridClassName: string;
  extClassName?: string;
  data: {
    name: string;
    surname: string;
    email: string;
  };
  feature?: React.ReactNode;
}

export function InvitationRow({
  gridClassName,
  extClassName,
  data,
  feature,
}: InvitationRowProps) {
  return (
    <RowHigh gridClassName={gridClassName} extClassName={extClassName}>
      <CellText type="accent" text={`${data.surname} ${data.name}`} />
      <CellText text={data.email} />
      {feature}
    </RowHigh>
  );
}
