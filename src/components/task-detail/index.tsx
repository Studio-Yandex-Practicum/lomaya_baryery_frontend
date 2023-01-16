import React, { useMemo } from 'react';
import cn from 'classnames';
import styles from './styles.module.css';
import { Button } from '../../ui/button';
import { CheckIcon, CloseIcon } from '../../ui/icons';
import { getFormattedDate } from '../../utils';

interface ITaskDetailsProps {
  taskUrl: string;
  photoUrl: string;
  createdAt: string;
  userName: string;
  userSurname: string;
  accept?: () => void;
  decline?: () => void;
  extClassName?: string;
}

export const TaskDetails: React.FC<ITaskDetailsProps> = ({
  taskUrl,
  photoUrl,
  createdAt,
  userName,
  userSurname,
  accept,
  decline,
  extClassName,
}) => {
  const createdDate = useMemo(() => getFormattedDate(createdAt), [createdAt]);

  const renderingUserName = useMemo(() => `${userName}\n${userSurname}`, [userName, userSurname]);

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
        <img src={taskUrl} className={styles.taskDetails__taskImage} alt="task" />
        <p
          className={cn(
            styles.taskDetails__title,
            'text text_type_main-default text_color_secondary'
          )}
        >
          Участник
        </p>
        <p className={cn(styles.taskDetails__text, 'text text_type_main-large text_color_primary')}>
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
        <p className={cn(styles.taskDetails__text, 'text text_type_main-large text_color_primary')}>
          {createdDate}
        </p>
        <Button
          htmlType="button"
          type="negative"
          extClassName={styles.taskDetails__button}
          onClick={decline}
        >
          <CloseIcon className={styles.taskDetails__declineIcon} type="link-active" />
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
      </div>
      <div className={styles.taskDetails__photoWrapper}>
        <img src={photoUrl} className={styles.taskDetails__photo} alt="user task" />
      </div>
    </section>
  );
};
