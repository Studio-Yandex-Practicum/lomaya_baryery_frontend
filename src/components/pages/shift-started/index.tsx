import { useEffect } from 'react';
import cn from 'classnames';
import { useEvent, useStore } from 'effector-react';
import { Navigate } from 'react-router-dom';
import { ContentContainer } from '../../../ui/content-container';
import { ContentHeading } from '../../../ui/content-heading';
import { Table } from '../../../ui/table';
import { Loader } from '../../../ui/loader';
import { Alert } from '../../../ui/alert';
import { StartedShiftDetails } from '../../entities/started-shift';
import {
  ParticipantRowWithStat,
  participantsModel,
} from '../../entities/participant';
import { FinalMessageForm } from '../../features/change-final-message';
import { UpdateStartedShift } from '../../features/update-started-shift';
import * as startedShiftPageModel from './model';
import styles from './styles.module.css';
import { FinishShiftDialog } from '../../features/finish-shift';

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
  const { mount, unmount } = useEvent(startedShiftPageModel.events);
  const isRedirect = useStore(startedShiftPageModel.store.isRedirect);

  useEffect(() => {
    mount();
    return () => {
      unmount();
    };
  }, [mount, unmount]);

  if (isRedirect) {
    return <Navigate to="/shifts/all" replace />;
  }

  return (
    <>
      <ContentContainer extClassName={styles.headingContainer}>
        <ContentHeading title="Текущая" extClassName={styles.heading}>
          <FinalMessageForm extClassName={styles.heading__msgButton} />
          <FinishShiftDialog />
        </ContentHeading>
        <StartedShiftDetails
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
