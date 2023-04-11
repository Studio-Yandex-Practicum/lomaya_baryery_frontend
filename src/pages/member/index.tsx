import { useEffect } from 'react';
import cn from 'classnames';
import { useStore } from 'effector-react';
import { Navigate, useParams } from 'react-router-dom';
import { ContentContainer } from 'shared/ui-kit/content-container';
import { ContentHeading } from 'shared/ui-kit/content-heading';
import { CellDate, CellText } from 'shared/ui-kit/table';
import { MemberRowWithStat } from 'entities/member';
import { Table } from 'shared/ui-kit/table';
import { Loader } from 'shared/ui-kit/loader';
import { Alert } from 'shared/ui-kit/alert';
import { ShiftsByMember } from 'shared/api';
import { memberModel } from 'entities/member';
import { mount, unmount } from './model';
import styles from './styles.module.css';

interface GuardProps {
  shifts: ShiftsByMember[];
}

const Shifts = ({ shifts }: GuardProps) => {
  if (shifts.length === 0) {
    return (
      <Alert
        extClassName={styles.participants__notice}
        title={'Пользователь не принял участие ни в одной смене'}
      />
    );
  }
  console.log(shifts);

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
              />
            )
          )
        }
      />
    </>
  );
};

export function PageMember() {
  const { memberId } = useParams();

  useEffect(() => {
    if (memberId) {
      mount(memberId);
    }
    return () => {
      unmount();
    };
  }, [memberId]);

  const { data, isLoading, error } = useStore(memberModel.store.$memberState);

  if (isLoading) {
    return <Loader extClassName={styles.participants__notice} />;
  }

  if (data === null) {
    return <Navigate to="/members/all" replace />;
  }

  if (error) {
    return <Alert extClassName={styles.alert} title={error} />;
  }

  return (
    <>
      <ContentContainer extClassName={styles.headingContainer}>
        <ContentHeading
          title={`Участники проекта / ${data?.name} ${data?.surname}`}
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
