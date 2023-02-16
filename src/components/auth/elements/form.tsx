import React from 'react';
import cn from 'classnames';
import { Button } from '../../../ui/button';
import styles from './form-styles.module.css';

interface IFormContainerProps {
  buttonText: string;
  children?: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  submitError?: string | null;
  loading?: boolean;
  extClassName?: string;
}

export function Form({
  buttonText,
  onSubmit,
  submitError,
  loading,
  children,
  extClassName,
}: IFormContainerProps) {
  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className={cn(extClassName, styles.form)}
    >
      {children}
      <div className={styles.form__submitWrapper}>
        {submitError && (
          <span className={cn('text', styles.form__submitError)}>
            {submitError}
          </span>
        )}
        <Button
          extClassName={styles.form__element}
          htmlType="submit"
          loading={loading}
          disabled={loading}
        >
          {buttonText}
        </Button>
      </div>
    </form>
  );
}
