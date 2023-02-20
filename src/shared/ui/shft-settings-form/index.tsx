import React, { useMemo, useState } from 'react';
import cn from 'classnames';

import { getAPIDateFormat, getInterval } from './lib';
import styles from './styles.module.css';
import { InputText } from '../../ui-kit/inputText';
import { DateRange } from '../../ui-kit/date-range';
import { Button } from '../../ui-kit/button';

export interface IShiftFormData {
  title: string;
  start: string;
  finish: string;
}

export interface IShiftSettingsFormProps {
  title?: string;
  startDate: Date;
  finishDate: Date;
  filterStart?: Date;
  filterFinish?: Date;
  disabledStart?: boolean;
  disabledFinish?: boolean;
  disabled?: boolean;
  loading?: boolean;
  buttonContent?: React.ReactNode;
  onSubmit: (form: IShiftFormData) => void;
  extClassName?: string;
}

export function ShiftSettingsForm({
  title,
  startDate,
  finishDate,
  filterStart,
  filterFinish,
  disabledStart,
  disabledFinish,
  disabled,
  loading,
  buttonContent = 'Сохранить',
  onSubmit,
  extClassName,
}: IShiftSettingsFormProps) {
  const [titleValue, setTitleValue] = useState<string>(title ?? '');
  const [startValue, setStartValue] = useState(startDate);
  const [finishValue, setfinishValue] = useState(finishDate);
  const [error, setError] = useState('');

  const dayCount = useMemo(
    () => getInterval(finishValue, startValue),
    [startValue, finishValue]
  );

  const handleChangeTitle = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(evt.target.value);
  };

  const handleValidateTitle = (
    evt: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    setError(evt.target.validationMessage);
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (error) return;

    const form = {
      title: titleValue.trim(),
      start: getAPIDateFormat(startValue),
      finish: getAPIDateFormat(finishValue),
    };

    onSubmit(form);
  };

  return (
    <form
      noValidate
      className={cn(styles.shiftForm, extClassName)}
      onSubmit={handleSubmit}
    >
      <div className={styles.shiftForm__field}>
        <label
          htmlFor="title-id"
          className={cn(
            styles.shiftForm__label,
            'text',
            'text_type_main-default',
            'text_color_secondary'
          )}
        >
          Название
        </label>
        <InputText
          onBlur={handleValidateTitle}
          id="title-id"
          name="title"
          extClassName={styles.shiftForm__inputText}
          value={titleValue}
          onChange={handleChangeTitle}
          error={Boolean(error)}
          errorText={error}
          required
          minLength={3}
          maxLength={60}
          spellCheck={false}
        />
      </div>
      <div className={styles.shiftForm__field}>
        <label
          className={cn(
            styles.shiftForm__label,
            'text',
            'text_type_main-default',
            'text_color_secondary'
          )}
        >
          Дата
        </label>
        <DateRange
          startValue={startValue}
          finishValue={finishValue}
          changeStartDate={setStartValue}
          changeFinishDate={setfinishValue}
          filterStart={filterStart}
          filterFinish={filterFinish}
          disabledStart={disabledStart}
          disabledFinish={disabledFinish}
        />
      </div>
      <div className={styles.shiftForm__field}>
        <label
          className={cn(
            styles.shiftForm__label,
            'text',
            'text_type_main-default',
            'text_color_secondary'
          )}
        >
          Выбрано дней
        </label>
        <div className={cn(styles.shiftForm__counter, 'text')}>{dayCount}</div>
      </div>
      <Button
        htmlType="submit"
        size="small"
        disabled={disabled}
        loading={loading}
        extClassName={styles.shiftForm__button}
      >
        {buttonContent}
      </Button>
    </form>
  );
}
