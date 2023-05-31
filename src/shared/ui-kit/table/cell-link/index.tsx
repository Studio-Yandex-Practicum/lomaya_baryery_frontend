import { Link, To } from 'react-router-dom';
import cn from 'classnames';
import styles from './styles.module.css';

export interface ICellLinkProps {
  text: string | number;
  routeTo: To;
  extClassName?: string;
}

export const CellLink: React.FC<ICellLinkProps> = ({
  text,
  routeTo,
  extClassName,
}) => (
  <Link
    to={routeTo}
    className={cn(
      styles.cellText,
      extClassName,
      'text',
      'text_type_main-default',
      'spreadsheetLink'
    )}
  >
    {text}
  </Link>
);
