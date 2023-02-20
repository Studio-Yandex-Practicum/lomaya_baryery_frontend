import { useEffect } from 'react';
import cn from 'classnames';
import { useEvent, useStore } from 'effector-react';
import { Navigate } from 'react-router-dom';
import { ContentContainer } from '../../shared/ui-kit/content-container';
import { ContentHeading } from '../../shared/ui-kit/content-heading';
import { Table } from '../../shared/ui-kit/table';
import { Loader } from '../../shared/ui-kit/loader';
import { Alert } from '../../shared/ui-kit/alert';
import * as pageModel from './model';
import { ShiftDetailsTable, shiftModel } from '../../entities/shift';
import { participantsModel } from '../../entities/participant';
import { ParticipantRow } from '../../entities/participant/ui/participant-row';
import { UpdatePreparingShift } from '../../features/update-preparing-shift';
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
        header={['Имя и фамилия', 'Город', 'Телефон', 'Дата рождения']}
        renderRows={(commonGridClassName) =>
          members.map(({ id, user }) => (
            <ParticipantRow
              key={id}
              gridClassName={commonGridClassName}
              userData={user}
            />
          ))
        }
      />
    </>
  );
}

export function PagePreparingShift() {
  const { mount, unmount } = useEvent(pageModel.events);
  const shiftData = useStore(shiftModel.$preparingShift);

  useEffect(() => {
    mount();
    return () => {
      unmount();
    };
  }, [mount, unmount]);

  if (shiftData === null) {
    return <Navigate to="/shifts/all" replace />;
  }

  return (
    <>
      <ContentContainer extClassName={styles.headingContainer}>
        <ContentHeading title="Новая" extClassName={styles.heading} />
        <ShiftDetailsTable
          title={shiftData.title}
          start={shiftData.started_at}
          finish={shiftData.finished_at}
          participants={shiftData.total_users}
          extClassName={styles.shiftTable}
          featureComponent={<UpdatePreparingShift />}
        />
      </ContentContainer>
      <ContentContainer extClassName={styles.participantsContainer}>
        <Participants />
      </ContentContainer>
    </>
  );
}
