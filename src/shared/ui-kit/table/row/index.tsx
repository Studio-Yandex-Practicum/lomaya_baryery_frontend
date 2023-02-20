import React from 'react';
import cn from 'classnames';
import styles from './styles.module.css';

interface RowProps extends React.PropsWithChildren {
  gridClassName: string;
}

export function RowLow({ gridClassName, children }: RowProps) {
  return (
    <div className={cn(styles.row, gridClassName, 'tableContentRow')}>
      {children}
    </div>
  );
}
