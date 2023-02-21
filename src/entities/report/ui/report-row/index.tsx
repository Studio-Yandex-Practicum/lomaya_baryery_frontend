import React from 'react';
import { To } from 'react-router-dom';
import {
  CellDate,
  CellLink,
  CellText,
  CellThumbnail,
  RowHigh,
} from 'shared/ui-kit/table';

interface ReportRowProps {
  reportData: {
    task_description: string;
    user_name: string;
    user_surname: string;
    report_created_at: string;
    photo_url: string;
    report_id: string;
  };
  gridClassName: string;
  routeTo: To;
  feature?: React.ReactNode;
  extClassName?: string;
}

export function ReportRow({
  gridClassName,
  reportData,
  routeTo,
  feature,
  extClassName,
}: ReportRowProps) {
  return (
    <RowHigh gridClassName={gridClassName} extClassName={extClassName}>
      <CellLink routeTo={routeTo} text={reportData.task_description} />
      <CellText
        type="accent"
        text={`${reportData.user_name} ${reportData.user_surname}`}
      />
      <CellDate type="default" date={reportData.report_created_at} />
      <CellThumbnail img={reportData.photo_url} routeTo={routeTo} />
      {feature}
    </RowHigh>
  );
}
