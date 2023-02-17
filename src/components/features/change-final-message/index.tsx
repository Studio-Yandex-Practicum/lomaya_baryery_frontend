import { useEvent, useStore } from 'effector-react';
import { Button } from '../../../ui/button';
import { MainPopup } from '../../../ui/main-popup';
import { MessageForm } from '../../message-form';
import * as changeMessageModel from './model';

interface ChangeFinalMessageProps {
  extClassName: string;
}

export function ChangeFinalMessage({ extClassName }: ChangeFinalMessageProps) {
  const { initMessage, openedPopup, isLoading } = useStore(
    changeMessageModel.store.changeMessage
  );

  const { openPopup, closePopup, submitClicker } = useEvent(
    changeMessageModel.events
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
