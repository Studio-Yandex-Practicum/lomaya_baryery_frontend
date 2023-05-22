import { useStore } from 'effector-react';
import { membersModel } from 'entities/members';
import { MemberRow } from 'entities/members';
import { Table } from 'shared/ui-kit/table';
import { useMemo } from 'react';
import styles from './styles.module.css';

interface MembersTableProps {
  extClassName?: string;
  counterMembers: {
    firstTableMember: number;
    lastTableMember: number;
    pageNumber: number;
  };
}

export function MembersTable({
  extClassName,
  counterMembers,
}: MembersTableProps) {
  const members = useStore(membersModel.store.$members);
  const filteredMembers = useStore(membersModel.store.$membersStore);
  const header = ['Имя и Фамилия', 'Город', 'Телефон', 'Пройденных смен'];
  const displayedMembers = useMemo(
    () =>
      filteredMembers &&
      filteredMembers.slice(
        counterMembers.firstTableMember,
        counterMembers.lastTableMember
      ),
    [filteredMembers, counterMembers]
  );

  return (
    <Table
      extClassName={extClassName}
      header={header}
      gridClassName={styles.columnsTemplate}
      renderRows={(gridClassName) => (
        <div className={[styles.rows, 'custom-scroll'].join(' ')}>
          {members.length > 0 &&
            displayedMembers &&
            displayedMembers.map((member) => (
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
