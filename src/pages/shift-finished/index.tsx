import { useEffect } from 'react';
import cn from 'classnames';
import { useStore } from 'effector-react';
import { Navigate, useParams } from 'react-router-dom';
import { ContentContainer } from 'shared/ui-kit/content-container';
import { ContentHeading } from 'shared/ui-kit/content-heading';
import { Table } from 'shared/ui-kit/table';
import { Loader } from 'shared/ui-kit/loader';
import { Alert } from 'shared/ui-kit/alert';
import { ShiftDetailsTable, shiftModel } from 'entities/shift';
import {
  ParticipantRowWithStat,
  participantsModel,
} from 'entities/participant';
import { findIndexById } from 'shared/utils/common-helpers';
import styles from './styles.module.css';
import { mount, unmount } from './model';

function Participants() {
  const {
    data: { shift, members },
    isLoading,
    error,
  } = useStore(participantsModel.$participantsState);

  if (!shift) {
    return null;
  }

  if (isLoading) {
    return <Loader extClassName={styles.participants__notice} />;
  }

  if (error) {
    return (
      <Alert
        extClassName={styles.participants__notice}
        title="Что-то пошло не так, список не загружен"
      />
    );
  }

  if (members.length === 0) {
    return (
      <Alert
        extClassName={styles.participants__notice}
        title={'В смене не\u00A0было участников'}
      />
    );
  }

  return (
    <>
      <h2 className={cn(styles.title, 'text')}>Участники</h2>
      <Table
        gridClassName={styles.participantsTable}
        header={['Имя и фамилия', 'Город', 'Дата рождения', 'Статусы заданий']}
        renderRows={(commonGridClassName) =>
          members.map(({ id, reports, user }) => (
            <ParticipantRowWithStat
              gridClassName={commonGridClassName}
              key={id}
              tasksData={reports}
              userData={user}
              shiftStart={shift.started_at}
              shiftFinish={shift.finished_at}
            />
          ))
        }
      />
    </>
  );
}

export function PageFinishedShift() {
  const { shiftId } = useParams();
  const finishedShifts = useStore(shiftModel.$finishedShifts);

  useEffect(() => {
    if (shiftId) {
      mount(shiftId);
    }
    return () => {
      unmount();
    };
  }, [shiftId]);

  const index = findIndexById(finishedShifts, 'id', shiftId);

  if (index === null) {
    return <Navigate to="/shifts/all" replace />;
  }

  const shiftData = finishedShifts[index];

  return (
    <>
      <ContentContainer extClassName={styles.headingContainer}>
        <ContentHeading title="Прошедшая" extClassName={styles.heading} />
        <ShiftDetailsTable
          title={shiftData.title}
          start={shiftData.started_at}
          finish={shiftData.finished_at}
          participants={shiftData.total_users}
          extClassName={styles.shiftTable}
        />
      </ContentContainer>
      <ContentContainer extClassName={styles.participantsContainer}>
        <Participants />
      </ContentContainer>
    </>
  );
}
