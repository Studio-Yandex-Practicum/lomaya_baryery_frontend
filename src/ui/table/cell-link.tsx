import { Link, To } from 'react-router-dom';
import cn from 'classnames';
import { ICellTextProps } from './cell-text';
import styles from './cell-text.module.css';

interface ICellLinkProps extends Omit<ICellTextProps, 'type'> {
  routeTo: To;
}

export const CellLink: React.FC<ICellLinkProps> = ({ text, routeTo }) => (
  <Link
    to={routeTo}
    className={cn(styles.cellText, 'text', 'text_type_main-default', 'spreadsheetLink')}
  >
    {text}
  </Link>
);
