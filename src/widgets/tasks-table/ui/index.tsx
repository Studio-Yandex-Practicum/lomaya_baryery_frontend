import { useStore } from 'effector-react';
import cn from 'classnames';
import { tasksModel } from 'entities/task';
import { URL } from 'shared/config';
import { CellLink, CellThumbnail } from 'shared/ui-kit/table';
import { CellText } from 'shared/ui-kit/table';
import { Table } from 'shared/ui-kit/table';
import styles from './styles.module.css';

interface TasksTableProps {
  extClassName?: string;
}

export function TasksTable({ extClassName }: TasksTableProps) {
  const tasks = useStore(tasksModel.tasksStore.$tasksRaw);
  const filteredTasks = useStore(tasksModel.tasksStore.$tasksStore);

  if (tasks.length === 0) {
    return null;
  }

  const header = ['Номер задания', 'Название задания', 'Превью'];

  const tableContent = (gridClassName: string) => {
    return (
      <div className={[styles.rows, 'custom-scroll'].join(' ')}>
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={cn(styles.row, gridClassName, 'tableContentRow')}
          >
            <CellText text={task.sequence_number} />
            <CellLink
              extClassName={styles.taskTitle}
              text={task.title}
              routeTo={`/tasks/${task.id}`}
            />
            <CellThumbnail
              img={`${URL}${task.url}`}
              routeTo={`/tasks/${task.id}`}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <Table
      header={header}
      extClassName={extClassName}
      gridClassName={styles.columnsTemplate}
      renderRows={(gridClassName) => tableContent(gridClassName)}
    />
  );
}
