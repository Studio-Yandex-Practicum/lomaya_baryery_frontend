import React, { useMemo, useState } from 'react';
import cn from 'classnames';
import { EyeIcon } from '../icons/eye-icon';
import styles from './styles.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  extClassName?: string;
  error?: boolean;
  errorText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { value, onChange, extClassName, error, errorText, name, type, ...props },
    ref
  ) => {
    const [inputType, setInputType] = useState(false);

    const errorToRender = useMemo(
      () =>
        error && errorText ? (
          <span className={cn(styles.error, 'text')}>{errorText}</span>
        ) : null,
      [error, errorText]
    );
    return (
      <div className={cn(styles.container, extClassName)}>
        {name === 'pwd' || name === 'repeatPwd' ? (
          <input
            ref={ref}
            type={inputType ? 'text' : 'password'}
            value={value}
            className={cn(styles.input, 'border', 'text')}
            onChange={onChange}
            {...props}
          />
        ) : (
          <input
            ref={ref}
            type="text"
            value={value}
            className={cn(styles.input, 'border', 'text')}
            onChange={onChange}
            {...props}
          />
        )}
        <div
          className={styles.absolute}
          onClick={() => setInputType((prevState) => !prevState)}
        >
          {name === 'pwd' || name === 'repeatPwd' ? (
            <EyeIcon color="blue-dark" />
          ) : null}
        </div>
        {errorToRender}
      </div>
    );
  }
);
