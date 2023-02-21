import { useEffect } from 'react';
import { Alert } from 'shared/ui-kit/alert';
import { ContentContainer } from 'shared/ui-kit/content-container';
import { ContentHeading } from 'shared/ui-kit/content-heading';
import { Loader } from 'shared/ui-kit/loader';
import { useStore } from 'effector-react';
import { reportModel } from 'entities/report';
import { ReportsTable } from 'widgets/reports-table';
import { mount, unmount } from './model';
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
    return (
      <Alert extClassName={styles.alert} title="Проверенных отчётов нет" />
    );
  }

  return null;
}

export function PageReportsRealized() {
  const { data, isLoading, error } = useStore(reportModel.store.$reportsState);

  useEffect(() => {
    mount();
    return () => {
      unmount();
    };
  }, []);

  return (
    <ContentContainer extClassName={styles.container}>
      <ContentHeading extClassName={styles.heading} title="Проверенные" />
      <Notice data={data} error={error} isLoading={isLoading} />
      <ReportsTable extClassName={styles.table} />
    </ContentContainer>
  );
}
