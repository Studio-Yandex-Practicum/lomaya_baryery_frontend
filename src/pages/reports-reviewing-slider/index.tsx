import { useStore } from 'effector-react';
import { reportModel } from 'entities/report';
import { useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { Report } from 'shared/api';
import { Alert } from 'shared/ui-kit/alert';
import { BackwardLink } from 'shared/ui-kit/backward-link';
import { ContentContainer } from 'shared/ui-kit/content-container';
import { Loader } from 'shared/ui-kit/loader';
import { deserializeSearchParams, findIndexById } from 'shared/lib';
import { ReportsSlider } from 'widgets/reports-slider';
import { load } from './model';
import styles from './styles.module.css';

interface GuardProps {
  isLoading: boolean;
  data: Report[];
  reportId?: string;
  error: string | null;
}

function Guard({ data, isLoading, error, reportId }: GuardProps) {
  if (isLoading && data.length === 0) {
    return <Loader extClassName={styles.loader} />;
  }

  if (error) {
    return <Alert extClassName={styles.alert} title={error} />;
  }

  if (data.length === 0) {
    return <Alert extClassName={styles.alert} title="Новых отчётов нет" />;
  }

  if (!reportId) {
    return <Navigate to="/not-found" />;
  }

  const reportIndex = findIndexById(data, 'report_id', reportId);
  const isReport = reportIndex !== null;

  if (!isReport) {
    if (data.length === 0) {
      return <Alert extClassName={styles.alert} title="Отчёт не найден" />;
    }
  }

  if (isReport) {
    return null;
  }

  return <Navigate to="/not-found" />;
}

export function PageReportsReviewingSlider() {
  const { data, isLoading, error } = useStore(reportModel.store.$reportsState);

  const [params] = useSearchParams();

  const { reportId } = deserializeSearchParams<{ reportId: string }>(
    params.toString()
  );

  useEffect(() => {
    if (data.length === 0) {
      load();
    }
  }, [data]);

  return (
    <>
      <ContentContainer extClassName={styles.container}>
        <BackwardLink extClassName={styles.link} to="/reports/reviewing" />
        <Guard
          data={data}
          error={error}
          isLoading={isLoading}
          reportId={reportId}
        />
        <ReportsSlider extClassName={styles.slider} reportId={reportId} />
      </ContentContainer>
    </>
  );
}
