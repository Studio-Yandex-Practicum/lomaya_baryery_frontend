import { useCallback, useMemo } from 'react';
import cn from 'classnames';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useMatch, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../redux-store/hooks';
import { selectRootShifts } from '../../../redux-store/root-shifts';
import { Alert } from '../../../ui/alert';
import { Loader } from '../../../ui/loader';
import { Table } from '../../../ui/table';
import { ReportRow } from '../../report-row';
import { ContentContainer } from '../../../ui/content-container';
import { ContentHeading } from '../../../ui/content-heading';
import { useGetReportsRealizedQuery } from '../../../redux-store/api';
import styles from './styles.module.css';
import { ImagePopup } from '../../../ui/image-popup';

export function PageReportsRealized() {
  const { started: startedShift } = useAppSelector(selectRootShifts);

  const { data, isLoading, isFetching } = useGetReportsRealizedQuery(
    startedShift?.id ?? skipToken,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const navigate = useNavigate();
  const idByParams = useMatch('/reports/realized/:id')?.params.id;

  const photoUrl = useMemo(() => {
    if (data && data.length > 0 && idByParams) {
      const report = data.find((report) => report.report_id === idByParams);
      if (report) return report.photo_url;
    }
  }, [idByParams, data]);

  const content = useMemo(() => {
    if (startedShift === null || !data) {
      return;
    }

    if ((!data || data.length === 0) && (isLoading || isFetching)) {
      return <Loader extClassName={styles.tasksReview__contentLoader} />;
    }

    if (data?.length === 0) {
      return (
        <Alert extClassName={styles.tasksReview__contentAlert} title="Проверенных отчётов нет" />
      );
    }

    return (
      <Table
        header={['Название задания', 'Имя и фамилия', 'Дата отправки', 'Превью', '']}
        extClassName={styles.tasksReview__table}
        gridClassName={styles.tasksReview__tableColumns}
        renderRows={(rowStyles) =>
          isLoading || isFetching ? (
            <Loader extClassName={styles.tasksReview__tableLoader} />
          ) : (
            <div className={cn(styles.tasksReview__tableRows, 'custom-scroll')}>
              {data.map((report) => (
                <ReportRow key={report.report_id} extClassName={rowStyles} reportData={report} />
              ))}
            </div>
          )
        }
      />
    );
  }, [data, isLoading, isFetching, startedShift]);

  const handleCloseModal = useCallback(() => navigate(-1), [navigate]);

  if (startedShift === null) {
    return (
      <ContentContainer extClassName={styles.tasksReview__alert}>
        <Alert
          extClassName={styles.tasksReview__tableAlert}
          title="Отчёты не принимаются, пока нет текущей смены"
        />
      </ContentContainer>
    );
  }

  return (
    <>
      <ContentContainer extClassName={styles.tasksReview}>
        <ContentHeading extClassName={styles.tasksReview__heading} title="Проверенные" />
        {content}
      </ContentContainer>

      <ImagePopup opened={Boolean(photoUrl)} imgSrc={photoUrl} onClose={handleCloseModal} />
    </>
  );
}
