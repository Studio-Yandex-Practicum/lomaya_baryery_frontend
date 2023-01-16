import { useMemo } from 'react';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { useGetAllShiftsQuery, useGetShiftUsersQuery } from '../../../redux-store/api';
import { Alert } from '../../../ui/alert';
import { Loader } from '../../../ui/loader';
import { Table } from '../../../ui/table-native';
import { ContentContainer } from '../../../ui/content-container';
import { ContentHeading } from '../../../ui/content-heading';
import { ShiftSettingsRow } from '../../shift-settings-row';
import styles from './styles.module.css';
import { FinishedShiftRow } from '../../finished-shift-row';

export const PageFinishedShift = () => {
  const { id } = useParams();

  const { shift } = useGetAllShiftsQuery(undefined, {
    selectFromResult: ({ data }) => ({ shift: data?.find((shift) => shift.id === id) }),
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

  return !shift ? (
    <ContentContainer>
      <Alert title={'Смена не\u00A0найдена'} />
    </ContentContainer>
  ) : (
    <>
      <ContentContainer extClassName={styles.shift__headingContainer}>
        <ContentHeading title="Прошедшая смена" extClassName={styles.shift__heading} />
        <Table
          extClassName={styles.shift__headingTable}
          header={['Название смены', 'Дата старта/окончания', 'Кол-во участников']}
          gridClassName={styles.shift__headingTableColumns}
          renderRows={(rowStyles) => (
            <ShiftSettingsRow
              extClassName={rowStyles}
              title={shift.title}
              start={shift.started_at}
              finish={shift.finished_at}
              participants={shift.total_users}
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
