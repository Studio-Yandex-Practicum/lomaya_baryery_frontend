import cn from 'classnames';
import { CellText } from '../cell-text';
import styles from './styles.module.css';

interface ITable extends React.PropsWithChildren {
  gridClassName: string;
  header?: string[];
  extClassName?: string;
  /**
   * @param commonGridClassName refer on grid column template,
   * use ReactFragment or div for contain
   */
  renderRows: (
    commonGridClassName: CSSModuleClasses[string]
  ) => React.ReactNode;
}

export const Table: React.FC<ITable> = ({
  header,
  gridClassName,
  extClassName,
  renderRows,
  children,
}) => {
  function getRows() {
    return renderRows(cn(styles.table__row, gridClassName));
  }

  return (
    <section className={cn(styles.table, extClassName)}>
      {header && (
        <div
          className={cn(
            styles.table__row,
            styles.table__headingRow,
            gridClassName
          )}
        >
          {header.map((title) => (
            <CellText key={title} text={title} type="secondary" />
          ))}
        </div>
      )}
      {getRows()}
      {children}
    </section>
  );
};
