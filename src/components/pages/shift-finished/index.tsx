import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Alert } from '../../../ui/alert';
import { Loader } from '../../../ui/loader';
import { Table } from '../../../ui/table';
import { ContentContainer } from '../../../ui/content-container';
import { ContentHeading } from '../../../ui/content-heading';
import { ShiftDetailsTable } from '../../shift-details-table';
import { ParticipantRowWithStat } from '../../shift-participants/participant-row-with-stat';
import {
  useParticipantsStoreQuery,
  useShiftsStoreQuery,
} from '../../../services/store';
import styles from './styles.module.css';

export const PageFinishedShift = () => {
  const { id } = useParams();

  const { data: shifts } = useShiftsStoreQuery();

  const finishedShift = useMemo(
    () => shifts?.find((shift) => shift.id === id),
    [shifts, id]
  );

  const {
    data,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useParticipantsStoreQuery(id, ['finished', id]);

  const participantsTable = useMemo(() => {
    if (isUsersLoading) {
      return <Loader extClassName={styles.participants__notice} />;
    }
    if (isUsersError || !data) {
      return (
        <Alert
          extClassName={styles.participants__notice}
          title={'Что-то пошло не\u00A0так'}
        />
      );
    }

    if (data.members.length === 0) {
      return (
        <Alert
          extClassName={styles.participants__notice}
          title={'В смене не\u00A0было участников'}
        />
      );
    }

    return (
      <Table
        gridClassName={styles.participantsTable}
        header={['Имя и фамилия', 'Город', 'Дата рождения', 'Статусы заданий']}
        renderRows={(rowStyles) => (
          <>
            {data.members.map((member) => (
              <ParticipantRowWithStat
                key={member.id}
                cellsClassName={rowStyles}
                userData={member.user}
                tasksData={member.reports}
                shiftStart={data.shift.started_at}
                shiftFinish={data.shift.finished_at}
              />
            ))}
          </>
        )}
      />
    );
  }, [isUsersLoading, isUsersError, data]);

  if (!finishedShift) {
    return (
      <ContentContainer>
        <Alert title={'Смена не\u00A0найдена'} />
      </ContentContainer>
    );
  }

  return (
    <>
      <ContentContainer extClassName={styles.headingContainer}>
        <ContentHeading title="Прошедшая" extClassName={styles.heading} />
        <ShiftDetailsTable
          extClassName={styles.shiftTable}
          title={finishedShift.title}
          start={finishedShift.started_at}
          finish={finishedShift.finished_at}
          participants={finishedShift.total_users}
        />
      </ContentContainer>
      <ContentContainer extClassName={styles.participantsContainer}>
        <h2 className={cn(styles.title, 'text')}>Участники</h2>
        {participantsTable}
      </ContentContainer>
    </>
  );
};
