import React, { useMemo } from 'react';
import cn from 'classnames';
import styles from './styles.module.css';

interface InputFileProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept: string;
  extClassName?: string;
  error?: boolean;
  errorText?: string;
  id?: string;
  name: string;
}

export const InputFile = React.forwardRef<HTMLInputElement, InputFileProps>(
  (
    { onChange, accept, extClassName, error, errorText, id, name, ...props },
    ref
  ) => {
    const errorToRender = useMemo(
      () =>
        error && errorText ? (
          <span className={cn(styles.error, 'text')}>{errorText}</span>
        ) : null,
      [error, errorText]
    );
    return (
      <div className={cn(styles.container, extClassName)}>
        <input
          name={name}
          ref={ref}
          id={id}
          type="file"
          accept={accept}
          onChange={onChange}
          required
          hidden
          {...props}
        />
        {errorToRender}
      </div>
    );
  }
);
