import React from 'react';
import cn from 'classnames';
import styles from './styles.module.css';

interface RowProps extends React.PropsWithChildren {
  gridClassName: string;
  extClassName?: string;
}

export function RowLow({ gridClassName, extClassName, children }: RowProps) {
  return (
    <div
      className={cn(styles.row, extClassName, gridClassName, 'tableContentRow')}
    >
      {children}
    </div>
  );
}
