import { FC, ReactNode } from 'react';
import ReactDatePicker, { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import './react-datepicker.css';
import ru from 'date-fns/locale/ru';
import cn from 'classnames';
import { getMonth, getShortenWeekDay } from './lib';
import { StepButton } from '../step-button';
import styles from './styles.module.css';

const customHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: ReactDatePickerCustomHeaderProps): ReactNode => {
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
};

export interface IDateRange {
  startValue: Date;
  finishValue: Date;
  changeStartDate: (date: Date) => void;
  changeFinishDate: (date: Date) => void;
  filterStart?: Date;
  filterFinish?: Date;
  disabledStart?: boolean;
  className?: string;
}

export const DateRange: FC<IDateRange> = ({
  startValue,
  finishValue,
  changeStartDate,
  changeFinishDate,
  filterStart,
  filterFinish,
  disabledStart,
  className,
}) => (
  <div className={cn(className, styles.dateRange)}>
    <ReactDatePicker
      name="startDate"
      showPopperArrow={false}
      locale={ru}
      selected={startValue}
      onChange={(date) => {
        if (date) {
          changeStartDate(date);
          if (finishValue <= date) {
            const finishDate = new Date(date);
            finishDate.setDate(date.getDate() + 1);
            changeFinishDate(finishDate);
          }
        }
      }}
      wrapperClassName={styles.datePicker}
      className={cn(
        styles.datePicker__input,
        {
          [styles.dataPicker__input_disabled]: disabledStart,
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
      filterDate={filterStart ? (date) => date >= filterStart : undefined}
      disabled={disabledStart}
    />
    <span className={styles.dateRange__divider} />
    <ReactDatePicker
      name="finishDate"
      showPopperArrow={false}
      locale={ru}
      selected={finishValue}
      onChange={(date) => date && changeFinishDate(date)}
      wrapperClassName={styles.datePicker}
      className={cn(styles.datePicker__input, 'text', 'text_type_extra_default')}
      calendarClassName={styles.dataPicker__calendar}
      dateFormat="dd.MM.yyyy"
      fixedHeight
      renderCustomHeader={customHeader}
      dayClassName={() => styles.dataPicker__calendarWeekDay}
      formatWeekDay={(formattedDate) => getShortenWeekDay(formattedDate)}
      filterDate={filterFinish ? (date) => date >= filterFinish : (date) => date > startValue}
    />
  </div>
);
