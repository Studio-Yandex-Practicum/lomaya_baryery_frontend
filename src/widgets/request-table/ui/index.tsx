import { useStore } from 'effector-react';
import { requestModel, RequestRow } from 'entities/request';
import { RequestLabel, RowControls } from 'features/request-reviewing';
import { Loader } from 'shared/ui-kit/loader';
import { Table } from 'shared/ui-kit/table';
import styles from './styles.module.css';

export function RequestsTable({ extClassName }: { extClassName: string }) {
  const { data, isLoading } = useStore(requestModel.$requestsState);

  if (data.length === 0) {
    return null;
  }

  const header = ['Имя и фамилия', 'Город', 'Телефон', 'Дата рождения', ''];

  const tableContent = (gridClassName: string) => {
    if (isLoading) {
      return <Loader extClassName={styles.loader} />;
    }

    return (
      <div className={[styles.rows, 'custom-scroll'].join(' ')}>
        {data.map((request) => (
          <RequestRow
            extClassName={styles.row}
            gridClassName={gridClassName}
            requestData={request}
            feature={
              <>
                <RowControls
                  requestId={request.request_id}
                  requestStatus={request.request_status}
                />
                <RequestLabel status={request.request_status} />
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
