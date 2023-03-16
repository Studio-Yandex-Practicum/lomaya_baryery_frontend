import { useEvent, useStore } from 'effector-react';
import { Button } from 'shared/ui-kit/button';
import { MainPopup } from 'shared/ui-kit/main-popup';
import { ShiftSettingsForm } from 'entities/shift/ui/shft-settings-form';
import { updatePreparingShiftModel } from '../..';
import styles from './styles.module.css';

export function UpdatePreparingShift() {
  const { isLoading, error } = useStore(
    updatePreparingShiftModel.store.$updatePreparingShiftState
  );

  const title = useStore(updatePreparingShiftModel.store.$shiftTitle);

  const { startDate, finishDate } = useStore(
    updatePreparingShiftModel.store.$dateRange
  );

  const filterStart = useStore(
    updatePreparingShiftModel.store.$startDateFilter
  );

  const opened = useStore(updatePreparingShiftModel.$opened);

  const { openPopup, closePopup, submitClicker } = useEvent(
    updatePreparingShiftModel.events
  );

  const handleOpenSettings = () => {
    openPopup();
  };

  const handleCloseModal = () => {
    closePopup();
  };

  const handleUpdateShift = ({
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
      startDate: start,
      finishDate: finish,
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
        <ShiftSettingsForm
          title={title}
          startDate={startDate}
          finishDate={finishDate}
          filterStart={filterStart}
          disabled={isLoading}
          loading={isLoading}
          submitError={error}
          onSubmit={handleUpdateShift}
        />
      </MainPopup>
    </>
  );
}
