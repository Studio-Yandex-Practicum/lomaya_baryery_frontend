import { useMemo, useState } from 'react';
import cn from 'classnames';
import { ChevronRightIcon } from 'shared/ui-kit/icons';
import { CellDate, CellTasksStat, CellText } from 'shared/ui-kit/table';
import { TasksCalendar } from 'shared/ui-kit/tasks-calendar';
import styles from './styles.module.css';

interface IParticipantRowWithStatProps {
  gridClassName: string;
  shiftStart: string;
  shiftFinish: string;
  userData: {
    name: string;
    surname: string;
    city: string;
    date_of_birth: string;
  };
  tasksData: Array<{
    task_id: string;
    status: 'reviewing' | 'approved' | 'declined';
    task_date: string;
  }>;
}

export function ParticipantRowWithStat({
  userData,
  tasksData,
  shiftStart,
  shiftFinish,
  gridClassName,
}: IParticipantRowWithStatProps) {
  const [toggle, setToggle] = useState(false);

  const statistics = useMemo(
    () =>
      tasksData.reduce(
        (acc, curr) => {
          acc[curr.status] += 1;
          return acc;
        },
        { reviewing: 0, approved: 0, declined: 0 }
      ),
    [tasksData]
  );

  return (
    <div className={cn(styles.row, 'tableContentRow')}>
      <div className={cn(styles.row__data, gridClassName)}>
        <div className={styles.row__name}>
          <ChevronRightIcon
            onClick={() => setToggle((toggle) => !toggle)}
            type="gray-dark"
            className={cn(styles.row__nameIcon, {
              [styles.row__nameIcon_rotated]: toggle,
            })}
          />
          <CellText
            type="accent"
            text={`${userData.name} ${userData.surname}`}
          />
        </div>
        <CellText text={userData.city} />
        <CellDate date={userData.date_of_birth} />
        <CellTasksStat data={statistics} />
      </div>
      {toggle ? (
        <TasksCalendar
          start={shiftStart}
          finish={shiftFinish}
          userTasks={tasksData}
        />
      ) : null}
    </div>
  );
}
