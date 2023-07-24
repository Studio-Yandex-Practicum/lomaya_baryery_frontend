import React from 'react';
import cn from 'classnames';
import { BreadCrumbs } from '../bread-crumbs';
import type { IBreadCrumb } from '../bread-crumbs';
import styles from './styles.module.css';

interface IContentHeadingProps extends React.PropsWithChildren {
  title: string;
  crumbs?: IBreadCrumb[];
  extClassName?: string;
}

export const ContentHeading: React.FC<IContentHeadingProps> = ({
  title,
  crumbs,
  extClassName,
  children,
}) => {
  const MAKE_CRUMBS = Array.isArray(crumbs);

  return (
    <div className={cn(extClassName, styles.contentHeading)}>
      <div
        className={cn(
          styles.contentHeading__title,
          'text',
          'text_type_main-extra-large'
        )}
      >
        {MAKE_CRUMBS ? <BreadCrumbs crumbs={crumbs} /> : undefined}
        <h1
          className={cn(
            styles.contentHeading__text,
            'p-0',
            'm-0',
            'text_type_main-extra-large'
          )}
        >
          {title}
        </h1>
      </div>
      <div className={styles.contentHeading__controls}>{children}</div>
    </div>
  );
};
