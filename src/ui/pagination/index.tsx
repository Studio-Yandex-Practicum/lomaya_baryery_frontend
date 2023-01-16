import React from 'react';
import cn from 'classnames';
import { StepButton } from '../step-button';
import styles from './styles.module.css';

interface IPagination {
  page: number;
  total: number;
  next: (increment: number) => void;
  prev: (decrement: number) => void;
  extClassName?: string;
}

export const Pagination: React.FC<IPagination> = ({ page, total, next, prev, extClassName }) => {
  const preventPrev = page === 1;
  const preventNext = page === total;

  const handleNext = () => {
    next(page + 1);
  };

  const handlePrev = () => {
    prev(page - 1);
  };

  return (
    <div className={cn(styles.pagination, extClassName)}>
      <span
        className={cn('text', 'text_type_extra_default', styles.pagination__counter)}
      >{`${page} / ${total}`}</span>
      <StepButton
        disabled={preventPrev}
        type="button"
        onClick={handlePrev}
        dirrection="left"
        buttonClassName={cn(styles.pagination__button, {
          [styles.pagination__button_disabled]: preventPrev,
        })}
        iconClassName={cn(styles.pagination__icon, {
          [styles.pagination__icon_disabled]: preventPrev,
        })}
      />
      <StepButton
        disabled={preventNext}
        type="button"
        onClick={handleNext}
        dirrection="right"
        buttonClassName={cn(styles.pagination__button, {
          [styles.pagination__button_disabled]: preventNext,
        })}
        iconClassName={cn(styles.pagination__icon, {
          [styles.pagination__icon_disabled]: preventNext,
        })}
      />
    </div>
  );
};
