import { useEvent, useStore } from 'effector-react';
import { MainPopup } from 'shared/ui-kit/main-popup';
import { Button } from 'shared/ui-kit/button';
import { createTaskModel } from '../..';
import { TaskCreateForm } from 'entities/task/ui/task-create-form';
import styles from './styles.module.css';

export function CreateNewTask() {
  const { isLoading, error } = useStore(createTaskModel.store.$createTaskState);

  const opened = useStore(createTaskModel.store.$opened);

  const { openPopup, closePopup, submitClicker } = useEvent(
    createTaskModel.events
  );

  const handleOpenModal = () => {
    openPopup();
  };

  const handleCloseModal = () => {
    closePopup();
  };

  const handleCreateTask = ({ title, file }: { title: string; file: File }) => {
    submitClicker({
      title,
      file,
    });
  };

  return (
    <>
      <Button htmlType="button" type="primary" onClick={handleOpenModal}>
        Создать задание
      </Button>
      <MainPopup
        title="Создать задание"
        opened={opened}
        onClose={handleCloseModal}
        extClassName={styles.form}
      >
        <TaskCreateForm
          onSubmit={handleCreateTask}
          loading={isLoading}
          submitError={error}
        />
      </MainPopup>
    </>
  );
}
