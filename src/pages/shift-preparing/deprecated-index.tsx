import { useCallback, useMemo } from 'react';
import cn from 'classnames';
import { Navigate, useMatch, useNavigate } from 'react-router-dom';
import { ContentContainer } from '../../shared/ui-kit/content-container';
import { ContentHeading } from '../../shared/ui-kit/content-heading';
import { Table } from '../../shared/ui-kit/table';
import { ParticipantRow } from '../../shift-participants/participant-row';
import { Alert } from '../../shared/ui-kit/alert';
import { Loader } from '../../shared/ui-kit/loader';
import {
  EditPreparingShiftForm,
  IShiftFormData,
} from '../../shift-settings-form';
import { ShiftDetailsTable } from '../../shared/shift-details-table';
import styles from './styles.module.css';
import { MainPopup } from '../../shared/ui-kit/main-popup';
import {
  useParticipantsStoreQuery,
  useShiftsStoreQuery,
  useUpdateShift,
} from '../../../deprecated-services/deprecated-store';

export const PagePreparingShift = () => {
  const navigate = useNavigate();
  const editShift = Boolean(useMatch('/shifts/preparing/settings'));

  const {
    rootShifts: { preparing: preparingShift, started: startedShift },
  } = useShiftsStoreQuery();

  const {
    data,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useParticipantsStoreQuery(preparingShift?.id, [
    'participants',
    preparingShift?.id,
  ]);

  const { mutateAsync: updateShift, isLoading: isUpdateLoading } =
    useUpdateShift(preparingShift?.id);

  const openShiftSettings = useCallback(() => navigate('settings'), [navigate]);

  const participants = useMemo(() => {
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

    return (
      <Table
        gridClassName={styles.participantsTable}
        header={['Имя и фамилия', 'Город', 'Телефон', 'Дата рождения']}
        renderRows={(rowStyles) => (
          <>
            {data.members.map((member) => (
              <ParticipantRow
                key={member.id}
                extClassName={rowStyles}
                userData={member.user}
              />
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
        try {
          await updateShift({
            shiftId: preparingShift.id,
            title: form.title,
            startedAt: form.start,
            finishedAt: form.finish,
            message: preparingShift.final_message,
          });

          handleCloseModal();
        } catch (error) {
          console.error(error);
        }
      }
    },
    [preparingShift, updateShift, handleCloseModal]
  );

  if (!preparingShift) {
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

      <MainPopup
        opened={editShift}
        title="Редактировать смену"
        onClose={handleCloseModal}
      >
        <EditPreparingShiftForm
          title={preparingShift.title}
          startDate={preparingShift.started_at}
          finishDate={preparingShift.finished_at}
          startedFinishDate={startedShift?.finished_at}
          disabled={isUpdateLoading}
          loading={isUpdateLoading}
          onSubmit={handleEditShift}
        />
      </MainPopup>
    </>
  );
};
