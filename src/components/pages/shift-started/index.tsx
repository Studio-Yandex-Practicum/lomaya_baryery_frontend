import { useCallback, useMemo } from 'react';
import cn from 'classnames';
import { Navigate, useNavigate, useMatch } from 'react-router-dom';
import { ContentContainer } from '../../../ui/content-container';
import { ContentHeading } from '../../../ui/content-heading';
import { Table } from '../../../ui/table';
import { Alert } from '../../../ui/alert';
import { Loader } from '../../../ui/loader';
import { ShiftDetailsTable } from '../../shift-details-table';
import { Button } from '../../../ui/button';
import { ParticipantRowWithStat } from '../../participant-row-with-stat';
import { MessageForm } from '../../message-form';
import {
  EditStartedShiftForm,
  IShiftFormData,
} from '../../shift-settings-form';
import { MainPopup } from '../../../ui/main-popup';
import { Dialog } from '../../../ui/dialog';
import {
  useParticipantsStoreQuery,
  useShiftsStore,
} from '../../../services/store';
import styles from './styles.module.css';

export const PageStartedShift = () => {
  const navigate = useNavigate();
  const editShiftPopup = Boolean(useMatch('/shifts/started/settings'));
  const editShiftMessagePopup = Boolean(useMatch('/shifts/started/message'));
  const finishShiftDialog = Boolean(useMatch('/shifts/started/finish'));

  const {
    rootShifts: { started: startedShift, preparing: preparingShift },
    shifts,
    update: updateShift,
    finish: setFinishShift,
    isMutating,
  } = useShiftsStore();
  console.log(startedShift);
  const {
    data,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useParticipantsStoreQuery(startedShift?.id, [
    'participants',
    startedShift?.id,
  ]);

  const openShiftSettings = useCallback(() => navigate('settings'), [navigate]);

  const finishShift = useCallback(() => navigate('finish'), [navigate]);

  const openShiftMessage = useCallback(() => navigate('message'), [navigate]);

  const handleCloseModal = useCallback(() => navigate(-1), [navigate]);

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
          title={'Нет принятых заявок на\u00A0участие'}
        />
      );
    }

    if (startedShift) {
      return (
        <Table
          gridClassName={styles.participantsTable}
          header={[
            'Имя и фамилия',
            'Город',
            'Дата рождения',
            'Статусы заданий',
          ]}
          renderRows={(rowStyles) => (
            <>
              {data.members.map((member) => (
                <ParticipantRowWithStat
                  key={member.id}
                  cellsClassName={rowStyles}
                  userData={member.user}
                  tasksData={member.reports}
                  shiftStart={startedShift.started_at}
                  shiftFinish={startedShift.finished_at}
                />
              ))}
            </>
          )}
        />
      );
    }
  }, [isUsersLoading, isUsersError, data, startedShift]);

  const handleEditShift = useCallback(
    async (form: IShiftFormData) => {
      if (startedShift) {
        try {
          updateShift({
            shiftId: startedShift.id,
            title: form.title,
            startedAt: form.start,
            finishedAt: form.finish,
            message: startedShift.final_message,
          });
          handleCloseModal();
        } catch (error) {
          console.error(error);
        }
      }
    },
    [startedShift, updateShift, handleCloseModal],
  );

  const handleChangeMessage = async (message: string) => {
    if (startedShift) {
      try {
        updateShift({
          shiftId: startedShift.id,
          title: startedShift.title,
          startedAt: startedShift.started_at,
          finishedAt: startedShift.finished_at,
          message,
        });

        navigate('/shifts/started', { replace: true });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleFinishShift = () => {
    if (startedShift) {
      setFinishShift(startedShift.id);
    }
  };

  if (!startedShift) {
    return <Navigate to="/shifts/all" replace />;
  }

  return (
    <>
      <ContentContainer extClassName={styles.headingContainer}>
        <ContentHeading title="Текущая" extClassName={styles.heading}>
          <Button
            htmlType="button"
            type="secondary"
            size="small"
            extClassName={styles.heading__msgButton}
            onClick={openShiftMessage}
          >
            Финальное сообщение
          </Button>
          <Button
            htmlType="button"
            type="negative"
            size="small"
            onClick={finishShift}
            loading={isMutating}
            disabled={isMutating}
          >
            Завершить смену
          </Button>
        </ContentHeading>
        <ShiftDetailsTable
          extClassName={styles.shiftTable}
          title={startedShift.title}
          start={startedShift.started_at}
          finish={startedShift.finished_at}
          onButtonClick={openShiftSettings}
          participants={startedShift.total_users}
        />
      </ContentContainer>
      <ContentContainer extClassName={styles.participantsContainer}>
        <h2 className={cn(styles.title, 'text')}>Участники</h2>
        {participantsTable}
      </ContentContainer>

      <MainPopup
        opened={editShiftPopup}
        title="Редактировать смену"
        onClose={handleCloseModal}
      >
        <EditStartedShiftForm
          title={startedShift.title}
          startDate={startedShift.started_at}
          finishDate={startedShift.finished_at}
          preparingStartDate={preparingShift?.started_at}
          onSubmit={handleEditShift}
          loading={isMutating}
          disabled={isMutating}
        />
      </MainPopup>

      <MainPopup
        opened={editShiftMessagePopup}
        title="Редактировать сообщение"
        onClose={handleCloseModal}
      >
        <MessageForm
          initValue={startedShift.final_message}
          btnText="Сохранить"
          isLoading={isMutating}
          onSubmit={handleChangeMessage}
        />
      </MainPopup>

      <Dialog
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
      />
    </>
  );
};
