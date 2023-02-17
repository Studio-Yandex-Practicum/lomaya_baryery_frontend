import { useEvent, useStore } from 'effector-react';
import { shiftsModel } from '../../../services/models';
import { Button } from '../../../ui/button';
import { MainPopup } from '../../../ui/main-popup';
import {
  EditStartedShiftForm,
  IShiftFormData,
} from '../../shift-settings-form';
import * as updateStartedShiftModel from './model';
import styles from './styles.module.css';

export function UpdateStartedShift() {
  const { started: startedShift, preparing: preparingShift } = useStore(
    shiftsModel.store.$shifts
  );
  const { isLoading } = useStore(
    updateStartedShiftModel.store.$updateStartedShift
  );
  const opened = useStore(updateStartedShiftModel.store.$openModal);

  const { openPopup, closePopup, submitClicker } = useEvent(
    updateStartedShiftModel.events
  );

  if (!startedShift) {
    return null;
  }

  const handleOpenSettings = () => {
    openPopup();
  };

  const handleCloseModal = () => {
    closePopup();
  };

  const handleUpdateShift = ({ title, start, finish }: IShiftFormData) => {
    submitClicker({
      title,
      startedAt: start,
      finishedAt: finish,
      message: startedShift.final_message,
      shiftId: startedShift.id,
    });
  };

  return (
    <>
      <Button
        extClassName={styles.button}
        htmlType="button"
        type="secondary"
        size="small"
        onClick={handleOpenSettings}
      >
        Изменить
      </Button>
      <MainPopup
        opened={opened}
        title="Редактировать смену"
        onClose={handleCloseModal}
      >
        <EditStartedShiftForm
          title={startedShift.title}
          startDate={startedShift.started_at}
          finishDate={startedShift.finished_at}
          preparingStartDate={preparingShift?.started_at}
          onSubmit={handleUpdateShift}
          loading={isLoading}
          disabled={isLoading}
        />
      </MainPopup>
    </>
  );
}
