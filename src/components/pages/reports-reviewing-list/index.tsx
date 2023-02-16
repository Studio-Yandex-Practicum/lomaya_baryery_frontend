import { useEffect, useMemo } from 'react';
import cn from 'classnames';
import { Alert } from '../../../ui/alert';
import { Button, TButtonProps } from '../../../ui/button';
import { ContentContainer } from '../../../ui/content-container';
import { ContentHeading } from '../../../ui/content-heading';
import { RefreshIcon } from '../../../ui/icons';
import { Table } from '../../../ui/table';
import { withTooltip } from '../../../ui/tooltip';
import { Loader } from '../../../ui/loader';
import { ReportRow } from '../../report-row';
import {
  useReviewingReportsStore,
  useShiftsStoreQuery,
} from '../../../services/store';
import styles from './styles.module.css';

const ButtonWithTooltip = withTooltip<TButtonProps>(Button);

export function PageReportsReviewingList() {
  const {
    rootShifts: { started: startedShift },
  } = useShiftsStoreQuery();

  const {
    reports: data,
    isLoading,
    fetch,
    approve: approveRequest,
    decline: declineRequest,
  } = useReviewingReportsStore();

  useEffect(() => {
    if (startedShift) {
      fetch(startedShift.id);
    }
  }, [startedShift, fetch]);

  const content = useMemo(() => {
    if (startedShift === null || !data) {
      return;
    }

    if ((!data || data.length === 0) && isLoading) {
      return <Loader extClassName={styles.tasksReview__contentLoader} />;
    }

    if (data?.length === 0) {
      return (
        <Alert
          extClassName={styles.tasksReview__contentAlert}
          title="Новых отчётов нет"
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
                  approve={() => approveRequest(report.report_id)}
                  decline={() => declineRequest(report.report_id)}
                />
              ))}
            </div>
          )
        }
      />
    );
  }, [data, isLoading, startedShift, approveRequest, declineRequest]);

  if (!startedShift) {
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
    <ContentContainer extClassName={styles.tasksReview}>
      <ContentHeading
        extClassName={styles.tasksReview__heading}
        title="Ждут проверки"
      >
        <ButtonWithTooltip
          tooltipEnabled
          tooltipText="Проверить, есть ли новые отчёты"
          size="micro"
          htmlType="button"
          type="secondary"
          extClassName={styles.tasksReview__refreshButton}
          onClick={() => {
            fetch(startedShift.id);
          }}
        >
          <RefreshIcon type="link-active" />
        </ButtonWithTooltip>
      </ContentHeading>
      {content}
    </ContentContainer>
  );
}
