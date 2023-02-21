import cn from 'classnames';
import { useStore } from 'effector-react';
import { ReportLabel, reportModel, ReportRow } from 'entities/report';
import { Loader } from 'shared/ui-kit/loader';
import { Table } from 'shared/ui-kit/table';
import styles from './styles.module.css';

export function DeclinedReportsTable({
  extClassName,
}: {
  extClassName: string;
}) {
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

  return (
    <Table
      header={header}
      extClassName={cn(styles.table, extClassName)}
      gridClassName={styles.columns}
      renderRows={(gridClassName) => (
        <div className={[styles.rows, 'custom-scroll'].join(' ')}>
          {data.map((report) => (
            <ReportRow
              key={report.report_id}
              extClassName={styles.row}
              gridClassName={gridClassName}
              reportData={report}
              routeTo={{
                search: `reportId=${report.report_id}`,
              }}
              feature={<ReportLabel status={report.report_status} />}
            />
          ))}
          {isLoading && <Loader extClassName={styles.loader} />}
        </div>
      )}
    />
  );
}
