import React from 'react';
import cn from 'classnames';
import styles from './styles.module.css';

export interface ICellTasksStatProps {
  data: {
    approved: number;
    declined: number;
    reviewing: number;
  };
  extClassName?: string;
}

export const CellTasksStat: React.FC<ICellTasksStatProps> = ({
  data,
  extClassName,
}) => (
  <p
    className={cn(
      'text text_type_main-default m-0',
      extClassName,
      styles.cellStat
    )}
  >
    {`Выполнено – ${data.approved}
        Не прошли проверку – ${data.declined}
        Ожидают проверку – ${data.reviewing}`}
  </p>
);
