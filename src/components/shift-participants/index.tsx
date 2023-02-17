import React from 'react';
import { Table } from '../../ui/table';
import styles from './styles.module.css';

interface ShiftParticipantsProps {
  renderRows: React.ReactNode;
}

export function ShiftParticipants({ renderRows }: ShiftParticipantsProps) {
  return (
    <Table
      gridClassName={styles.participantsTable}
      header={['Имя и фамилия', 'Город', 'Дата рождения', 'Статусы заданий']}
      renderRows={() => renderRows}
    />
  );
}
