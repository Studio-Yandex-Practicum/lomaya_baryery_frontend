import { useCallback, useEffect, useMemo } from 'react';
import cn from 'classnames';
import { useMatch, useNavigate } from 'react-router-dom';
import { Alert } from '../../shared/ui-kit/alert';
import { Loader } from '../../shared/ui-kit/loader';
import { Table } from '../../shared/ui-kit/table';
import { ReportRow } from '../../report-row';
import { ContentContainer } from '../../shared/ui-kit/content-container';
import { ContentHeading } from '../../shared/ui-kit/content-heading';
import { ImagePopup } from '../../shared/ui-kit/image-popup';
import styles from './styles.module.css';
import {
  useRealizedReportsStore,
  useShiftsStoreQuery,
} from '../../../deprecated-services/deprecated-store';

export function PageReportsRealized() {
  const {
    rootShifts: { started: startedShift },
  } = useShiftsStoreQuery();

  const {
    reports: data,
    isLoading,
    isSuccess,
    fetch,
  } = useRealizedReportsStore();

  useEffect(() => {
    if (startedShift) {
      fetch(startedShift.id);
    }
  }, [startedShift, fetch]);

  const navigate = useNavigate();
  const idByParams = useMatch('/reports/realized/:id')?.params.id;

  const photoUrl = useMemo(() => {
    if (data.length > 0 && idByParams) {
      const report = data.find((report) => report.report_id === idByParams);
      if (report) return report.photo_url;
    }
  }, [idByParams, data]);

  const content = useMemo(() => {
    if (startedShift === null || !data) {
      return;
    }

    if (data.length === 0 && isLoading) {
      return <Loader extClassName={styles.tasksReview__contentLoader} />;
    }

    if (data.length === 0 && isSuccess) {
      return (
        <Alert
          extClassName={styles.tasksReview__contentAlert}
          title="Проверенных отчётов нет"
        />
      );
    }

    return (
      <Table
        header={[
          'Название задания',
          'Имя и фамилия',
          'Дата отправки',
          'Превью',
          '',
        ]}
        extClassName={styles.tasksReview__table}
        gridClassName={styles.tasksReview__tableColumns}
        renderRows={(rowStyles) =>
          isLoading ? (
            <Loader extClassName={styles.tasksReview__tableLoader} />
          ) : (
            <div className={cn(styles.tasksReview__tableRows, 'custom-scroll')}>
              {data.map((report) => (
                <ReportRow
                  key={report.report_id}
                  extClassName={rowStyles}
                  reportData={report}
                />
              ))}
            </div>
          )
        }
      />
    );
  }, [data, isLoading, isSuccess, startedShift]);

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
        <ContentHeading
          extClassName={styles.tasksReview__heading}
          title="Проверенные"
        />
        {content}
      </ContentContainer>

      <ImagePopup
        opened={Boolean(photoUrl)}
        imgSrc={photoUrl}
        onClose={handleCloseModal}
      />
    </>
  );
}
