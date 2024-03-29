/* eslint-disable camelcase */
import { useEffect } from 'react';
import cn from 'classnames';
import { useStore } from 'effector-react';
import { useParams } from 'react-router-dom';
import { ContentContainer } from 'shared/ui-kit/content-container';
import { ContentHeading } from 'shared/ui-kit/content-heading';
import { CellDate, CellText } from 'shared/ui-kit/table';
import { MemberRowWithStat } from 'entities/member';
import { Table } from 'shared/ui-kit/table';
import { Loader } from 'shared/ui-kit/loader';
import { Alert } from 'shared/ui-kit/alert';
import { ShiftsByMember } from 'shared/api';
import { memberModel } from 'entities/member';
import { tasksModel } from 'entities/task';
import { mount, unmount } from './model';
import styles from './styles.module.css';

interface GuardProps {
  shifts: ShiftsByMember[];
}

const Shifts = ({ shifts }: GuardProps) => {
  const tasksDetailProvider = useStore(tasksModel.$tasks);

  if (shifts.length === 0) {
    return (
      <Alert
        extClassName={styles.participants__notice}
        title="Пользователь не принял участие ни в одной смене"
      />
    );
  }

  return (
    <>
      <h2 className={cn(styles.title, 'text')}>Смены</h2>
      <Table
        gridClassName={styles.shiftsTable}
        header={[
          'Название смены',
          'Даты проведения',
          'Кол-во ломбарьеров',
          'Статусы заданий',
        ]}
        renderRows={(commonGridClassName) =>
          shifts.map(
            ({
              id,
              title,
              numbers_lombaryers,
              started_at,
              finished_at,
              total_approved,
              total_declined,
              total_skipped,
              reports,
            }) => (
              <MemberRowWithStat
                gridClassName={commonGridClassName}
                key={id}
                title={title}
                numbersLombaryers={numbers_lombaryers}
                shiftStart={started_at}
                shiftFinish={finished_at}
                totalApproved={total_approved}
                totalDeclined={total_declined}
                totalSkipped={total_skipped}
                tasksDetailProvider={tasksDetailProvider}
                reports={reports}
              />
            )
          )
        }
      />
    </>
  );
};

export function PageMember() {
  const { data, isLoading, error } = useStore(memberModel.store.$memberState);
  const { memberId } = useParams();

  useEffect(() => {
    if (memberId) {
      mount(memberId);
      tasksModel.fetchTasks();
    }
    return () => {
      unmount();
    };
  }, [memberId]);

  if (!isLoading || !data) {
    return <Loader extClassName={styles.member__notice} />;
  }

  if (error) {
    return <Alert extClassName={styles.alert} title={error} />;
  }

  if (Object.keys(data).length === 0) {
    return (
      <Alert
        extClassName={styles.member__notice}
        title="Информация по данному участнику недоступна!"
      />
    );
  }

  return (
    <>
      <ContentContainer extClassName={styles.headingContainer}>
        <ContentHeading
          title={`${data?.name} ${data?.surname}`}
          crumbs={[
            {
              title: 'Участники проекта',
              url: '/members/all',
            },
          ]}
          extClassName={styles.heading}
        />
        <div className={styles.container}>
          <div className={styles.items}>
            <p className={styles.text}>Дата рождения</p>
            <CellDate date={data.date_of_birth} />
          </div>
          <div className={styles.items}>
            <p className={styles.text}>Телефон</p>
            <CellText text={data.phone_number} />
          </div>
          <div className={styles.items}>
            <p className={styles.text}>Город</p>
            <CellText text={data.city} />
          </div>
        </div>
      </ContentContainer>
      <ContentContainer extClassName={styles.shiftsContainer}>
        <Shifts shifts={data.shifts} />
      </ContentContainer>
    </>
  );
}
