import React from 'react';
import { CircleWarningIcon, CircleCheckIcon, CircleStopIcon } from '../../ui/icons';
import { ITableData, IStatusIcons, IRowData, ITaskData, TTableBlock } from './types';
import { maxDaysCount } from './consts';
import { getTableTitle } from './utils';
import styles from './calendar-table.module.css';

interface Props {
  tableData: ITableData;
  isShowTitle?: boolean;
  withoutExternalBorders?: boolean;
  tableBorderBottomRadius?: string;
}

const statusIcons: IStatusIcons = {
  under_review: <CircleWarningIcon type="pending" size="24" />,
  approved: <CircleCheckIcon type="success" size="24" />,
  declined: <CircleStopIcon type="error" size="24" />,
};

export const CalendarTable: React.FC<Props> = ({
  tableData,
  isShowTitle,
  withoutExternalBorders,
  tableBorderBottomRadius,
}) => {
  const columnsCountToArray = Array.from(Array(maxDaysCount).keys());

  const getWithoutBorderClasses = (tableBlock: TTableBlock) => {
    switch (tableBlock) {
      case 'title':
        return withoutExternalBorders
          ? `${styles.withoutBorderTop} ${styles.withoutBorderLeft} ${styles.withoutBorderRight}`
          : '';
      case 'firstColumn':
        return withoutExternalBorders ? styles.withoutBorderLeft : '';
      case 'lastColumn':
        return withoutExternalBorders ? styles.withoutBorderRight : '';
      case 'header':
        return withoutExternalBorders ? styles.withoutBorderTop : '';
      default:
        return '';
    }
  };

  const renderHeader = () =>
    columnsCountToArray.map(
      (item: number, index: number): React.ReactNode => (
        <th
          key={item}
          className={`${styles.cell} ${styles.header} 
      ${index === columnsCountToArray.length - 1 ? getWithoutBorderClasses('lastColumn') : ''}
      ${!isShowTitle ? getWithoutBorderClasses('header') : ''}`}
        >
          {item + 1}
        </th>
      )
    );

  const renderCells = (rowData: IRowData): React.ReactNode =>
    columnsCountToArray.map((_: number, index: number) => {
      const date = new Date(rowData.tasks[0]?.date);
      const countOfDaysInMonth = new Date(date?.getFullYear(), date?.getMonth() + 1, 0).getDate();
      const isNotActiveDay = index >= countOfDaysInMonth;
      const task = rowData.tasks.filter(
        (item: ITaskData) => new Date(item?.date).getDate() === index + 1
      );
      const taskStatus = task[0]?.status;
      const icon = statusIcons[taskStatus];
      const key = countOfDaysInMonth + index;

      return (
        <td
          key={key}
          className={`${styles.cell} ${isNotActiveDay ? styles.notActiveDay : ''} 
        ${index === columnsCountToArray.length - 1 ? getWithoutBorderClasses('lastColumn') : ''}`}
        >
          {task.length > 0 ? icon : ''}
        </td>
      );
    });

  const renderRows = (): React.ReactNode =>
    tableData.map((item: IRowData, index: number) => {
      const key = Math.floor(Math.random() * index);
      const month = `м${index + 1}`;
      return (
        <tr
          key={key}
          className={styles.row}
          style={{
            borderBottomRightRadius: tableBorderBottomRadius,
            borderBottomLeftRadius: tableBorderBottomRadius,
          }}
        >
          <td
            key={month}
            className={`${styles.cell} ${styles.header} ${getWithoutBorderClasses('firstColumn')}`}
          >
            {month}
          </td>
          {renderCells(item)}
        </tr>
      );
    });

  return (
    <table className={styles.table}>
      {isShowTitle && (
        <tr className={`${styles.title} ${getWithoutBorderClasses('title')}`}>
          {getTableTitle(tableData)}
        </tr>
      )}
      <tr className={styles.row}>
        <th
          className={`${styles.cell} ${styles.header} ${getWithoutBorderClasses('firstColumn')} ${
            !isShowTitle ? getWithoutBorderClasses('header') : ''
          }`}
        >
          №
        </th>
        {renderHeader()}
      </tr>
      {renderRows()}
    </table>
  );
};
