import React, { useMemo } from 'react';
import cn from 'classnames';
import { nanoid } from '@reduxjs/toolkit';
import { IUserTask } from '../../redux-store/api/models';
import { withTooltip } from '../tooltip';
import { CircleCheckIcon, CircleStopIcon, CircleWarningIcon } from '../icons';
import styles from './styles.module.css';

interface IStatusCellProps {
  status: IUserTask['status'];
}

const StatusCell: React.FC<IStatusCellProps> = ({ status, ...props }) => {
  const renderIcon = useMemo(() => {
    switch (status) {
      case 'approved':
        return <CircleCheckIcon type="success" />;
      case 'under_review':
        return <CircleWarningIcon type="pending" />;
      case 'declined':
        return <CircleStopIcon type="error" />;
      default:
        return '';
    }
  }, [status]);

  return (
    <div className={styles.taskCalendar__item} {...props}>
      {renderIcon}
    </div>
  );
};

const StatusCellWithTooltip = withTooltip<IStatusCellProps>(StatusCell);

interface ITasksCalendarProps {
  start: string;
  finish: string;
  userTasks: IUserTask[];
}

export const TasksCalendar: React.FC<ITasksCalendarProps> = ({ start, finish, userTasks }) => {
  const heading = useMemo(() => {
    const startDate = new Date(start).getDate();
    const monthDays: (string | number)[] = ['№'];

    for (let day = startDate, i = 1; i <= 31; i += 1) {
      monthDays.push(day);

      if (day === 31) {
        day = 1;
      } else {
        day += 1;
      }
    }

    return monthDays.map((val) => (
      <div
        key={nanoid()}
        className={cn(
          styles.taskCalendar__item,
          styles.taskCalendar__item_type_heading,
          'text text_type_main-small text_color_secondary'
        )}
      >
        {val}
      </div>
    ));
  }, [start]);

  const content = useMemo(() => {
    const startDate = new Date(start);
    const finishDate = new Date(finish);

    type TRenderArr = ({ date: string; task: IUserTask | undefined } | null | string)[];
    const renderArr: TRenderArr = ['м1'];

    const daysDiff =
      userTasks.length > 0
        ? (startDate.getTime() -
            new Date(new Date(userTasks[0].task_date).setUTCHours(0, 0, 0, 0)).getTime()) /
          (24 * 60 * 60 * 1000)
        : 0;

    for (
      let key = daysDiff, date = startDate, prevDay, monthCount = 2;
      date <= finishDate;
      date.setUTCHours(24, 0, 0, 0), key += 1
    ) {
      const day = date.getDate();

      if (day === 1 && renderArr.length !== 1) {
        switch (prevDay) {
          case 28:
            renderArr.push(null, null, null);
            break;
          case 29:
            renderArr.push(null, null);
            break;
          case 30:
            renderArr.push(null);
            break;
          default:
            break;
        }
      } else if (renderArr.length % 32 === 0) {
        renderArr.push(`м${monthCount}`);
        monthCount += 1;
      }

      renderArr.push({
        date: date.toJSON().slice(0, 10),
        task: userTasks[key] ? { ...userTasks[key] } : undefined,
      });

      prevDay = day;
    }

    return renderArr.map((value) => {
      if (typeof value === 'string') {
        return (
          <div
            key={nanoid()}
            className={cn(
              styles.taskCalendar__item,
              styles.taskCalendar__item_type_heading,
              'text text_type_main-small text_color_secondary'
            )}
          >
            {value}
          </div>
        );
      }

      if (value === null) {
        return (
          <div
            key={nanoid()}
            className={cn(styles.taskCalendar__item, styles.taskCalendar__item_type_notExist)}
          />
        );
      }

      if (value?.task) {
        const taskDate = new Date(value.task.task_date);

        return (
          <StatusCellWithTooltip
            key={nanoid()}
            status={value.task.status}
            tooltipEnabled
            tooltipText={taskDate.toLocaleDateString('ru-RU')}
          />
        );
      }

      return <div key={nanoid()} className={styles.taskCalendar__item} />;
    });
  }, [userTasks, finish, start]);

  return (
    <div className={styles.tasksCalendar}>
      {heading}
      {content}
    </div>
  );
};
