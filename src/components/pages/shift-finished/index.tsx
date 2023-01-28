import { useMemo } from 'react';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { useGetAllShiftsQuery, useGetShiftUsersQuery } from '../../../redux-store/api';
import { Alert } from '../../../ui/alert';
import { Loader } from '../../../ui/loader';
import { Table } from '../../../ui/table';
import { ContentContainer } from '../../../ui/content-container';
import { ContentHeading } from '../../../ui/content-heading';
import { ShiftSettingsRow } from '../../shift-settings-row';
import { FinishedShiftRow } from '../../finished-shift-row';
import styles from './styles.module.css';

export const PageFinishedShift = () => {
  const { id } = useParams();

  const { finishedShift } = useGetAllShiftsQuery(undefined, {
    selectFromResult: ({ data }) => ({ finishedShift: data?.find((shift) => shift.id === id) }),
  });

  const {
    data,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useGetShiftUsersQuery(id ?? skipToken);

  const participantsTable = useMemo(() => {
    if (isUsersLoading) {
      return <Loader extClassName={styles.shift__loader} />;
    }
    if (isUsersError || !data) {
      return <Alert extClassName={styles.participants__alert} title={'Что-то пошло не\u00A0так'} />;
    }

    if (data.members.length === 0) {
      return (
        <Alert
          extClassName={styles.participants__alert}
          title={'В смене не\u00A0было участников'}
        />
      );
    }

    return (
      <Table
        extClassName={styles.shift__participantsTable}
        gridClassName={styles.participants__tableColumns}
        header={['Имя и фамилия', 'Город', 'Дата рождения', 'Статусы заданий']}
        renderRows={(rowStyles) => (
          <>
            {data.members.map((member) => (
              <FinishedShiftRow
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
      <ContentContainer extClassName={styles.shift__headingContainer}>
        <ContentHeading title="Прошедшая" extClassName={styles.shift__heading} />
        <Table
          extClassName={styles.shift__headingTable}
          header={['Название смены', 'Дата старта/окончания', 'Кол-во участников']}
          gridClassName={styles.shift__headingTableColumns}
          renderRows={(rowStyles) => (
            <ShiftSettingsRow
              extClassName={rowStyles}
              title={finishedShift.title}
              start={finishedShift.started_at}
              finish={finishedShift.finished_at}
              participants={finishedShift.total_users}
            />
          )}
        />
      </ContentContainer>
      <ContentContainer extClassName={styles.shift__participantsContainer}>
        <h2 className={cn(styles.participants, 'text')}>Участники</h2>
        {participantsTable}
      </ContentContainer>
    </>
  );
};
