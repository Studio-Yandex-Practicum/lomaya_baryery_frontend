import { useEffect } from 'react';
import cn from 'classnames';
import { useEvent, useStore } from 'effector-react';
import { ContentContainer } from '../../../ui/content-container';
import { ContentHeading } from '../../../ui/content-heading';
import { StartedShiftDetails } from '../../entities/started-shift';
import { UpdateStartedShift } from '../../features/update-started-shift';
// import { ShiftParticipantsWithStat } from '../../entities/participants';
import styles from './styles.module.css';
import { ChangeFinalMessage } from '../../features/change-final-message';
import { Table } from '../../../ui/table';
import {
  ParticipantRowWithStat,
  participantsModel,
} from '../../entities/participant';
import { Loader } from '../../../ui/loader';
import { Alert } from '../../../ui/alert';
import { startedShiftPageModel } from './model';

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
  const { mount, unmount } = useEvent(startedShiftPageModel);

  useEffect(() => {
    mount();
    return () => {
      unmount();
    };
  }, [mount, unmount]);

  // const handleFinishShift = () => {
  //   if (startedShift) {
  //     setFinishShift(startedShift.id);
  //   }
  // };

  return (
    <>
      <ContentContainer extClassName={styles.headingContainer}>
        <ContentHeading title="Текущая" extClassName={styles.heading}>
          {/* <ChangeFinalMessage extClassName={styles.heading__msgButton} /> */}
          {/* <Button
            htmlType="button"
            type="negative"
            size="small"
            onClick={finishShift}
            loading={isMutating}
            disabled={isMutating}
          >
            Завершить смену
          </Button> */}
        </ContentHeading>
        <StartedShiftDetails
          extClassName={styles.shiftTable}
          featureComponent={<UpdateStartedShift />}
        />
      </ContentContainer>
      <ContentContainer extClassName={styles.participantsContainer}>
        <Participants />
      </ContentContainer>

      {/* <Dialog
        opened={finishShiftDialog}
        title="Завершение смены"
        text={
          'Участинки смогут отправить отчёт до\u00A0конца следующего дня, не\u00A0забудьте их\u00A0проверить. Вы уверены, что хотите завершить смену?'
        }
        onClose={handleCloseModal}
        primaryButton={
          <Button
            htmlType="button"
            size="small"
            type="primary"
            onClick={handleCloseModal}
          >
            Отмена
          </Button>
        }
        secondaryButton={
          <Button
            htmlType="button"
            size="small"
            type="negative"
            onClick={handleFinishShift}
          >
            Завершить
          </Button>
        }
      /> */}
    </>
  );
}
