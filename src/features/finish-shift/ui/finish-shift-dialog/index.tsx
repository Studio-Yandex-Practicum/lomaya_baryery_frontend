import { useEvent, useStore } from 'effector-react';
import { Button } from 'shared/ui-kit/button';
import { Dialog } from 'shared/ui-kit/dialog';
import { finishShiftModel } from '../..';

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
