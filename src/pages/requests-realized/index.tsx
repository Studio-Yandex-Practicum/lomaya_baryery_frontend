import { useEffect } from 'react';
import { Alert } from 'shared/ui-kit/alert';
import { ContentContainer } from 'shared/ui-kit/content-container';
import { ContentHeading } from 'shared/ui-kit/content-heading';
import { Loader } from 'shared/ui-kit/loader';
import { useStore } from 'effector-react';
import { requestModel } from 'entities/request';
import { RequestsTable } from 'widgets/requests-table';
import { mount, unmount } from './model';
import styles from './styles.module.css';

interface GuardProps {
  isLoading: boolean;
  data: unknown[];
  error: string | null;
}

function Guard({ data, isLoading, error }: GuardProps) {
  if (isLoading && data.length === 0) {
    return <Loader extClassName={styles.loader} />;
  }

  if (error) {
    return <Alert extClassName={styles.alert} title={error} />;
  }

  if (data.length === 0) {
    return (
      <Alert extClassName={styles.alert} title="Рассмотренных заявок нет" />
    );
  }

  return null;
}

export function PageRequestsRealized() {
  const { data, isLoading, error } = useStore(requestModel.$requestsState);

  useEffect(() => {
    mount();
    return () => {
      unmount();
    };
  }, []);

  return (
    <ContentContainer extClassName={styles.container}>
      <ContentHeading extClassName={styles.heading} title="Рассмотренные" />
      <Guard data={data} error={error} isLoading={isLoading} />
      <RequestsTable extClassName={styles.table} />
    </ContentContainer>
  );
}
