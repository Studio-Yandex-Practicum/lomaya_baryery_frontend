import { useCallback, useMemo } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Button } from '../../../ui/button';
import { PlusIcon } from '../../../ui/icons';
import { ContentHeading } from '../../../ui/content-heading';
import { useCreateNewShiftMutation, useGetAllShiftsQuery } from '../../../redux-store/api';
import { ContentContainer } from '../../../ui/content-container';
import { Modal } from '../../../ui/modal';
import { useAppSelector } from '../../../redux-store/hooks';
import { selectRootShifts, selectShiftForRequests } from '../../../redux-store/root-shifts';
import { ModalAlert } from '../../../ui/modal-alert';
import { CreateNewShiftForm, IShiftFormData } from '../../create-new-shift';
import { ShiftsTable } from '../../shifts-table';
import styles from './styles.module.css';

export const PageShiftsAll = () => {
  const navigate = useNavigate();
  const { data: shifts } = useGetAllShiftsQuery();
  const [postNewShift, { isLoading: isPostShiftLoading }] = useCreateNewShiftMutation();
  const { started: startedShift } = useAppSelector(selectRootShifts);
  const { shiftType } = useAppSelector(selectShiftForRequests);

  const handleCreateShift = useCallback(() => navigate('create'), [navigate]);

  const handleCloseModal = useCallback(() => navigate(-1), [navigate]);

  const handlePutNewShift = useCallback(
    async (form: IShiftFormData) => {
      const data = {
        title: form.title,
        started_at: form.start,
        finished_at: form.finish,
      };

      try {
        await postNewShift(data).unwrap();
        handleCloseModal();
      } catch (error) {
        console.error(error);
      }
    },
    [postNewShift, handleCloseModal]
  );

  const modal = useMemo(() => {
    if (shiftType === 'preparing') {
      return (
        <ModalAlert onCloseModal={handleCloseModal} titleText="Новая смена уже создана">
          <Button
            extClassName={styles.modalAlert__button}
            htmlType="button"
            onClick={handleCloseModal}
          >
            Понятно
          </Button>
        </ModalAlert>
      );
    }

    if (shiftType === 'started') {
      return (
        <ModalAlert
          onCloseModal={handleCloseModal}
          titleText="Новую смену можно создать через 2 дня после старта текущей"
        >
          <Button
            extClassName={styles.modalAlert__button}
            htmlType="button"
            onClick={handleCloseModal}
          >
            Понятно
          </Button>
        </ModalAlert>
      );
    }

    return (
      <Modal title="Новая смена" close={handleCloseModal}>
        <CreateNewShiftForm
          startedFinishDate={startedShift?.finished_at}
          onSubmit={handlePutNewShift}
          loading={isPostShiftLoading}
          disabled={isPostShiftLoading}
        />
      </Modal>
    );
  }, [shiftType, isPostShiftLoading, handleCloseModal, handlePutNewShift]);

  return (
    <>
      <ContentContainer extClassName={styles.content}>
        <ContentHeading title="Смены">
          <Button htmlType="button" type="primary" onClick={handleCreateShift}>
            <PlusIcon type="interface-white" />
            Создать смену
          </Button>
        </ContentHeading>
        <ShiftsTable extClassName={styles.shiftsTable} shifts={shifts} />
      </ContentContainer>
      <Routes>
        <Route path="create" element={modal} />
      </Routes>
    </>
  );
};
