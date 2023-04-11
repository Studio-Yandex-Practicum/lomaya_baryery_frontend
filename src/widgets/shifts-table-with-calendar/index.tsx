import { TasksCalendar } from 'entities/task';
import { useMemo, useState } from 'react';
import { CellDate, CellTasksStat, CellText, Table } from 'shared/ui-kit/table';
import cn from 'classnames';
import { ChevronRightIcon } from 'shared/ui-kit/icons';
import styles from './styles.module.css';

export function ShiftRowWithStat() {}

interface ShiftsTableProps {
  gridClassName: string;
  shifts: Array<{
    id: string;
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
    user: {
      id: string;
      name: string;
      surname: string;
      date_of_birth: string;
      city: string;
      phone_number: string;
    };
  }>;
  tasksDetailProvider: Record<string, { description: string }> | null;
}

export function ParticipantsTableWithCalendar({
  participants,
  shift,
  gridClassName,
  tasksDetailProvider,
}: ParticipantsTableProps) {
  return (
    <Table
      gridClassName={gridClassName}
      header={[
        'Название смены',
        'Даты проведения',
        'Кол-во ломбальеров',
        'Статусы заданий',
      ]}
      renderRows={(commonGridClassName) =>
        participants.map(({ id, reports, user }) => (
          <ParticipantRowWithStat
            gridClassName={commonGridClassName}
            key={id}
            tasksData={reports}
            userData={user}
            shiftStart={shift.started_at}
            shiftFinish={shift.finished_at}
            tasksDetailProvider={tasksDetailProvider}
          />
        ))
      }
    />
  );
}
