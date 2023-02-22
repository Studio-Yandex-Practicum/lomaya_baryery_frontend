import React from 'react';
import cn from 'classnames';
import styles from './styles.module.css';

interface IContentHeadingProps extends React.PropsWithChildren {
  title: string;
  extClassName?: string;
}

export const ContentHeading: React.FC<IContentHeadingProps> = ({
  title,
  extClassName,
  children,
}) => (
  <div className={cn(extClassName, styles.contentHeading)}>
    <h1
      className={cn(
        styles.contentHeading__title,
        'text',
        'text_type_main-extra-large',
        'p-0',
        'm-0'
      )}
    >
      {title}
    </h1>
    <div className={styles.contentHeadig__controls}>{children}</div>
  </div>
);
