import { useState } from 'react';
import { TasksCalendar } from 'entities/task';
import cn from 'classnames';
import { ChevronRightIcon } from 'shared/ui-kit/icons';
import { CellDate, CellTasksStat, CellText } from 'shared/ui-kit/table';
import styles from './styles.module.css';

interface IMemberRowWithStatProps {
  gridClassName: string;
  shiftStart: string;
  shiftFinish: string;
  title: string;
  numbersLombaryers: number;
  totalApproved: number;
  totalDeclined: number;
  totalSkipped: number;
  tasksDetailProvider: Record<string, { description: string }> | null;
  reports: Array<{
    task_id: string;
    status:
      | 'not_participate'
      | 'waiting'
      | 'skipped'
      | 'reviewing'
      | 'approved'
      | 'declined';
    task_date: string;
  }>;
}

export function MemberRowWithStat({
  totalApproved,
  totalDeclined,
  totalSkipped,
  title,
  numbersLombaryers,
  shiftStart,
  shiftFinish,
  gridClassName,
  tasksDetailProvider,
  reports,
}: IMemberRowWithStatProps) {
  const [toggle, setToggle] = useState(false);

  const statistics = {
    reviewing: totalSkipped,
    approved: totalApproved,
    declined: totalDeclined,
  };

  return (
    <div className={cn(styles.row, 'tableContentRow')}>
      <div className={cn(styles.row__data, gridClassName)}>
        <div className={styles.row__name}>
          <ChevronRightIcon
            onClick={() => setToggle((toggle) => !toggle)}
            color="gray-dark"
            className={cn(styles.row__nameIcon, {
              [styles.row__nameIcon_rotated]: toggle,
            })}
          />
          <CellText type="accent" text={title} />
        </div>
        <div className={styles.row__dates}>
          <CellDate date={shiftStart} />
          <span>&nbsp;-&nbsp;</span>
          <CellDate date={shiftFinish} />
        </div>
        <CellText text={numbersLombaryers} />
        <CellTasksStat data={statistics} />
      </div>
      {toggle ? (
        <TasksCalendar
          start={shiftStart}
          finish={shiftFinish}
          userTasks={reports}
          tasksDetailProvider={tasksDetailProvider}
        />
      ) : null}
    </div>
  );
}
