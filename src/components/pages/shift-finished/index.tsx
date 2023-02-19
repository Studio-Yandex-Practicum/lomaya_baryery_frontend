import { useEffect } from 'react';
import cn from 'classnames';
import { useEvent, useStore } from 'effector-react';
import { Navigate, useParams } from 'react-router-dom';
import { ContentContainer } from '../../../ui/content-container';
import { ContentHeading } from '../../../ui/content-heading';
import { Table } from '../../../ui/table';
import { Loader } from '../../../ui/loader';
import { Alert } from '../../../ui/alert';
import * as pageModel from './model';
import { StartedShiftDetails } from '../../entities/started-shift';
import {
  ParticipantRowWithStat,
  participantsModel,
} from '../../entities/participant';
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
  const { mount, unmount } = useEvent(pageModel.events);

  useEffect(() => {
    if (shiftId) {
      mount(shiftId);
    }
    return () => {
      unmount();
    };
  }, [mount, unmount, shiftId]);

  if (!shiftId) {
    return <Navigate to="/shifts/all" replace />;
  }

  return (
    <>
      <ContentContainer extClassName={styles.headingContainer}>
        <ContentHeading title="Прошедшая" extClassName={styles.heading} />
        <StartedShiftDetails extClassName={styles.shiftTable} />
      </ContentContainer>
      <ContentContainer extClassName={styles.participantsContainer}>
        <Participants />
      </ContentContainer>
    </>
  );
}
