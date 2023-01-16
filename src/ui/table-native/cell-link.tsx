import { Link, To } from 'react-router-dom';
import cn from 'classnames';
import { ICellTextProps } from './cell-text';

interface ICellLinkProps extends Omit<ICellTextProps, 'type'> {
  routeTo: To;
}

export const CellLink: React.FC<ICellLinkProps> = ({ text, routeTo, extClassName }) => (
  <Link
    to={routeTo}
    className={cn(extClassName, 'text', 'text_type_main-default', 'spreadsheetLink')}
  >
    {text}
  </Link>
);
