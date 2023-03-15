import cn from 'classnames';
import { Link, To } from 'react-router-dom';
import { ChevronLeftIcon } from '../icons';
import styles from './styles.module.css';

interface BackwardLinkProps {
  to: To;
  extClassName?: string;
}

export function BackwardLink({ to, extClassName }: BackwardLinkProps) {
  return (
    <Link to={to} className={cn(styles.link, 'link', extClassName)}>
      <ChevronLeftIcon color="gray" />
      <p
        className={cn(
          styles.text,
          'text',
          'text_type_main-small',
          'text_color_secondary',
          'm-0'
        )}
      >
        Назад
      </p>
    </Link>
  );
}
