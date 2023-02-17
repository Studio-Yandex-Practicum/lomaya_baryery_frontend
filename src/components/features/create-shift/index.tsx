import { useEvent, useStore } from 'effector-react';
import { CreateNewShiftForm, IShiftFormData } from '../../shift-settings-form';
import { Dialog } from '../../../ui/dialog';
import { MainPopup } from '../../../ui/main-popup';
import { Button } from '../../../ui/button';
import { PlusIcon } from '../../../ui/icons';
import * as createShiftModel from './model';
import { shiftsModel } from '../../../services/models';

export function CreateNewShift() {
  const { isLoading } = useStore(createShiftModel.store.$createShift);
  const opened = useStore(createShiftModel.store.$openModal);

  const { started: startedShift } = useStore(shiftsModel.store.$shifts);

  const recruitmentMessage = useStore(createShiftModel.store.$recruitmentShift);

  const { openPopup, closePopup, submitClicker } = useEvent(
    createShiftModel.events
  );

  const handleOpenModal = () => {
    openPopup();
  };

  const handleCloseModal = () => {
    closePopup();
  };

  const handlePutNewShift = async (form: IShiftFormData) => {
    submitClicker({
      title: form.title,
      startedAt: form.start,
      finishedAt: form.finish,
    });
  };

  const modal = () => {
    if (recruitmentMessage) {
      return (
        <Dialog
          onClose={handleCloseModal}
          opened={opened}
          text={recruitmentMessage}
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
        <CreateNewShiftForm
          startedFinishDate={startedShift?.finished_at}
          onSubmit={handlePutNewShift}
          loading={isLoading}
          disabled={isLoading}
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
