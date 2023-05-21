import { useStore } from 'effector-react';
import { membersModel } from 'entities/members';
import { MemberRow } from 'entities/members';
import { Table } from 'shared/ui-kit/table';
import styles from './styles.module.css';
interface MembersTableProps {
  extClassName?: string;
  counterMembers: number[];
}

export function MembersTable({ extClassName, counterMembers }: MembersTableProps) {
  const members = useStore(membersModel.store.$members);
  const filteredMembers = useStore(membersModel.store.$membersStore);
  const header = ['Имя и Фамилия', 'Город', 'Телефон', 'Пройденных смен'];

  return (
    <Table
      extClassName={extClassName}
      header={header}
      gridClassName={styles.columnsTemplate}
      renderRows={(gridClassName) => (
        <div className={[styles.rows, 'custom-scroll'].join(' ')}>
          {members.length > 0 &&
            filteredMembers?.slice(counterMembers[0], counterMembers[1]).map((member) => (
              <MemberRow
                key={member.id}
                gridClassName={gridClassName}
                routePath={`/members/${member.id}`}
                memberParams={member}
              />
            ))}
        </div>
      )}
    />
  );
}
