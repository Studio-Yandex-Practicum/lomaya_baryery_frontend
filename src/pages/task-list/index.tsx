import { useEffect, ChangeEvent } from 'react';
import { useStore, useEvent } from 'effector-react';
import { tasksModel } from 'entities/task';
import { ITask } from 'shared/api';
import { ContentHeading } from 'shared/ui-kit/content-heading';
import { ContentContainer } from 'shared/ui-kit/content-container';
import { TasksTable } from 'widgets/tasks-table';
import { CreateNewTask } from 'features/create-task/ui/create-task-form';
import { Loader } from 'shared/ui-kit/loader';
import { Alert } from 'shared/ui-kit/alert';
import { SearchIcon } from 'shared/ui-kit/icons';
import { mount, unmount } from './model';
import styles from './styles.module.css';

interface GuardProps {
  data: ITask[];
  isLoading: boolean;
  error: string | null;
}

function Guard({ data, isLoading, error }: GuardProps) {
  if (isLoading && data.length === 0) {
    return <Loader extClassName={styles.loader} />;
  }

  if (error) {
    return <Alert extClassName={styles.alert} title={error} />;
  }

  if (data.length === 0) {
    return <Alert extClassName={styles.alert} title="Задач нет" />;
  }

  return null;
}

export function PageTasksList() {
  const { data, isLoading, error, search } = useStore(tasksModel.$tasksState);

  const handleSearch = useEvent(tasksModel.searchChanged);
  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleSearch(event.target.value);
  };

  useEffect(() => {
    mount();
    return () => {
      unmount();
    };
  }, []);
  return (
    <>
      <ContentContainer extClassName={styles.content}>
        <div className={styles.header}>
          <ContentHeading title="Задания" />
          <div className={styles.search}>
            <SearchIcon color="gray" />
            <input
              className={styles.text}
              type="text"
              value={search}
              placeholder="Поиск"
              onChange={onSearchChange}
            />
          </div>
          <CreateNewTask />
        </div>
        <Guard data={data} error={error} isLoading={isLoading} />
        <TasksTable extClassName={styles.table} />
      </ContentContainer>
    </>
  );
}
