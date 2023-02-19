import React, { useMemo } from 'react';
import cn from 'classnames';
import { CellDate, CellText } from '../../../../shared/ui-kit/table';
import { Button } from '../../../../shared/ui-kit/button';
import { StatusLabel } from '../../../../shared/ui-kit/status-label';
import styles from './styles.module.css';

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
    switch (requestData.request_status) {
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
            <Button
              size="small"
              type="primary"
              htmlType="button"
              onClick={decline}
            >
              Отклонить
            </Button>
          </div>
        );
      case 'approved':
        return (
          <StatusLabel
            icon="CircleCheckIcon"
            type="approved"
            statusText="Участник одобрен"
          />
        );
      case 'declined':
        return (
          <StatusLabel
            icon="CircleStopIcon"
            type="rejected"
            statusText="Участник отклонён"
          />
        );
      default:
        return null;
    }
  }, [requestData]); // eslint-disable-line

  return (
    <div className={cn(styles.requestRow, extClassName, 'tableContentRow')}>
      <CellText
        type="accent"
        text={`${requestData.name} ${requestData.surname}`}
      />
      <CellText text={requestData.city} />
      <CellText text={requestData.phone_number} />
      <CellDate date={requestData.date_of_birth} />
      {actions}
    </div>
  );
};
