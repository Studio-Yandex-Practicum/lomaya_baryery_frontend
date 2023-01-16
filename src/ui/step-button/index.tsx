import React from 'react';
import cn from 'classnames';
import styles from './styles.module.css';

type TIconArrow = {
  dirrection: 'right' | 'left';
  extClassname?: string;
};

const IconArrow: React.FC<TIconArrow> = ({ dirrection, extClassname }) => (
  <svg
    className={cn(styles.icon, extClassname)}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="#929EAD"
    xmlns="http://www.w3.org/2000/svg"
  >
    {dirrection === 'right' ? (
      <path d="M8.83984 7.41L13.4198 12L8.83984 16.59L10.2498 18L16.2498 12L10.2498 6L8.83984 7.41Z" />
    ) : null}

    {dirrection === 'left' ? (
      <path d="M15.1602 7.41L10.5802 12L15.1602 16.59L13.7502 18L7.75016 12L13.7502 6L15.1602 7.41Z" />
    ) : null}
  </svg>
);

type TStepButton = {
  dirrection: 'right' | 'left';
  buttonClassName?: string;
  iconClassName?: string;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const StepButton: React.FC<TStepButton> = ({
  dirrection,
  buttonClassName,
  iconClassName,
  ...props
}) => (
  <button className={cn(styles.button, buttonClassName)} {...props}>
    <IconArrow dirrection={dirrection} extClassname={cn(styles.button__icon, iconClassName)} />
  </button>
);
