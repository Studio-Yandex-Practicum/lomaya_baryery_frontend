import React from 'react';
import cn from 'classnames';
import { getFormattedDate } from 'shared/lib';
import styles from './styles.module.css';

interface ReportDetailsProps {
  data: {
    task_url: string;
    photo_url: string;
    report_created_at: string;
    user_name: string;
    user_surname: string;
  };
  feature?: React.ReactNode;
  extClassName?: string;
}

export function ReportDetails({
  data,
  feature,
  extClassName,
}: ReportDetailsProps) {
  const createdDate = getFormattedDate(data.report_created_at);

  const unitedUserName = `${data.user_name}\n${data.user_surname}`;

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
        <img src={data.task_url} className={styles.picture} alt="task" />
        <p className={titleClassName}>Участник</p>
        <p className={textClassName}>{unitedUserName}</p>
        <p className={titleClassName}>Отправлено</p>
        <p className={textClassName}>{createdDate}</p>
        {feature}
      </div>
      <div className={styles.photoContainer}>
        <img src={data.photo_url} alt="user task" />
      </div>
    </section>
  );
}
