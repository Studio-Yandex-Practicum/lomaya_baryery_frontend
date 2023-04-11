import { useStore } from 'effector-react';
import { membersModel } from 'entities/members';
import { MemberRow } from 'entities/members';
import { MemberLabel } from 'entities/members/ui/label';
import { Table } from 'shared/ui-kit/table';
import styles from './styles.module.css';

interface MembersTableProps {
  extClassName?: string;
}

export function MembersTable({ extClassName }: MembersTableProps) {
  const members = useStore(membersModel.store.$members);

  const header = ['Имя и Фамилия', 'Город', 'Телефон', 'Пройденных смен'];

  return (
    <Table
      extClassName={extClassName}
      header={header}
      gridClassName={styles.columnsTemplate}
      renderRows={(gridClassName) => (
        <div className={[styles.rows, 'custom-scroll'].join(' ')}>
          {members.length > 0 &&
            members.map((member) => (
              <MemberRow
                key={member.id}
                gridClassName={gridClassName}
                routePath={`/members/${member.id}`}
                memberParams={member}
                shifts_number={30}
                label={<MemberLabel memberStatus={member?.status} />}
              />
            ))}
        </div>
      )}
    />
  );
}
