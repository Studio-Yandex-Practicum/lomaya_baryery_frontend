import cn from 'classnames';
import { useStore } from 'effector-react';
import { invitationModel, InvitationRow } from 'entities/invitation';
import { Loader } from 'shared/ui-kit/loader';
import { Table } from 'shared/ui-kit/table';
import { RowControls } from 'features/invite-admin/ui/row-controls';
import styles from './styles.module.css';

interface InvitationsTableProps {
  extClassName?: string;
}

export function InvitationsTable({ extClassName }: InvitationsTableProps) {
  const { data, isLoading } = useStore(invitationModel.$invitationsState);

  const header = ['Фамилия и имя', 'E-mail', ''];

  return (
    <Table
      header={header}
      extClassName={cn(styles.table, extClassName)}
      gridClassName={styles.columns}
      renderRows={(gridClassName) => (
        <div className={[styles.rows, 'custom-scroll'].join(' ')}>
          {data
            .sort((itemA, itemB) => itemA.email.localeCompare(itemB.email))
            .map((invitation) => (
              <InvitationRow
                key={invitation.expired_datetime}
                gridClassName={gridClassName}
                extClassName={styles.row}
                data={invitation}
                feature={
                  <>
                    <RowControls data={invitation} />
                  </>
                }
              />
            ))}
          {isLoading && <Loader extClassName={styles.loader} />}
        </div>
      )}
    />
  );
}
