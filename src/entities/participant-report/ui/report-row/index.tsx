import React from 'react';
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
  feature: React.ReactNode;
  extClassName?: string;
}

export function ReportRow({
  gridClassName,
  reportData,
  feature,
  extClassName,
}: ReportRowProps) {
  return (
    <RowHigh gridClassName={gridClassName} extClassName={extClassName}>
      <CellLink
        routeTo={reportData.report_id}
        text={reportData.task_description}
      />
      <CellText
        type="accent"
        text={`${reportData.user_name} ${reportData.user_surname}`}
      />
      <CellDate type="default" date={reportData.report_created_at} />
      <CellThumbnail img={reportData.photo_url} id={reportData.report_id} />
      {feature}
    </RowHigh>
  );
}
