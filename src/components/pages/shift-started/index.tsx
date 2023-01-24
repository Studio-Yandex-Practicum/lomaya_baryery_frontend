import { useCallback, useMemo } from 'react';
import cn from 'classnames';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { ContentContainer } from '../../../ui/content-container';
import { ContentHeading } from '../../../ui/content-heading';
import { Table } from '../../../ui/table-native';
import { ShiftSettingsRow } from '../../shift-settings-row';
import { Alert } from '../../../ui/alert';
import { Loader } from '../../../ui/loader';
import { selectRootShifts } from '../../../redux-store/root-shifts';
import {
  useFinishShiftMutation,
  useGetShiftUsersQuery,
  useUpdateShiftSettingsMutation,
} from '../../../redux-store/api';
import { useAppSelector } from '../../../redux-store/hooks';
import { Button } from '../../../ui/button';
import { StartedShiftRow } from '../../started-shift-row';
import { ModalAlert } from '../../../ui/modal-alert';
import { Modal } from '../../../ui/modal';
import { MessageForm } from '../../message-form';
import { ShiftSettingsForm } from '../../shift-settings-form';
import styles from './styles.module.css';

export const PageStartedShift = () => {
  const navigate = useNavigate();
  const {
    id: startedShiftID,
    title,
    startedAt,
    finishedAt,
    totalUsers,
    finalMessage,
  } = useAppSelector(selectRootShifts).started;

  const {
    data,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useGetShiftUsersQuery(startedShiftID ?? skipToken);

  const [changeMessage, { isLoading: isLoadingChangeMessage }] = useUpdateShiftSettingsMutation();

  const [setFinishShift, { isLoading: isSetFinishLoading }] = useFinishShiftMutation();

  const openShiftSettings = useCallback(() => navigate('settings'), [navigate]);

  const finishShift = useCallback(() => navigate('finish'), [navigate]);

  const openShiftMessage = useCallback(() => navigate('message'), [navigate]);

  const handleCloseModal = useCallback(() => navigate(-1), [navigate]);

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
        header={['Имя и фамилия', 'Город', 'Дата рождения', 'Статусы заданий']}
        renderRows={(rowStyles) => (
          <>
            {data.members.map((member) => (
              <StartedShiftRow
                key={member.id}
                cellsClassName={rowStyles}
                userData={member.user}
                tasksData={member.reports}
                shiftStart={startedAt}
                shiftFinish={finishedAt}
              />
            ))}
          </>
        )}
      />
    );
  }, [isUsersLoading, isUsersError, data, startedAt, finishedAt]);

  const handleChangeMessage = (message: string) => {
    if (startedShiftID) {
      changeMessage({
        shiftId: startedShiftID,
        title,
        startedAt,
        finishedAt,
        finalMessage: message,
      })
        .unwrap()
        .then(() => navigate('/shifts/started', { replace: true }));
    }
  };

  const handleFinishShift = () => {
    if (startedShiftID) {
      setFinishShift(startedShiftID);
      handleCloseModal();
    }
  };

  if (startedShiftID) {
    return (
      <>
        <ContentContainer extClassName={styles.shift__headingContainer}>
          <ContentHeading title="Текущая" extClassName={styles.shift__heading}>
            <Button
              htmlType="button"
              type="secondary"
              size="small"
              extClassName={styles.shift__messageButton}
              onClick={openShiftMessage}
            >
              Финальное сообщение
            </Button>
            <Button
              htmlType="button"
              type="negative"
              size="small"
              extClassName={styles.shift__finishButton}
              onClick={finishShift}
              loading={isSetFinishLoading}
              disabled={isSetFinishLoading}
            >
              Завершить смену
            </Button>
          </ContentHeading>
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
                <ShiftSettingsForm shiftStatus="started" />
              </Modal>
            }
          />
          <Route
            path="message"
            element={
              <Modal title="Редактировать сообщение" close={handleCloseModal}>
                <MessageForm
                  initValue={finalMessage}
                  btnText="Сохранить"
                  isLoading={isLoadingChangeMessage}
                  onSubmit={handleChangeMessage}
                />
              </Modal>
            }
          />
          <Route
            path="finish"
            element={
              <ModalAlert
                titleText="Вы уверены, что хотите завершить смену?"
                onCloseModal={handleCloseModal}
              >
                <div className={styles.modalAlert__controls}>
                  <Button
                    htmlType="button"
                    size="small"
                    type="primary"
                    onClick={handleCloseModal}
                    extClassName={styles.modalAlert__button}
                  >
                    Отмена
                  </Button>
                  <Button
                    htmlType="button"
                    size="small"
                    type="negative"
                    onClick={handleFinishShift}
                    extClassName={styles.modalAlert__button}
                  >
                    Завершить
                  </Button>
                </div>
              </ModalAlert>
            }
          />
        </Routes>
      </>
    );
  }

  return <Navigate to="/shifts/all" replace />;
};
