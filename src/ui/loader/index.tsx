import React from 'react';
import cn from 'classnames';
import styles from './styles.module.css';

interface ILoaderProps {
  extClassName?: string;
  fullScreen?: boolean;
}

export const Loader: React.FC<ILoaderProps> = ({ extClassName, fullScreen }) => (
  <div
    className={cn(styles.loader_wrapper, { [styles.loader_fullScreen]: fullScreen }, extClassName)}
  >
    <svg
      className={cn({ [styles.loader__icon]: fullScreen })}
      xmlns="http://www.w3.org/2000/svg"
      version="1.0"
      width="40px"
      height="40px"
      viewBox="0 0 128 128"
    >
      <g>
        <path
          d="M64 9.75A54.25 54.25 0 0 0 9.75 64H0a64 64 0 0 1 128 0h-9.75A54.25 54.25 0 0 0 64 9.75z"
          fill="#4154a4"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 64 64"
          to="360 64 64"
          dur="1000ms"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  </div>
);
