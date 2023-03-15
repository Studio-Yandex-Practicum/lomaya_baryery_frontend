import cn from 'classnames';
import * as Icons from '../icons';
import type { TIcons } from '../icons';
import styles from './styles.module.css';

interface AlertProps {
  title?: string;
  icon?: keyof TIcons;
  extClassName?: string;
}

export function Alert({ icon = 'AlertIcon', title, extClassName }: AlertProps) {
  const Icon = Icons[icon];

  return (
    <div className={cn(extClassName, styles.alert)}>
      <div className={styles.alert__icon}>
        <Icon type="blue-dark" />
      </div>
      <p
        className={cn(
          styles.alert__text,
          'text',
          'text_type_main-large',
          'm-0'
        )}
      >
        {title}
      </p>
    </div>
  );
}
