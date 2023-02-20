import cn from 'classnames';
import { useEvent, useStore } from 'effector-react';
import { requestReviewModel } from 'features/request-reviewing';
import { RequestStatus } from 'shared/api';
import { Button } from 'shared/ui-kit/button';
import { MainPopup } from 'shared/ui-kit/main-popup';
import { MessageForm } from 'shared/ui-kit/message-form';
import styles from './styles.module.css';

interface RowControlsProps {
  requestId: string;
  requestStatus: RequestStatus;
  extClassName?: string;
}

export function RowControls({
  requestId,
  requestStatus,
  extClassName,
}: RowControlsProps) {
  const { approve, openPopup, closePopup, decline } = useEvent(
    requestReviewModel.events
  );

  const opened = useStore(requestReviewModel.store.$opened);

  const isApproveLoading = useStore(requestReviewModel.store.$isApproveLoading);
  const isDeclineLoading = useStore(requestReviewModel.store.$isDeclineLoading);

  const handleApprove = () => {
    approve(requestId);
  };

  const handleOpenPopup = () => {
    openPopup();
  };

  const handleClosePopup = () => {
    closePopup();
  };

  const handleSubmit = (message: string) => {
    decline({ requestId, message });
  };

  if (requestStatus !== 'pending') {
    return null;
  }

  return (
    <>
      <div className={cn(styles.container, extClassName)}>
        <Button
          size="small"
          type="primary"
          htmlType="button"
          onClick={handleApprove}
          loading={isApproveLoading}
          disabled={isApproveLoading}
          extClassName={cn(styles.button, styles.button_type_approve)}
        >
          Принять
        </Button>
        <Button
          size="small"
          type="primary"
          htmlType="button"
          onClick={handleOpenPopup}
          extClassName={styles.button}
        >
          Отклонить
        </Button>
      </div>
      <MainPopup
        title="Отклонить заявку"
        opened={opened}
        onClose={handleClosePopup}
      >
        <MessageForm
          isLoading={isDeclineLoading}
          isDisabled={isDeclineLoading}
          btnText="Отклонить"
          onSubmit={handleSubmit}
        />
      </MainPopup>
    </>
  );
}
