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
import {
  useCreateNewShift,
  useRecruitmentState,
  useShiftsStoreQuery,
} from '../../../services/store';
import styles from './styles.module.css';
import { DateRange } from '../../../ui/date-range';
import { DatePicker } from '../../../ui/date-range/date-picker/date-picker';

export const PageShiftsAll = () => {
  const navigate = useNavigate();
  const createShift = Boolean(useMatch('/shifts/all/create'));

  const { shiftType } = useRecruitmentState();

  const {
    data: shifts,
    rootShifts: { started: startedShift },
  } = useShiftsStoreQuery();

  const { mutateAsync: postNewShift, isLoading: isPostShiftLoading } =
    useCreateNewShift();

  const handleCreateShift = useCallback(() => navigate('create'), [navigate]);

  const handleCloseModal = useCallback(() => navigate(-1), [navigate]);

  const handlePutNewShift = useCallback(
    async (form: IShiftFormData) => {
      try {
        await postNewShift({
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
      <MainPopup
        title="Новая смена"
        opened={createShift}
        onClose={handleCloseModal}
      >
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
