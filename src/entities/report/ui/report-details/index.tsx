import React from 'react';
import cn from 'classnames';
import { getFormattedDate } from 'shared/utils';
import styles from './styles.module.css';

interface IReportDetailsProps {
  reportData: {
    taskUrl: string;
    photoUrl: string;
    createdAt: string;
    userName: string;
    userSurname: string;
  };
  feature?: React.ReactNode;
  extClassName?: string;
}

export const ReportDetails: React.FC<IReportDetailsProps> = ({
  reportData,
  feature,
  extClassName,
}) => {
  const { createdAt, userName, userSurname, taskUrl, photoUrl } = reportData;

  const createdDate = getFormattedDate(createdAt);

  const unitedUserName = `${userName}\n${userSurname}`;

  const titleClassName = cn(
    styles.title,
    'text text_type_main-default text_color_secondary'
  );

  const textClassName = cn(
    styles.text,
    'text text_type_main-large text_color_primary'
  );

  return (
    <section className={cn(styles.container, extClassName)}>
      <div className={styles.side}>
        <p className={titleClassName}>Задание</p>
        <img src={taskUrl} className={styles.picture} alt="task" />
        <p className={titleClassName}>Участник</p>
        <p className={textClassName}>{unitedUserName}</p>
        <p className={titleClassName}>Отправлено</p>
        <p className={textClassName}>{createdDate}</p>
        {feature}
      </div>
      <div className={styles.photoConteiner}>
        <img src={photoUrl} alt="user task" />
      </div>
    </section>
  );
};
