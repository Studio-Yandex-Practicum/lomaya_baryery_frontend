import { useEvent, useStore } from 'effector-react';
import { Button } from 'shared/ui-kit/button';
import { MainPopup } from 'shared/ui-kit/main-popup';
import { ShiftSettingsForm } from 'entities/shift/ui/shft-settings-form';
import { updateStartedShiftModel } from '../..';
import styles from './styles.module.css';

export function UpdateStartedShift() {
  const { isLoading, error } = useStore(
    updateStartedShiftModel.store.$updateStartedShiftState
  );

  const title = useStore(updateStartedShiftModel.store.$shiftTitle);

  const { startDate, finishDate } = useStore(
    updateStartedShiftModel.store.$dateRange
  );

  const filterFinish = useStore(
    updateStartedShiftModel.store.$finishDateFilter
  );

  const opened = useStore(updateStartedShiftModel.$opened);

  const { openPopup, closePopup, submitClicker } = useEvent(
    updateStartedShiftModel.events
  );

  const handleOpenSettings = () => {
    openPopup();
  };

  const handleCloseModal = () => {
    closePopup();
  };

  const handleUpdateShift = ({
    title,
    finish,
  }: {
    title: string;
    finish: string;
  }) => {
    submitClicker({
      title,
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
          filterFinish={filterFinish}
          disabledStart
          disabled={isLoading}
          loading={isLoading}
          submitError={error}
          onSubmit={handleUpdateShift}
        />
      </MainPopup>
    </>
  );
}
