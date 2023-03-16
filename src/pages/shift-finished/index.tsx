import { useEffect } from 'react';
import cn from 'classnames';
import { useStore } from 'effector-react';
import { Navigate, useParams } from 'react-router-dom';
import { ContentContainer } from 'shared/ui-kit/content-container';
import { ContentHeading } from 'shared/ui-kit/content-heading';
import { Loader } from 'shared/ui-kit/loader';
import { Alert } from 'shared/ui-kit/alert';
import { ShiftDetailsTable } from 'entities/shift';
import { participantsModel } from 'entities/participant';
import { findIndexById } from 'shared/lib/helpers';
import { tasksModel } from 'entities/task';
import { ParticipantsTableWithCalendar } from 'widgets/participants-table-with-calendar';
import styles from './styles.module.css';
import { $shiftsList, mount, unmount } from './model';

interface ParticipantsProps {
  shift: {
    started_at: string;
    finished_at: string;
  };
}

function Participants({ shift }: ParticipantsProps) {
  const {
    data: { members },
    isLoading,
    error,
  } = useStore(participantsModel.$participantsState);

  const tasksDetailProvider = useStore(tasksModel.$tasks);

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
      <ParticipantsTableWithCalendar
        gridClassName={styles.participantsTable}
        participants={members}
        shift={shift}
        tasksDetailProvider={tasksDetailProvider}
      />
    </>
  );
}

export function PageFinishedShift() {
  const { shiftId } = useParams();
  const finishedShifts = useStore($shiftsList);

  useEffect(() => {
    if (shiftId) {
      mount(shiftId);
      tasksModel.fetchTasks();
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
        <Participants shift={shiftData} />
      </ContentContainer>
    </>
  );
}
