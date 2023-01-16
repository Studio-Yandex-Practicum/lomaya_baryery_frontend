import React, { useMemo } from 'react';
import cn from 'classnames';
import styles from './styles.module.css';
import { CellDate, CellText } from '../../ui/table-native';
import { IRequest } from '../../redux-store/api/models';
import { Button } from '../../ui/button';
import { StatusLabel } from '../../ui/status-label';

interface IRequestRowProps {
  extClassName?: string;
  requestData: IRequest;
  approve?: () => void;
  decline?: () => void;
}

export const RequestRow: React.FC<IRequestRowProps> = ({
  requestData,
  approve,
  decline,
  extClassName,
}) => {
  const actions = useMemo(() => {
    switch (requestData.status) {
      case 'pending':
        return (
          <div className={styles.requestRow__actions}>
            <Button
              size="small"
              type="primary"
              htmlType="button"
              onClick={approve}
              extClassName={styles.requestRow__approveButton}
            >
              Принять
            </Button>
            <Button size="small" type="primary" htmlType="button" onClick={decline}>
              Отклонить
            </Button>
          </div>
        );
      case 'approved':
        return <StatusLabel icon="CircleCheckIcon" type="approved" statusText="Участник одобрен" />;
      case 'declined':
        return <StatusLabel icon="CircleStopIcon" type="rejected" statusText="Участник отклонён" />;
      default:
        return null;
    }
  }, [requestData]);

  return (
    <div className={cn(styles.requestRow, extClassName, 'tableContentRow')}>
      <CellText type="accent" text={`${requestData.name} ${requestData.surname}`} />
      <CellText text={requestData.city} />
      <CellText text={requestData.phone_number} />
      <CellDate date={requestData.date_of_birth} />
      {actions}
    </div>
  );
};
