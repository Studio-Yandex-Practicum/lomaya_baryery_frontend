import { useEvent, useStore } from 'effector-react';
import { useEffect } from 'react';
import { Alert } from '../../../../ui/alert';
import { Loader } from '../../../../ui/loader';
import { ShiftParticipants } from '../../../shift-participants';
import { ParticipantRowWithStat } from '../../../shift-participants/participant-row-with-stat';
import * as participantsModel from '../model';
import styles from './styles.module.css';

interface ShiftParticipantsWithStatProps {
  shiftId: string;
}

export function ShiftParticipantsWithStat({
  shiftId,
}: ShiftParticipantsWithStatProps) {
  const { data, isLoading, isError } = useStore(
    participantsModel.store.participants
  );

  const { mountEvent, unmountEvent } = useEvent(participantsModel.events);

  useEffect(() => {
    mountEvent(shiftId);
    return () => {
      unmountEvent();
    };
  }, [shiftId, mountEvent, unmountEvent]);

  if (isLoading) {
    return <Loader extClassName={styles.participants__notice} />;
  }

  if (isError) {
    return (
      <Alert
        extClassName={styles.participants__notice}
        title="Что-то пошло не так, список не загружен"
      />
    );
  }

  if (data?.members.length === 0) {
    return (
      <Alert
        extClassName={styles.participants__notice}
        title={'Нет принятых заявок на\u00A0участие'}
      />
    );
  }

  return (
    <ShiftParticipants
      renderRows={
        <>
          {data?.members.map((member) => (
            <ParticipantRowWithStat
              key={member.id}
              cellsClassName={styles.row}
              userData={member.user}
              tasksData={member.reports}
              shiftStart={data.shift.started_at}
              shiftFinish={data.shift.finished_at}
            />
          ))}
        </>
      }
    />
  );
}
