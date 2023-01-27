import cn from 'classnames';
import styles from './styles.module.css';
import { DatePicker } from './date-picker/date-picker';

interface IDateRangeProps {
  startValue: Date;
  finishValue: Date;
  changeStartDate: (date: Date) => void;
  changeFinishDate: (date: Date) => void;
  filterStart?: Date;
  filterFinish?: Date;
  disabledStart?: boolean;
  disabledFinish?: boolean;
  extClassName?: string;
}

export function DateRange({
  startValue,
  finishValue,
  changeStartDate,
  changeFinishDate,
  filterStart,
  filterFinish,
  disabledStart,
  disabledFinish,
  extClassName,
}: IDateRangeProps) {
  const handleChangeStart = (date: Date) => {
    changeStartDate(date);
    if (finishValue <= date) {
      const finishDate = new Date(date);
      finishDate.setDate(date.getDate() + 1);
      changeFinishDate(finishDate);
    }
  };

  const handleChangeFinish = (date: Date) => {
    changeFinishDate(date);
  };

  const handleFilterStart = (date: Date) => {
    if (filterStart) {
      return date >= filterStart;
    }
    return false;
  };

  const handleFilterFinish = (date: Date) => {
    if (filterFinish) {
      return date > startValue && date <= filterFinish;
    }
    return date > startValue;
  };

  return (
    <div className={cn(extClassName, styles.dateRange)}>
      <DatePicker
        name="startDate"
        value={startValue}
        onChangeValue={handleChangeStart}
        filter={handleFilterStart}
        disabled={disabledStart}
      />
      <span className={styles.dateRange__divider} />
      <DatePicker
        name="finishDate"
        value={finishValue}
        onChangeValue={handleChangeFinish}
        filter={handleFilterFinish}
        disabled={disabledFinish}
      />
    </div>
  );
}
