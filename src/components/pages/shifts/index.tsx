import { useCallback, useMemo } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { Button } from '../../../ui/button';
import { PlusIcon } from '../../../ui/icons';
import { ContentHeading } from '../../../ui/content-heading';
import { ContentContainer } from '../../../ui/content-container';
import { CreateNewShiftForm, IShiftFormData } from '../../shift-settings-form';
import { ShiftsTable } from '../../shifts-table';
import { Dialog } from '../../../ui/dialog';
import { MainPopup } from '../../../ui/main-popup';
import { useShiftsStore } from '../../../services/store';
import styles from './styles.module.css';

export const PageShiftsAll = () => {
  const navigate = useNavigate();
  const createShift = Boolean(useMatch('/shifts/all/create'));

  const {
    shifts,
    rootShifts: { started: startedShift },
    recruitment: { shiftType: isRecruitment },
    createShift: postNewShift,
    isMutating,
  } = useShiftsStore();

  const handleCreateShift = useCallback(() => navigate('create'), [navigate]);

  const handleCloseModal = useCallback(() => navigate(-1), [navigate]);

  const handlePutNewShift = useCallback(
    async (form: IShiftFormData) => {
      try {
        postNewShift({
          title: form.title,
          startedAt: form.start,
          finishedAt: form.finish,
        });
        handleCloseModal();
      } catch (error) {
        console.error(error);
      }
    },
    [postNewShift, handleCloseModal],
  );

  const modal = useMemo(() => {
    const dialogText =
      isRecruitment === 'preparing'
        ? 'Смена уже создана. Вы сможете создать новую через 2 дня после старта ранее созданной.'
        : 'В текущую смену идёт набор участников. Новую смену можно создать через 2 дня после старта.';

    if (!isRecruitment) {
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
      <MainPopup
        title="Новая смена"
        opened={createShift}
        onClose={handleCloseModal}
      >
        <CreateNewShiftForm
          startedFinishDate={startedShift?.finished_at}
          onSubmit={handlePutNewShift}
          loading={isMutating}
          disabled={isMutating}
        />
      </MainPopup>
    );
  }, [
    createShift,
    isRecruitment,
    isMutating,
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
