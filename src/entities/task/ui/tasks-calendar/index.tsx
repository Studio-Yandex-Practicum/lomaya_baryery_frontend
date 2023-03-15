import { nanoid } from 'nanoid';
import { useMemo } from 'react';
import cn from 'classnames';
import { TaskCell } from '../task-cell';
import styles from './styles.module.css';

interface IUserTask {
  task_id: string;
  status:
    | 'not_participate'
    | 'waiting'
    | 'skipped'
    | 'reviewing'
    | 'approved'
    | 'declined';
  task_date: string;
}

interface ITasksCalendarProps {
  start: string;
  finish: string;
  userTasks: IUserTask[];
  tasksDetailProvider: {
    [key: string]: { description: string };
  } | null;
}

export function TasksCalendar({
  start,
  finish,
  userTasks,
  tasksDetailProvider,
}: ITasksCalendarProps) {
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
          styles.cell,
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

    type TRenderArr = (
      | { date: string; task: IUserTask | undefined }
      | null
      | string
    )[];
    const renderArr: TRenderArr = ['м1'];

    const daysDiff =
      userTasks.length > 0
        ? (startDate.getTime() -
            new Date(
              new Date(userTasks[0].task_date).setUTCHours(0, 0, 0, 0)
            ).getTime()) /
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
              styles.cell,
              'text text_type_main-small text_color_secondary'
            )}
          >
            {value}
          </div>
        );
      }

      if (value === null) {
        return <div key={nanoid()} className={cn(styles.cell)} />;
      }

      if (value?.task) {
        const taskDate = new Date(value.task.task_date);

        return (
          <TaskCell
            key={value.task.task_id}
            status={value.task.status}
            date={taskDate.toLocaleString('ru-RU', { dateStyle: 'long' })}
            description={
              tasksDetailProvider
                ? tasksDetailProvider[value.task.task_id].description
                : null
            }
          />
        );
      }

      return (
        <div
          key={nanoid()}
          className={cn(styles.cell, styles.cell__type_empty)}
        />
      );
    });
  }, [userTasks, finish, start, tasksDetailProvider]);

  return (
    <div className={styles.calendar}>
      {heading}
      {content}
    </div>
  );
}
