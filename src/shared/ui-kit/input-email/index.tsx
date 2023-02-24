import cn from 'classnames';
import React from 'react';
import styles from './styles.module.css';

export interface InputEmailProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  extClassName?: string;
  error?: (isError: boolean) => void;
  showError?: boolean;
}

export const InputEmail = React.forwardRef<HTMLInputElement, InputEmailProps>(
  ({ value, onChange, extClassName, error, showError, ...props }, ref) => {
    const emailPattern = /^1234$/;
    const errorToRender = 'error';
    const isError = !emailPattern.test(value);

    if (error) {
      error(isError);
    }

    return (
      <div className={cn(styles.inputTextContainer, extClassName)}>
        <input
          ref={ref}
          type="text"
          value={value}
          className={cn(styles.inputText, 'border', 'text')}
          onChange={onChange}
          {...props}
        />
        {showError && (
          <span className={cn(styles.inputText__error, 'text')}>
            {errorToRender}
          </span>
        )}
      </div>
    );
  }
);
