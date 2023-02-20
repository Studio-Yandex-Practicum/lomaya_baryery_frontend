import { useEffect } from 'react';
import { Alert } from 'shared/ui-kit/alert';
import { ContentContainer } from 'shared/ui-kit/content-container';
import { ContentHeading } from 'shared/ui-kit/content-heading';
import { Loader } from 'shared/ui-kit/loader';
import { useStore } from 'effector-react';
import { RefetchRequests, requestModel } from 'entities/request';
import { RequestsTable } from 'widgets/request-table';
import { mount, refetch, unmount } from './model';
import styles from './styles.module.css';

interface NoticeProps {
  isLoading: boolean;
  data: unknown[];
  error: string | null;
}

function Notice({ data, isLoading, error }: NoticeProps) {
  if (isLoading && data.length === 0) {
    return <Loader extClassName={styles.loader} />;
  }

  if (error) {
    return <Alert extClassName={styles.alert} title={error} />;
  }

  if (data.length === 0) {
    return <Alert extClassName={styles.alert} title="Новых заявок нет" />;
  }

  return null;
}

export function PageRequestsPending() {
  const { data, isLoading, error } = useStore(requestModel.$requestsState);

  useEffect(() => {
    mount();
    return () => {
      unmount();
    };
  }, []);

  const handleRefetch = () => {
    refetch();
  };

  return (
    <ContentContainer extClassName={styles.container}>
      <ContentHeading extClassName={styles.heading} title="Активные">
        <RefetchRequests
          extClassName={styles.refreshButton}
          getRequests={handleRefetch}
        />
      </ContentHeading>
      <Notice data={data} error={error} isLoading={isLoading} />
      <RequestsTable extClassName={styles.table} />
    </ContentContainer>
  );
}
