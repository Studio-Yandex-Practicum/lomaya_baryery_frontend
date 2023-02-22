import { useEffect } from 'react';
import cn from 'classnames';
import { useStore } from 'effector-react';
import { Navigate } from 'react-router-dom';
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
import { FinalMessageForm } from 'features/change-final-message';
import { UpdateStartedShift } from 'features/update-started-shift';
import { FinishShiftDialog } from 'features/finish-shift';
import { mount, unmount } from './model';
import styles from './styles.module.css';

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
        title={'Нет принятых заявок на\u00A0участие'}
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

export function PageStartedShift() {
  const shiftData = useStore(shiftModel.$startedShift);

  useEffect(() => {
    mount();
    return () => {
      unmount();
    };
  }, []);

  if (shiftData === null) {
    return <Navigate to="/shifts/all" replace />;
  }

  return (
    <>
      <ContentContainer extClassName={styles.headingContainer}>
        <ContentHeading title="Текущая" extClassName={styles.heading}>
          <FinalMessageForm extClassName={styles.heading__msgButton} />
          <FinishShiftDialog />
        </ContentHeading>
        <ShiftDetailsTable
          title={shiftData.title}
          start={shiftData.started_at}
          finish={shiftData.finished_at}
          participants={shiftData.total_users}
          extClassName={styles.shiftTable}
          featureComponent={<UpdateStartedShift />}
        />
      </ContentContainer>
      <ContentContainer extClassName={styles.participantsContainer}>
        <Participants />
      </ContentContainer>
    </>
  );
}
