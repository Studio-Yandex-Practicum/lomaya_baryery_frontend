import React, { useMemo } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { ITask } from '../../redux-store/api/models';
import { StatusLabel } from '../../ui/status-label';
import { Button } from '../../ui/button';
import { CellDate, CellLink, CellText } from '../../ui/table-native';
import { ZoomIcon } from '../../ui/icons';
import styles from './styles.module.css';

interface ICellPreviewProps {
  id: string;
  img: string;
}

const CellPreview: React.FC<ICellPreviewProps> = ({ id, img }) => (
  <Link to={`${id}`} className={styles.cellPreview}>
    <img src={img} className={styles.cellPreview__image} alt="user task" />
    <ZoomIcon type="interface-white" className={styles.cellPreview__icon} />
  </Link>
);

interface ITaskRowProps {
  extClassName?: string;
  taskData: ITask;
  approve: () => void;
  decline: () => void;
}

export const TaskRow: React.FC<ITaskRowProps> = ({ taskData, approve, decline, extClassName }) => {
  const actions = useMemo(() => {
    if (taskData.task_status) {
      if (taskData.task_status === 'approved') {
        return <StatusLabel icon="CircleCheckIcon" type="approved" statusText="Задание принято" />;
      }

      if (taskData.task_status === 'declined') {
        return <StatusLabel icon="CircleStopIcon" type="rejected" statusText="Задание отклонено" />;
      }
    }

    return (
      <div className={styles.taskRow__actions}>
        <Button
          size="small"
          type="primary"
          htmlType="button"
          onClick={approve}
          extClassName={styles.taskRow__approveButton}
        >
          Принять
        </Button>
        <Button size="small" type="primary" htmlType="button" onClick={decline}>
          Отклонить
        </Button>
      </div>
    );
  }, [taskData]);

  return (
    <div className={cn(styles.taskRow, extClassName, 'tableContentRow')}>
      <CellLink routeTo={taskData.report_id} text={taskData.task_description} />
      <CellText type="accent" text={`${taskData.user_name} ${taskData.user_surname}`} />
      <CellDate type="withTime" date={taskData.report_created_at} />
      <CellPreview img={taskData.photo_url} id={taskData.report_id} />
      {actions}
    </div>
  );
};
