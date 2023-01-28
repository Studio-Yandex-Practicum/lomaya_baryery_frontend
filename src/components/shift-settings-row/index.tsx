import React from 'react';
import cn from 'classnames';
import { CellText } from '../../ui/table';
import { CellDate } from '../../ui/table';
import { Button } from '../../ui/button';
import styles from './styles.module.css';

interface IShiftSettingsRow {
  extClassName?: string;
  title: string;
  start: string;
  finish: string;
  onButtonClick?: () => void;
  participants: number;
}

export const ShiftSettingsRow: React.FC<IShiftSettingsRow> = ({
  extClassName,
  title,
  start,
  finish,
  onButtonClick,
  participants,
}) => (
  <div className={cn(styles.shiftSettingsRow, extClassName)}>
    <CellText type="accent" text={title} />
    <div className={styles.shiftSettingsRow__date}>
      <CellDate date={start} />
      <span className={cn(styles.shiftSettingsRow__dateDevider, 'text text_type_main-medium')}>
        –
      </span>
      <CellDate date={finish} />
      {onButtonClick && (
        <Button
          extClassName={styles.shiftSettingsRow__button}
          htmlType="button"
          type="secondary"
          size="small"
          onClick={onButtonClick}
        >
          Изменить
        </Button>
      )}
    </div>
    <CellText text={participants} />
  </div>
);
