import { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.css';
import { AlertIcon } from '../icons/alert-icon';

interface AlertProps {
  title?: string;
  extClassName?: string;
}

export const Alert: FC<AlertProps> = ({ title, extClassName }) => (
  <div className={cn(extClassName, styles.alert)}>
    <div className={styles.alert__icon}>
      <AlertIcon type="link-active" />
    </div>
    <p className={cn(styles.alert__text, 'text', 'text_type_main-large', 'm-0')}>{title}</p>
  </div>
);
