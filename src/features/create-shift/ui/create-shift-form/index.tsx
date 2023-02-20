import { useEvent, useStore } from 'effector-react';
import { Dialog } from '../../../../shared/ui-kit/dialog';
import { MainPopup } from '../../../../shared/ui-kit/main-popup';
import { Button } from '../../../../shared/ui-kit/button';
import { PlusIcon } from '../../../../shared/ui-kit/icons';
import { ShiftSettingsForm } from '../../../../entities/shift/ui/shft-settings-form';
import { createShiftModel } from '../..';

export function CreateNewShift() {
  const { isLoading } = useStore(createShiftModel.store.$createShiftState);

  const opened = useStore(createShiftModel.store.$opened);

  const dialogText = useStore(createShiftModel.store.$dialogText);

  const { startDate, finishDate } = useStore(createShiftModel.$dateRange);

  const filterStartDate = useStore(createShiftModel.$startDateFilter);

  const { openPopup, closePopup, submitClicker } = useEvent(
    createShiftModel.events
  );

  const handleOpenModal = () => {
    openPopup();
  };

  const handleCloseModal = () => {
    closePopup();
  };

  const handleCreateShift = async ({
    title,
    start,
    finish,
  }: {
    title: string;
    start: string;
    finish: string;
  }) => {
    submitClicker({
      title,
      startedAt: start,
      finishedAt: finish,
    });
  };

  const modal = () => {
    if (dialogText !== null) {
      return (
        <Dialog
          onClose={handleCloseModal}
          opened={opened}
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
      <MainPopup title="Новая смена" opened={opened} onClose={handleCloseModal}>
        <ShiftSettingsForm
          startDate={startDate}
          finishDate={finishDate}
          filterStart={filterStartDate}
          disabled={isLoading}
          loading={isLoading}
          onSubmit={handleCreateShift}
          buttonContent="Создать"
        />
      </MainPopup>
    );
  };

  return (
    <>
      <Button htmlType="button" type="primary" onClick={handleOpenModal}>
        <PlusIcon type="interface-white" />
        Создать смену
      </Button>
      {modal()}
    </>
  );
}
