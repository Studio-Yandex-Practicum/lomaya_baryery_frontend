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
import styles from './styles.module.css';

export const PageRequestsConsidered = () => {
  const { preparing } = useAppSelector(selectRootShifts);

  const { data, isLoading, isFetching } = useGetConsideredRequestsQuery(
    preparing?.id ?? skipToken,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const content = useMemo(() => {
    if (!data) {
      return null;
    }

    if ((!data || data.length === 0) && (isLoading || isFetching)) {
      return <Loader extClassName={styles.requests__contentLoader} />;
    }

    if (data?.length === 0) {
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

  if (!preparing) {
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
