import { useMemo } from 'react';
import cn from 'classnames';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { selectRootShifts } from '../../../redux-store/root-shifts';
import { useAppSelector } from '../../../redux-store/hooks';
import { Alert } from '../../../ui/alert';
import { Button, TButtonProps } from '../../../ui/button';
import { ContentContainer } from '../../../ui/content-container';
import { ContentHeading } from '../../../ui/content-heading';
import { RefreshIcon } from '../../../ui/icons';
import { Table } from '../../../ui/table';
import { withTooltip } from '../../../ui/tooltip';
import { Loader } from '../../../ui/loader';
import {
  useApproveReportMutation,
  useDeclineReportMutation,
  useGetReportsReviewingQuery,
} from '../../../redux-store/api';
import { ReportRow } from '../../report-row';
import styles from './styles.module.css';

const ButtonWithTooltip = withTooltip<TButtonProps>(Button);

export function PageReportsReviewingList() {
  const { started: startedShift } = useAppSelector(selectRootShifts);

  const { data, isLoading, isFetching, refetch } = useGetReportsReviewingQuery(
    startedShift?.id ?? skipToken,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [approveRequest] = useApproveReportMutation();
  const [declineRequest] = useDeclineReportMutation();

  const content = useMemo(() => {
    if (startedShift === null || !data) {
      return;
    }

    if ((!data || data.length === 0) && (isLoading || isFetching)) {
      return <Loader extClassName={styles.tasksReview__contentLoader} />;
    }

    if (data?.length === 0) {
      return <Alert extClassName={styles.tasksReview__contentAlert} title="Новых отчётов нет" />;
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
                <ReportRow
                  key={report.report_id}
                  extClassName={rowStyles}
                  reportData={report}
                  approve={() =>
                    approveRequest({
                      reportId: report.report_id,
                      shiftId: startedShift.id,
                      patch: { report_status: 'approved' },
                    })
                  }
                  decline={() =>
                    declineRequest({
                      reportId: report.report_id,
                      shiftId: startedShift.id,
                      patch: { report_status: 'declined' },
                    })
                  }
                />
              ))}
            </div>
          )
        }
      />
    );
  }, [data, isLoading, isFetching, startedShift, approveRequest, declineRequest]);

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
    <ContentContainer extClassName={styles.tasksReview}>
      <ContentHeading extClassName={styles.tasksReview__heading} title="Ждут проверки">
        <ButtonWithTooltip
          tooltipEnabled
          tooltipText="Проверить, есть ли новые отчёты"
          size="micro"
          htmlType="button"
          type="secondary"
          extClassName={styles.tasksReview__refreshButton}
          onClick={refetch}
        >
          <RefreshIcon type="link-active" />
        </ButtonWithTooltip>
      </ContentHeading>
      {content}
    </ContentContainer>
  );
}
