import cn from 'classnames';
import React, { useMemo } from 'react';
import styles from './styles.module.css';

export interface IInputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  extClassName?: string;
  error?: boolean;
  errorText?: string;
}

export const InputText = React.forwardRef<HTMLInputElement, IInputTextProps>(
  ({ value, onChange, extClassName, error, errorText, ...props }, ref) => {
    const errorToRender = useMemo(
      () =>
        error && errorText ? (
          <span className={cn(styles.inputText__error, 'text')}>{errorText}</span>
        ) : null,
      [error, errorText]
    );

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
        {errorToRender}
      </div>
    );
  }
);
