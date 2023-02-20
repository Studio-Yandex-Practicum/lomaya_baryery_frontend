import { useStore } from 'effector-react';
import { reportModel, ReportRow } from 'entities/participant-report';
import { ReportLabel, RowControls } from 'features/report-reviewing';
import { Loader } from 'shared/ui-kit/loader';
import { Table } from 'shared/ui-kit/table';
import styles from './styles.module.css';

export function ReportsTable({ extClassName }: { extClassName: string }) {
  const { data, isLoading } = useStore(reportModel.store.$reportsState);

  if (data.length === 0) {
    return null;
  }

  const header = [
    'Название задания',
    'Имя и фамилия',
    'Дата отправки',
    'Превью',
    '',
  ];

  const tableContent = (gridClassName: string) => {
    if (isLoading) {
      return <Loader extClassName={styles.loader} />;
    }

    return (
      <div className={[styles.rows, 'custom-scroll'].join(' ')}>
        {data.map((report) => (
          <ReportRow
            key={report.report_id}
            extClassName={styles.row}
            gridClassName={gridClassName}
            reportData={report}
            feature={
              <>
                <RowControls
                  reportId={report.report_id}
                  reportStatus={report.report_status}
                />
                <ReportLabel status={report.report_status} />
              </>
            }
          />
        ))}
      </div>
    );
  };

  return (
    <Table
      header={header}
      extClassName={extClassName}
      gridClassName={styles.columns}
      renderRows={(gridClassName) => tableContent(gridClassName)}
    />
  );
}
