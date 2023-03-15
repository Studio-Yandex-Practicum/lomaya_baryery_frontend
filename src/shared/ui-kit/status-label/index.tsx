import { useMemo } from 'react';
import * as appIcons from '../icons';
import styles from './styles.module.css';

export interface IStatusLabelProps {
  statusText: string;
  type: 'current' | 'new' | 'past' | 'approved' | 'rejected' | 'review';
  className?: string;
  icon?: keyof appIcons.TStatusIcons;
}

export const StatusLabel = ({
  type,
  icon,
  statusText,
  className,
}: IStatusLabelProps) => {
  const HTMLClass = className || '';

  const typeStyle = styles[`status_type_${type}`];

  const iconToRender = useMemo(() => {
    if (!icon) {
      return null;
    }

    const Icon = appIcons[icon];

    const getIconType = (type: IStatusLabelProps['type']) => {
      switch (type) {
        case 'approved' || 'current': {
          return 'green';
        }
        case 'review': {
          return 'yellow';
        }
        case 'rejected': {
          return 'red';
        }
        case 'new': {
          return 'black';
        }
        default: {
          return 'black';
        }
      }
    };

    return (
      <span className={styles.status__icon}>
        <Icon size="18" type={getIconType(type)} />
      </span>
    );
  }, [icon, type]);

  return (
    <p
      className={`${styles.status} ${typeStyle} ${HTMLClass} text text_type_main-small `}
    >
      {iconToRender}
      {statusText}
    </p>
  );
};
