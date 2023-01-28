import { useCallback, useMemo } from 'react';
import cn from 'classnames';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { ContentContainer } from '../../../ui/content-container';
import { ContentHeading } from '../../../ui/content-heading';
import { Table } from '../../../ui/table';
import { ParticipantRow } from '../../participant-row';
import { Alert } from '../../../ui/alert';
import { Loader } from '../../../ui/loader';
import { selectRootShifts } from '../../../redux-store/root-shifts';
import { useGetShiftUsersQuery, useUpdateShiftSettingsMutation } from '../../../redux-store/api';
import { useAppSelector } from '../../../redux-store/hooks';
import { Modal } from '../../../ui/modal';
import { EditPreparingShiftForm, IShiftFormData } from '../../shift-settings-form';
import { ShiftDetailsTable } from '../../shift-details-table';
import styles from './styles.module.css';

export const PagePreparingShift = () => {
  const navigate = useNavigate();

  const { preparing: preparingShift, started: startedShift } = useAppSelector(selectRootShifts);

  const {
    data,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useGetShiftUsersQuery(preparingShift?.id ?? skipToken);

  const [updateShift, { isLoading: isUpdateLoading }] = useUpdateShiftSettingsMutation();

  const openShiftSettings = useCallback(() => navigate('settings'), [navigate]);

  const participants = useMemo(() => {
    if (isUsersLoading) {
      return <Loader extClassName={styles.participants__notice} />;
    }

    if (isUsersError || !data) {
      return (
        <Alert extClassName={styles.participants__notice} title={'Что-то пошло не\u00A0так'} />
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

    return (
      <Table
        gridClassName={styles.participantsTable}
        header={['Имя и фамилия', 'Город', 'Телефон', 'Дата рождения']}
        renderRows={(rowStyles) => (
          <>
            {data.members.map((member) => (
              <ParticipantRow key={member.id} extClassName={rowStyles} userData={member.user} />
            ))}
          </>
        )}
      />
    );
  }, [isUsersLoading, isUsersError, data]);

  const handleCloseModal = useCallback(() => navigate(-1), [navigate]);

  const handleEditShift = useCallback(
    async (form: IShiftFormData) => {
      if (preparingShift) {
        const data = {
          shift_id: preparingShift.id,
          title: form.title,
          started_at: form.start,
          finished_at: form.finish,
          final_message: preparingShift.final_message,
        };

        try {
          await updateShift(data).unwrap();
          handleCloseModal();
        } catch (error) {
          console.error(error);
        }
      }
    },
    [preparingShift, updateShift, handleCloseModal]
  );

  if (preparingShift === null) {
    return <Navigate to="/shifts/all" replace />;
  }

  return (
    <>
      <ContentContainer extClassName={styles.headingContainer}>
        <ContentHeading title="Новая" extClassName={styles.heading} />
        <ShiftDetailsTable
          extClassName={styles.shiftTable}
          title={preparingShift.title}
          start={preparingShift.started_at}
          finish={preparingShift.finished_at}
          onButtonClick={openShiftSettings}
          participants={preparingShift.total_users}
        />
      </ContentContainer>
      <ContentContainer extClassName={styles.participantsContainer}>
        <h2 className={cn(styles.title, 'text')}>Участники</h2>
        {participants}
      </ContentContainer>
      <Routes>
        <Route
          path="settings"
          element={
            <Modal title="Редактировать смену" close={handleCloseModal}>
              <EditPreparingShiftForm
                title={preparingShift.title}
                startDate={preparingShift.started_at}
                finishDate={preparingShift.finished_at}
                startedFinishDate={startedShift?.finished_at}
                disabled={isUpdateLoading}
                loading={isUpdateLoading}
                onSubmit={handleEditShift}
              />
            </Modal>
          }
        />
      </Routes>
    </>
  );
};
