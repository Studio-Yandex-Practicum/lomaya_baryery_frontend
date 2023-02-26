import cn from 'classnames';
import { useStore } from 'effector-react';
import { adminModel, AdminRow } from 'entities/admin';
import { Loader } from 'shared/ui-kit/loader';
import { Table } from 'shared/ui-kit/table';
import styles from './styles.module.css';

interface AdminsTableProps {
  extClassName?: string;
}

export function AdminListTable({ extClassName }: AdminsTableProps) {
  const { data, isLoading } = useStore(adminModel.$adminsState);

  const header = ['Фамилия и имя', 'E-mail', 'Роль', 'Статус', ''];

  return (
    <Table
      header={header}
      extClassName={cn(styles.table, extClassName)}
      gridClassName={styles.columns}
      renderRows={(gridClassName) => (
        <div className={[styles.rows, 'custom-scroll'].join(' ')}>
          {data.map((member) => (
            <AdminRow
              key={member.id}
              gridClassName={gridClassName}
              extClassName={styles.row}
              data={member}
            />
          ))}
          {isLoading && <Loader extClassName={styles.loader} />}
        </div>
      )}
    />
  );
}
