import { useCallback, useMemo } from 'react';
import cn from 'classnames';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ContentContainer } from '../../../ui/content-container';
import { ContentHeading } from '../../../ui/content-heading';
import { Table } from '../../../ui/table-native';
import { ShiftSettingsRow } from '../../shift-settings-row';
import { PreparingShiftRow } from '../../preparing-shift-row';
import { Alert } from '../../../ui/alert';
import { Loader } from '../../../ui/loader';
import { selectRootShifts } from '../../../redux-store/root-shifts';
import { useGetShiftUsersQuery } from '../../../redux-store/api';
import { useAppSelector } from '../../../redux-store/hooks';
import styles from './styles.module.css';

export const PagePreparingShift = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { preparing } = useAppSelector(selectRootShifts);

  const { data, isLoading, isError } = useGetShiftUsersQuery(preparing?.id ?? skipToken);

  const openShiftSettings = useCallback(
    () =>
      navigate('settings', {
        state: {
          background: location.pathname,
        },
      }),
    [navigate, location.pathname]
  );

  const participantsTable = useMemo(() => {
    if (isLoading) {
      return <Loader extClassName={styles.shift__loader} />;
    }

    if (isError || !data) {
      return (
        <Alert extClassName={styles.participants__alert} title={'Что-то пошло не\u00A0 так'} />
      );
    }

    if (data.members.length === 0) {
      return (
        <Alert
          extClassName={styles.participants__alert}
          title={'Нет принятых заявок на\u00A0участие'}
        />
      );
    }

    return (
      <Table
        extClassName={styles.shift__participantsTable}
        gridClassName={styles.participants__tableColumns}
        header={['Имя и фамилия', 'Город', 'Телефон', 'Дата рождения']}
        renderRows={(rowStyles) => (
          <>
            {data.members.map((member) => (
              <PreparingShiftRow key={member.id} extClassName={rowStyles} userData={member.user} />
            ))}
          </>
        )}
      />
    );
  }, [isLoading, isError, data]);

  return !preparing ? (
    <Navigate to="/shifts/all" replace />
  ) : (
    <>
      <ContentContainer extClassName={styles.shift__headingContainer}>
        <ContentHeading title="Новая смена" extClassName={styles.shift__heading} />
        <Table
          extClassName={styles.shift__headingTable}
          header={['Название смены', 'Дата старта/окончания', 'Кол-во участников']}
          gridClassName={styles.shift__headingTableColumns}
          renderRows={(rowStyles) => (
            <ShiftSettingsRow
              extClassName={rowStyles}
              title={preparing.title}
              start={preparing.started_at}
              finish={preparing.finished_at}
              onButtonClick={openShiftSettings}
              participants={preparing.total_users}
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
