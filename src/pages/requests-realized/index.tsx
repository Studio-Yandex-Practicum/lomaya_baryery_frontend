import { useEffect, useMemo } from 'react';
import cn from 'classnames';
import { ContentContainer } from '../../shared/ui-kit/content-container';
import { ContentHeading } from '../../shared/ui-kit/content-heading';
import { Table } from '../../shared/ui-kit/table';
import { RequestRow } from '../../entities/request/ui/request-row';
import { Loader } from '../../shared/ui-kit/loader';
import { Alert } from '../../shared/ui-kit/alert';
import {
  useRealizedRequestsStore,
  useRecruitmentState,
} from '../../../deprecated-services/deprecated-store';
import styles from './styles.module.css';

export const PageRequestsRealized = () => {
  const { id: shiftId } = useRecruitmentState();

  const { requests: data, isLoading, fetch } = useRealizedRequestsStore();

  useEffect(() => {
    if (shiftId) {
      fetch(shiftId);
    }
  }, [shiftId, fetch]);

  const content = useMemo(() => {
    if (isLoading) {
      return <Loader extClassName={styles.requests__contentLoader} />;
    }

    if (!data) {
      return null;
    }

    if (data.length === 0) {
      return (
        <Alert
          extClassName={styles.requests__contentAlert}
          title="Рассмотренных заявок нет"
        />
      );
    }

    return (
      <Table
        header={[
          'Имя и фамилия',
          'Город',
          'Телефон',
          'Дата рождения',
          'Статус',
        ]}
        extClassName={styles.requests__table}
        gridClassName={styles.requests__tableColumns}
        renderRows={(rowStyles) =>
          isLoading ? (
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
  }, [data, isLoading]);

  if (shiftId === null) {
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
      <ContentHeading
        extClassName={styles.requests__heading}
        title="Рассмотренные"
      />
      {content}
    </ContentContainer>
  );
};
