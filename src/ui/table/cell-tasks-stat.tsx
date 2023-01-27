import React from 'react';
import cn from 'classnames';
import { IUserTask } from '../../redux-store/api/models';
import styles from './cell-tasks-stat.module.css';

export interface ICellTasksStatProps {
  data: Record<IUserTask['status'], number>;
  extClassName?: string;
}

export const CellTasksStat: React.FC<ICellTasksStatProps> = ({ data, extClassName }) => (
  <p className={cn('text text_type_main-default m-0', extClassName, styles.cellStat)}>
    {`Выполнено – ${data.approved}
        Не прошли проверку – ${data.declined}
        Ожидают проверку – ${data.under_review}`}
  </p>
);
