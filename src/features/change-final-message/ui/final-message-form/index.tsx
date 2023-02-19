import { useEvent, useStore } from 'effector-react';
import { changeFinalMessageModel } from '../..';
import { Button } from '../../../../shared/ui-kit/button';
import { MainPopup } from '../../../../shared/ui-kit/main-popup';
import { MessageForm } from '../../../../shared/ui/message-form';

interface FinalMessageFormProps {
  extClassName: string;
}

export function FinalMessageForm({ extClassName }: FinalMessageFormProps) {
  const { initMessage, openedPopup, isLoading } = useStore(
    changeFinalMessageModel.store.changeMessage
  );

  const { openPopup, closePopup, submitClicker } = useEvent(
    changeFinalMessageModel.events
  );

  const handleOpenPopup = () => {
    openPopup();
  };
  const handleClosePopup = () => {
    closePopup();
  };

  const handleChangeMessage = async (message: string) => {
    submitClicker(message);
  };

  return (
    <>
      <Button
        htmlType="button"
        type="secondary"
        size="small"
        extClassName={extClassName}
        onClick={handleOpenPopup}
      >
        Финальное сообщение
      </Button>
      <MainPopup
        opened={openedPopup}
        title="Редактировать сообщение"
        onClose={handleClosePopup}
      >
        <MessageForm
          initValue={initMessage}
          btnText="Сохранить"
          isLoading={isLoading}
          onSubmit={handleChangeMessage}
        />
      </MainPopup>
    </>
  );
}
