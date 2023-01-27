import React from 'react';
import cn from 'classnames';
import styles from './cell-text.module.css';

export interface ICellTextProps {
  text: string | number;
  type?: 'primary' | 'secondary' | 'accent';
  extClassName?: string;
}

export const CellText: React.FC<ICellTextProps> = ({ text, type = 'primary', extClassName }) => (
  <p
    className={cn(
      styles.cellText,
      extClassName,
      'text',
      'text_type_main-default',
      `text_color_${type}`,
      'm-0'
    )}
  >
    {text}
  </p>
);
