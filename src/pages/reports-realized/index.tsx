import { useEffect } from 'react';
import { Alert } from 'shared/ui-kit/alert';
import { ContentContainer } from 'shared/ui-kit/content-container';
import { ContentHeading } from 'shared/ui-kit/content-heading';
import { Loader } from 'shared/ui-kit/loader';
import { useStore } from 'effector-react';
import { reportModel } from 'entities/report';
import { RealizedReportsTable } from 'widgets/reports-table';
import { mount } from './model';
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
      <Alert extClassName={styles.alert} title="Проверенных отчётов нет" />
    );
  }

  return null;
}

export function PageReportsRealized() {
  const { data, isLoading, error } = useStore(reportModel.store.$reportsState);

  useEffect(() => {
    mount();
  }, []);

  return (
    <ContentContainer extClassName={styles.container}>
      <ContentHeading extClassName={styles.heading} title="Проверенные" />
      <Guard data={data} error={error} isLoading={isLoading} />
      <RealizedReportsTable extClassName={styles.table} />
    </ContentContainer>
  );
}
