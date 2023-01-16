import React, { useMemo } from 'react';
import cn from 'classnames';

export interface ICellTextProps {
  date: string;
  type?: 'default' | 'withTime';
  extClassName?: string;
}

export const CellDate: React.FC<ICellTextProps> = ({ date, type = 'default', extClassName }) => {
  const renderDate = useMemo(() => {
    if (type === 'default') {
      return date.split('-').reverse().join('.');
    }

    if (type === 'withTime') {
      const convertedDate = new Date(date);
      return `${convertedDate.toLocaleDateString()} в ${convertedDate.toLocaleTimeString()}`;
    }
  }, [date, type]);

  return (
    <p className={cn(extClassName, 'text', 'text_type_main-default', `text_color_primary`, 'm-0')}>
      {renderDate}
    </p>
  );
};
