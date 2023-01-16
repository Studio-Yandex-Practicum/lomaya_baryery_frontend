import React, { PropsWithChildren } from 'react';
import cn from 'classnames';
import styles from './styles.module.css';

interface IContentContainerProps extends PropsWithChildren {
  extClassName?: string;
}

export const ContentContainer: React.FC<IContentContainerProps> = ({ children, extClassName }) => (
  <div className={cn(styles.contentContainer, extClassName)}>{children}</div>
);
