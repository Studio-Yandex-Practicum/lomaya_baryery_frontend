import React from 'react';
import { createColumnHelper } from '@tanstack/react-table';

import styles from './active-applications-page.module.css';

import { Table } from '../../ui/table/Table';
import { Button } from '../../ui/button/button';
import { SearchInput } from '../../ui/search-Input/search-input';


// Структура данных, приходящих с сервера
interface requestsColumnsNames {
  user_id: string;
  name: string;
  surname: string;
  date_of_birth: string;
  city: string;
  phone: string;
  request_id: string;
  status: string;
}

// Захардкоженный массив данных, приходящих с сервера.
// Он нужен просто для образца, в код таблицы идут преобразованные данные с бэка. Про них - ниже
const defaultData: requestsColumnsNames[] = [
  {
    user_id: 'dkfkd943904004fdjfd3438',
    name: 'Иван',
    surname: 'Павлов',
    date_of_birth: '26.09.1849',
    city: 'Ленинград',
    phone: '+79998887766',
    request_id: 'dkfkd943904004fdjfd3438',
    status: 'pending',
  },
  {
    user_id: 'dkfkd943904004fdjfd3439',
    name: 'Дмитрий',
    surname: 'Менделеев',
    date_of_birth: '08.02.1834',
    city: 'Санкт-Петербург',
    phone: '+79998887755',
    request_id: 'dkfkd943904004fdjfd3439',
    status: 'declined',
  },
  {
    user_id: 'dkfkd943904004fdjfd3440',
    name: 'Софья',
    surname: 'Ковалевская',
    date_of_birth: '15.01.1850',
    city: 'Москва',
    phone: '+79998887744',
    request_id: 'dkfkd943904004fdjfd3440',
    status: 'approved',
  },
];

const pendingData = defaultData.filter(user => user.status === 'pending');

// TApplicationsTable, applicationsData, applicationsColumnsHelper, applicationsColumns
// Это переменные, отвечающие за работу таблицы с нашими данными. По идее, такое должны написать чуваки,
// которые пишут таблицу. Но они пока этого не сделали и, видимо, не будут

// Структура данных таблицы (by lizonkisel)
type TApplicationsTable = {
  user_name: string;
  city: string;
  phone: string;
  date_of_birth: string;
  buttons: string[];
};

const dataForTable: TApplicationsTable[] = [];

// Функция, которая преобразует данные бэкенда в данные для таблицы
function makeDataForTable() {
  pendingData.forEach((user) => {
    const userForTable = {
      user_name: `${user.name} ${user.surname}`,
      city: user.city,
      phone: user.phone,
      date_of_birth: user.date_of_birth,
      buttons: ['Принять', 'Отклонить'],
    };
    dataForTable.push(userForTable);
  });
}

makeDataForTable();

function customDispatch(button) {
  const buttonType = button.type;
  if (buttonType === 'submit') {
    console.log('submit');
    // Тут будет вызываться функция, которая будет диспатчить экшн, меняющий статус юзера. Пока консоль лог как заглушка
  } if (buttonType === 'reset') {
    console.log('reset');
    // Тут будет вызываться функция, которая будет диспатчить экшн, меняющий статус юзера. Пока консоль лог как заглушка
  }
}

export function ActiveApplicationsPage() {

  // Вспомогательная функция из либы @tanstack/react-table (by lizonkisel)
  const applicationsColumnsHelper = createColumnHelper<TApplicationsTable>();

  // Описание структуры и внешнего вида таблицы (описание колонок) (by lizonkisel)
  const applicationsColumns = [
    applicationsColumnsHelper.accessor((row) => row.user_name, {
      header: 'Имя и фамилия',
      cell: (info) => (
        <a href="/" className="text text_type_main-default spreadsheetLink">
          {info.getValue()}
        </a>
      ),
    }),
    applicationsColumnsHelper.accessor((row) => row.city, {
      header: 'Город',
      cell: (info) => info.getValue(),
    }),
    applicationsColumnsHelper.accessor((row) => row.phone, {
      header: 'Телефон',
      cell: (info) => info.getValue(),
    }),
    applicationsColumnsHelper.accessor((row) => row.date_of_birth, {
      header: 'Дата рождения',
      cell: (info) => info.getValue(),
    }),
    applicationsColumnsHelper.accessor((row) => row.buttons, {
      header: ' ',
      // Внутри cell код, вероятнее всего, нужно будет переписывать после подключения store. 
      // Для этого потребуются эксперименты с готовым store-ом
      cell: (buttons) => (
        <div className={styles.buttonContainer}>
          {buttons.getValue().map((button) => {
            const buttonType = button === 'Принять' ? 'submit' : 'reset';
            return (
              <Button htmlType={buttonType} onClick={(e: React.SyntheticEvent): void => {customDispatch(e.target)}} size="small" type="primary">
                {button}
              </Button>
            )
          })}
        </div>
      ),
    }),
  ];

  return (
    <article className={styles.main}>
      <section className={styles.header_content}>
        <h1 className={`${styles.header} text_type_main-extra-large`}>Заявки на участие</h1>
        <SearchInput value='' onChange={() => {}} onClear={() => {}} />
      </section>
      <section className={styles.main_content}>
        <Table defaultData={dataForTable} columnsData={applicationsColumns} rowHeight={60} getRowCanExpand={() => false} />
      </section>
      <section className={styles.footer_content}/>
    </article>
  );
}
