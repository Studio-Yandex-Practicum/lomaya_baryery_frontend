import { useEffect } from 'react';
import { Alert } from 'shared/ui-kit/alert';
import { ContentContainer } from 'shared/ui-kit/content-container';
import { ContentHeading } from 'shared/ui-kit/content-heading';
import { Loader } from 'shared/ui-kit/loader';
import { useStore } from 'effector-react';
import { RefetchReports, reportModel } from 'entities/report';
import { ReviewingReportsTable } from 'widgets/reports-table';
import { mount, refetch } from './model';
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
    return <Alert extClassName={styles.alert} title="Новых отчётов нет" />;
  }

  return null;
}

export function PageReportsReviewing() {
  const { data, isLoading, error } = useStore(reportModel.store.$reportsState);

  useEffect(() => {
    mount();
  }, []);

  const handleRefetch = () => {
    refetch();
  };

  return (
    <ContentContainer extClassName={styles.container}>
      <ContentHeading extClassName={styles.heading} title="Ждут проверки">
        <RefetchReports
          extClassName={styles.refreshButton}
          getReports={handleRefetch}
        />
      </ContentHeading>
      <Guard data={data} error={error} isLoading={isLoading} />
      <ReviewingReportsTable extClassName={styles.table} />
    </ContentContainer>
  );
}
