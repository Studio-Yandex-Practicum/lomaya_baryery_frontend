import React, { useMemo, useState } from 'react';
import cn from 'classnames';
import { Input } from 'shared/ui-kit/input';
import { DateRange } from 'shared/ui-kit/date-range';
import { Button } from 'shared/ui-kit/button';
import { getApiDateFormat, getInterval } from './lib';
import styles from './styles.module.css';

interface IShiftFormData {
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
  submitError?: string | null;
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
  submitError = 'Нельзя установить дату начала/окончания смены сегодняшним или прошедшим числом',
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
      start: getApiDateFormat(startValue),
      finish: getApiDateFormat(finishValue),
    };

    onSubmit(form);
  };

  return (
    <form
      noValidate
      className={cn(styles.form, extClassName)}
      onSubmit={handleSubmit}
    >
      <div className={styles.field}>
        <label
          htmlFor="title-id"
          className={cn(
            styles.label,
            'text',
            'text_type_main-default',
            'text_color_secondary'
          )}
        >
          Название
        </label>
        <Input
          onBlur={handleValidateTitle}
          id="title-id"
          name="title"
          extClassName={styles.inputText}
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
      <div className={styles.field}>
        <label
          className={cn(
            styles.label,
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
      <div className={styles.field}>
        <label
          className={cn(
            styles.label,
            'text',
            'text_type_main-default',
            'text_color_secondary'
          )}
        >
          Выбрано дней
        </label>
        <div className={cn(styles.counter, 'text')}>{dayCount}</div>
      </div>
      <div className={styles.submitContainer}>
        {submitError ? (
          <span className={cn(styles.submitError, 'text')}>{submitError}</span>
        ) : null}
        <Button
          htmlType="submit"
          size="small"
          disabled={disabled}
          loading={loading}
          extClassName={styles.button}
        >
          {buttonContent}
        </Button>
      </div>
    </form>
  );
}
