import { useMemo } from 'react';
import cn from 'classnames';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { ContentContainer } from '../../../ui/content-container';
import { ContentHeading } from '../../../ui/content-heading';
import { Table } from '../../../ui/table-native';
import { useGetConsideredRequestsQuery } from '../../../redux-store/api';
import { useAppSelector } from '../../../redux-store/hooks';
import { selectRootShifts } from '../../../redux-store/root-shifts';
import { RequestRow } from '../../request-row';
import { Loader } from '../../../ui/loader';
import { Alert } from '../../../ui/alert';
import { getTodayDate, getUsersRequestsDeadline } from '../../../utils/common-helpers';
import styles from './styles.module.css';

export const PageRequestsConsidered = () => {
  const { preparing: preparingShift, started: startedShift } = useAppSelector(selectRootShifts);

  const today = getTodayDate();
  const usersRequestsDeadline = getUsersRequestsDeadline(startedShift?.started_at);

  function getNecessaryShiftId() {
    if (usersRequestsDeadline && startedShift) {
      return today <= usersRequestsDeadline ? startedShift.id : preparingShift?.id;
    }
  }

  const { data, isLoading, isFetching } = useGetConsideredRequestsQuery(
    getNecessaryShiftId() ?? skipToken,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const content = useMemo(() => {
    if (isLoading || isFetching) {
      return <Loader extClassName={styles.requests__contentLoader} />;
    }

    if (!data) {
      return null;
    }

    if (data.length === 0) {
      return (
        <Alert extClassName={styles.requests__contentAlert} title="Рассмотренных заявок нет" />
      );
    }

    return (
      <Table
        header={['Имя и фамилия', 'Город', 'Телефон', 'Дата рождения', 'Статус']}
        extClassName={styles.requests__table}
        gridClassName={styles.requests__tableColumns}
        renderRows={(rowStyles) =>
          isLoading || isFetching ? (
            <Loader extClassName={styles.requests__tableLoader} />
          ) : (
            <div className={cn(styles.requests__tableRows, 'custom-scroll')}>
              {data.map((request) => (
                <RequestRow
                  key={request.request_id}
                  extClassName={rowStyles}
                  requestData={request}
                />
              ))}
            </div>
          )
        }
      />
    );
  }, [data, isLoading, isFetching]);

  if ((usersRequestsDeadline === null || today > usersRequestsDeadline) && !preparingShift) {
    return (
      <ContentContainer extClassName={styles.requests__alert}>
        <Alert
          extClassName={styles.requests__tableAlert}
          title="Заявки не принимаются, пока нет новой смены"
        />
      </ContentContainer>
    );
  }

  return (
    <ContentContainer extClassName={styles.requests}>
      <ContentHeading extClassName={styles.requests__heading} title="Заявки на участие" />
      {content}
    </ContentContainer>
  );
};
