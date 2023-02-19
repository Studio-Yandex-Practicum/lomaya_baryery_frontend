import { useEffect } from 'react';
import cn from 'classnames';
import { useEvent, useStore } from 'effector-react';
import { Navigate } from 'react-router-dom';
import { ContentContainer } from '../../../ui/content-container';
import { ContentHeading } from '../../../ui/content-heading';
import { Table } from '../../../ui/table';
import { Loader } from '../../../ui/loader';
import { Alert } from '../../../ui/alert';
import * as pageModel from './model';
import { StartedShiftDetails } from '../../entities/started-shift';
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
  const isRedirect = useStore(pageModel.store.isRedirect);

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
        <ContentHeading title="Новая" extClassName={styles.heading} />
        <StartedShiftDetails
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
