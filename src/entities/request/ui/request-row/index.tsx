import React from 'react';
import { CellDate, CellText } from 'shared/ui-kit/table';
import { RowLow } from 'shared/ui-kit/table';

interface RequestRowProps {
  gridClassName: string;
  requestData: {
    name: string;
    surname: string;
    city: string;
    phone_number: string;
    date_of_birth: string;
  };
  extClassName?: string;
  feature?: React.ReactNode;
}

export function RequestRow({
  requestData,
  gridClassName,
  extClassName,
  feature = null,
}: RequestRowProps) {
  return (
    <RowLow extClassName={extClassName} gridClassName={gridClassName}>
      <CellText
        type="accent"
        text={`${requestData.name} ${requestData.surname}`}
      />
      <CellText text={requestData.city} />
      <CellText text={requestData.phone_number} />
      <CellDate date={requestData.date_of_birth} />
      {feature}
    </RowLow>
  );
}
