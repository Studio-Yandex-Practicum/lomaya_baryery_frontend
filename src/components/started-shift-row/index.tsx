import React, { useMemo, useState } from 'react';
import cn from 'classnames';
import { CellDate } from '../../ui/table-native/cell-date';
import styles from './styles.module.css';
import { IUser, IUserTask } from '../../redux-store/api/models';
import { CellTasksStat, CellText } from '../../ui/table-native';
import { TasksCalendar } from '../../ui/tasks-calendar';
import { ChevronRightIcon } from '../../ui/icons';

interface IStartedShiftRowProps {
  shiftStart: string;
  shiftFinish: string;
  userData: IUser;
  tasksData: IUserTask[];
  cellsClassName: string;
}

export const StartedShiftRow: React.FC<IStartedShiftRowProps> = ({
  userData,
  tasksData,
  shiftStart,
  shiftFinish,
  cellsClassName,
}) => {
  const [toggle, setToggle] = useState(false);

  const statistics = useMemo(
    () =>
      tasksData.reduce(
        (acc, curr) => {
          acc[curr.status] += 1;
          return acc;
        },
        { under_review: 0, approved: 0, declined: 0 }
      ),
    [tasksData]
  );

  return (
    <div className={cn(styles.row, 'tableContentRow')}>
      <div className={cn(styles.row__data, cellsClassName)}>
        <div className={styles.row__name}>
          <ChevronRightIcon
            onClick={() => setToggle((toggle) => !toggle)}
            type="interface-primary"
            className={cn(styles.row__nameIcon, {
              [styles.row__nameIcon_rotated]: toggle,
            })}
          />
          <CellText type="accent" text={`${userData.name} ${userData.surname}`} />
        </div>
        <CellText text={userData.city} />
        <CellDate date={userData.date_of_birth} />
        <CellTasksStat data={statistics} />
      </div>
      {toggle ? (
        <TasksCalendar start={shiftStart} finish={shiftFinish} userTasks={tasksData} />
      ) : null}
    </div>
  );
};
