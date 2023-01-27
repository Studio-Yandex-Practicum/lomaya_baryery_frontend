import { ReactNode } from 'react';
import ReactDatePicker, { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import './react-datepicker.css';
import ru from 'date-fns/locale/ru';
import cn from 'classnames';
import { getMonth, getShortenWeekDay } from './lib';
import { StepButton } from '../../step-button';
import styles from './styles.module.css';

function customHeader({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: ReactDatePickerCustomHeaderProps): ReactNode {
  const month = getMonth(date);

  return (
    <div className={styles.datePicker__calendarHeader}>
      <StepButton
        dirrection="left"
        onClick={decreaseMonth}
        type="button"
        disabled={prevMonthButtonDisabled}
      />
      <div>
        <span className={styles.datePicker__headerMonth}>{month}</span>
        <span className={styles.datePicker__headerYear}>
          {date.toLocaleDateString('ru-RU', {
            year: 'numeric',
          })}
        </span>
      </div>
      <StepButton
        dirrection="right"
        onClick={increaseMonth}
        type="button"
        disabled={nextMonthButtonDisabled}
      />
    </div>
  );
}

export interface IDatePickerProps {
  name: string;
  value: Date;
  onChangeValue: (date: Date) => void;
  filter?: (date: Date) => boolean;
  disabled?: boolean;
}

export function DatePicker({ name, value, onChangeValue, filter, disabled }: IDatePickerProps) {
  const handleOnChange = (date: Date | null) => {
    if (date) onChangeValue(date);
  };

  return (
    <ReactDatePicker
      name={name}
      selected={value}
      onChange={handleOnChange}
      filterDate={filter}
      disabled={disabled}
      showPopperArrow={false}
      locale={ru}
      wrapperClassName={styles.datePicker}
      className={cn(
        styles.datePicker__input,
        {
          [styles.dataPicker__input_disabled]: disabled,
        },
        'text',
        'text_type_extra_default'
      )}
      calendarClassName={styles.dataPicker__calendar}
      dateFormat="dd.MM.yyyy"
      fixedHeight
      renderCustomHeader={customHeader}
      dayClassName={() => styles.dataPicker__calendarWeekDay}
      formatWeekDay={(formattedDate) => getShortenWeekDay(formattedDate)}
    />
  );
}
