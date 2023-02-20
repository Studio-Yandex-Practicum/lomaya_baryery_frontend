import React, { useMemo } from 'react';
import cn from 'classnames';
import { ReportStatus } from 'shared/api';
import { Button } from '../../../../shared/ui-kit/button';
import { CheckIcon, CloseIcon } from '../../../../shared/ui-kit/icons';
import { getFormattedDate } from '../../../../shared/utils';
import { StatusLabel } from '../../../../shared/ui-kit/status-label';
import styles from './styles.module.css';

interface IReportDetailsProps {
  taskUrl: string;
  photoUrl: string;
  createdAt: string;
  userName: string;
  userSurname: string;
  reportStatus: ReportStatus;
  accept?: () => void;
  decline?: () => void;
  extClassName?: string;
}

export const ReportDetails: React.FC<IReportDetailsProps> = ({
  taskUrl,
  photoUrl,
  createdAt,
  userName,
  userSurname,
  reportStatus,
  accept,
  decline,
  extClassName,
}) => {
  const createdDate = useMemo(() => getFormattedDate(createdAt), [createdAt]);

  const renderingUserName = useMemo(
    () => `${userName}\n${userSurname}`,
    [userName, userSurname]
  );

  const actions = () => {
    if (reportStatus === 'approved') {
      return (
        <StatusLabel
          className={styles.statusLabel}
          icon="CircleCheckIcon"
          type="approved"
          statusText="Задание принято"
        />
      );
    }

    if (reportStatus === 'declined') {
      return (
        <StatusLabel
          className={styles.statusLabel}
          icon="CircleStopIcon"
          type="rejected"
          statusText="Задание отклонено"
        />
      );
    }

    return (
      <>
        <Button
          htmlType="button"
          type="negative"
          extClassName={styles.taskDetails__button}
          onClick={decline}
        >
          <CloseIcon
            className={styles.taskDetails__declineIcon}
            type="link-active"
          />
          Отклонить
        </Button>
        <Button
          htmlType="button"
          type="primary"
          extClassName={styles.taskDetails__button}
          onClick={accept}
        >
          <CheckIcon type="interface-white" /> Одобрить
        </Button>
      </>
    );
  };

  return (
    <section className={cn(styles.taskDetails, extClassName)}>
      <div className={styles.taskDetails__sideMenu}>
        <p
          className={cn(
            styles.taskDetails__title,
            'text text_type_main-default text_color_secondary'
          )}
        >
          Задание
        </p>
        <img
          src={taskUrl}
          className={styles.taskDetails__taskImage}
          alt="task"
        />
        <p
          className={cn(
            styles.taskDetails__title,
            'text text_type_main-default text_color_secondary'
          )}
        >
          Участник
        </p>
        <p
          className={cn(
            styles.taskDetails__text,
            'text text_type_main-large text_color_primary'
          )}
        >
          {renderingUserName}
        </p>
        <p
          className={cn(
            styles.taskDetails__title,
            'text text_type_main-default text_color_secondary'
          )}
        >
          Отправлено
        </p>
        <p
          className={cn(
            styles.taskDetails__text,
            'text text_type_main-large text_color_primary'
          )}
        >
          {createdDate}
        </p>
        {actions()}
      </div>
      <div className={styles.taskDetails__photoWrapper}>
        <img
          src={photoUrl}
          className={styles.taskDetails__photo}
          alt="user task"
        />
      </div>
    </section>
  );
};
