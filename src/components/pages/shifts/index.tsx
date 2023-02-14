import { useCallback, useMemo } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { Button } from '../../../ui/button';
import { PlusIcon } from '../../../ui/icons';
import { ContentHeading } from '../../../ui/content-heading';
import { useCreateNewShiftMutation, useGetAllShiftsQuery } from '../../../redux-store/api';
import { ContentContainer } from '../../../ui/content-container';
import { useAppSelector } from '../../../redux-store/hooks';
import { selectRootShifts, selectShiftForRequests } from '../../../redux-store/root-shifts';
import { CreateNewShiftForm, IShiftFormData } from '../../shift-settings-form';
import { ShiftsTable } from '../../shifts-table';
import { Dialog } from '../../../ui/dialog';
import { MainPopup } from '../../../ui/main-popup';
import styles from './styles.module.css';

export const PageShiftsAll = () => {
  const navigate = useNavigate();
  const createShift = Boolean(useMatch('/shifts/all/create'));
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
    const dialogText =
      shiftType === 'preparing'
        ? 'Смена уже создана. Вы сможете создать новую через 2 дня после старта ранее созданной.'
        : 'В текущую смену идёт набор участников. Новую смену можно создать через 2 дня после старта.';

    if (shiftType) {
      return (
        <Dialog
          onClose={handleCloseModal}
          opened={createShift}
          text={dialogText}
          primaryButton={
            <Button size="small" htmlType="button" onClick={handleCloseModal}>
              Понятно
            </Button>
          }
        />
      );
    }

    return (
      <MainPopup title="Новая смена" opened={createShift} onClose={handleCloseModal}>
        <CreateNewShiftForm
          startedFinishDate={startedShift?.finished_at}
          onSubmit={handlePutNewShift}
          loading={isPostShiftLoading}
          disabled={isPostShiftLoading}
        />
      </MainPopup>
    );
  }, [
    createShift,
    shiftType,
    isPostShiftLoading,
    handleCloseModal,
    handlePutNewShift,
    startedShift?.finished_at,
  ]);

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
      {modal}
    </>
  );
};
