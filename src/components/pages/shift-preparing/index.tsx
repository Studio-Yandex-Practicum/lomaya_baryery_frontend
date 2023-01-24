import { useCallback, useMemo } from 'react';
import cn from 'classnames';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
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
import { Modal } from '../../../ui/modal';
import { ShiftSettingsForm } from '../../shift-settings-form';
import styles from './styles.module.css';

export const PagePreparingShift = () => {
  const navigate = useNavigate();

  const {
    id: preperingID,
    title,
    startedAt,
    finishedAt,
    totalUsers,
  } = useAppSelector(selectRootShifts).preparing;

  const {
    data,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useGetShiftUsersQuery(preperingID ?? skipToken);

  const openShiftSettings = useCallback(() => navigate('settings'), [navigate]);

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
  }, [isUsersLoading, isUsersError, data]);

  const handleCloseModal = useCallback(() => navigate(-1), [navigate]);

  if (preperingID) {
    return (
      <>
        <ContentContainer extClassName={styles.shift__headingContainer}>
          <ContentHeading title="Новая" extClassName={styles.shift__heading} />
          <Table
            extClassName={styles.shift__headingTable}
            header={['Название смены', 'Дата старта/окончания', 'Кол-во участников']}
            gridClassName={styles.shift__headingTableColumns}
            renderRows={(rowStyles) => (
              <ShiftSettingsRow
                extClassName={rowStyles}
                title={title}
                start={startedAt}
                finish={finishedAt}
                onButtonClick={openShiftSettings}
                participants={totalUsers}
              />
            )}
          />
        </ContentContainer>
        <ContentContainer extClassName={styles.shift__participantsContainer}>
          <h2 className={cn(styles.participants, 'text')}>Участники</h2>
          {participantsTable}
        </ContentContainer>
        <Routes>
          <Route
            path="settings"
            element={
              <Modal title="Редактировать смену" close={handleCloseModal}>
                <ShiftSettingsForm shiftStatus="preparing" />
              </Modal>
            }
          />
        </Routes>
      </>
    );
  }

  return <Navigate to="/shifts/all" replace />;
};
