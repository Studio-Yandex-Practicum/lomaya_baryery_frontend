import { useEvent, useStore } from 'effector-react';
import { finishShiftModel } from '../..';
import { Button } from '../../../../../ui/button';
import { Dialog } from '../../../../../ui/dialog';

export function FinishShiftDialog() {
  const { dialogText, isLoading } = useStore(
    finishShiftModel.store.$finishMessageState
  );
  const opened = useStore(finishShiftModel.store.$opened);
  const { submitClicker, openPopup, closePopup } = useEvent(
    finishShiftModel.events
  );

  const handleOpenPopup = () => {
    openPopup();
  };

  const handleClosePopup = () => {
    closePopup();
  };

  const handleSubmit = () => {
    submitClicker();
  };

  return (
    <>
      <Button
        htmlType="button"
        type="negative"
        size="small"
        onClick={handleOpenPopup}
        loading={isLoading}
        disabled={isLoading}
      >
        Завершить смену
      </Button>

      <Dialog
        opened={opened}
        title="Завершение смены"
        text={dialogText}
        onClose={handleClosePopup}
        primaryButton={
          <Button
            htmlType="button"
            size="small"
            type="primary"
            onClick={handleClosePopup}
          >
            Отмена
          </Button>
        }
        secondaryButton={
          <Button
            htmlType="button"
            size="small"
            type="negative"
            onClick={handleSubmit}
          >
            Завершить
          </Button>
        }
      />
    </>
  );
}
