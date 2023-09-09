import { TasksCalendar } from 'entities/task';
import { useMemo, useState } from 'react';
import { CellDate, CellTasksStat, CellText, Table } from 'shared/ui-kit/table';
import cn from 'classnames';
import { ChevronRightIcon } from 'shared/ui-kit/icons';
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
    status:
      | 'not_participate'
      | 'waiting'
      | 'skipped'
      | 'reviewing'
      | 'approved'
      | 'declined';
    task_date: string;
  }>;
  status: string;
  tasksDetailProvider: { [key: string]: { description: string } } | null;
}

export function ParticipantRowWithStat({
  userData,
  tasksData,
  status,
  shiftStart,
  shiftFinish,
  gridClassName,
  tasksDetailProvider,
}: IParticipantRowWithStatProps) {
  const [toggle, setToggle] = useState(false);

  const statistics = useMemo(
    () =>
      tasksData.reduce(
        (acc, curr) => {
          acc[curr.status] += 1;
          return acc;
        },
        {
          reviewing: 0,
          approved: 0,
          declined: 0,
          waiting: 0,
          skipped: 0,
          not_participate: 0,
        }
      ),
    [tasksData]
  );

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
          <div>
            <CellText
              type="accent"
              text={`${userData.name} ${userData.surname}`}
            />
            {status === 'excluded' && (
              <span
                className={cn(
                  styles.cellText,
                  'text',
                  'text_type_main-default',
                  `text_color_secondary`,
                  'm-0'
                )}
              >
                Исключен
              </span>
            )}
          </div>
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
          tasksDetailProvider={tasksDetailProvider}
        />
      ) : null}
    </div>
  );
}

interface ParticipantsTableProps {
  gridClassName: string;
  shift: { started_at: string; finished_at: string };
  participants: Array<{
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
    status: string;
  }>;
  tasksDetailProvider: Record<string, { description: string }> | null;
}

export function ParticipantsTableWithCalendar({
  participants,
  shift,
  gridClassName,
  tasksDetailProvider,
}: ParticipantsTableProps) {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <Table
        gridClassName={gridClassName}
        header={['Имя и фамилия', 'Город', 'Дата рождения', 'Статусы заданий']}
        renderRows={(commonGridClassName) =>
          participants.map(
            ({ id, reports, user, status }) =>
              status !== 'excluded' && (
                <ParticipantRowWithStat
                  gridClassName={commonGridClassName}
                  key={id}
                  status={status}
                  tasksData={reports}
                  userData={user}
                  shiftStart={shift.started_at}
                  shiftFinish={shift.finished_at}
                  tasksDetailProvider={tasksDetailProvider}
                />
              )
          )
        }
      />
      {participants.some(({ status }) => status === 'excluded') && (
        <div>
          <div className={cn(styles.row__excluded)}>
            <ChevronRightIcon
              onClick={() => setToggle((toggle) => !toggle)}
              color="gray-dark"
              className={cn(styles.row__nameIcon, {
                [styles.row__nameIcon_rotated]: toggle,
              })}
            />
            <CellText type="accent" text="Исключены" />
          </div>
          {toggle ? (
            <Table
              gridClassName={gridClassName}
              renderRows={(commonGridClassName) =>
                participants.map(
                  ({ id, reports, user, status }) =>
                    status === 'excluded' && (
                      <ParticipantRowWithStat
                        gridClassName={commonGridClassName}
                        key={id}
                        status={status}
                        tasksData={reports}
                        userData={user}
                        shiftStart={shift.started_at}
                        shiftFinish={shift.finished_at}
                        tasksDetailProvider={tasksDetailProvider}
                      />
                    )
                )
              }
            />
          ) : null}
        </div>
      )}
    </>
  );
}
