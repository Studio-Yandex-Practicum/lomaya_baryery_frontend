import cn from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../redux-store/hooks';
import { Button } from '../../../ui/button';
import { PlusIcon } from '../../../ui/icons';
import { ContentHeading } from '../../../ui/content-heading';
import { Table } from '../../../ui/table-native';
import { ShiftsRow } from '../../shifts-row';
// import { Pagination } from '../../../ui/pagination';
import { useGetAllShiftsQuery } from '../../../redux-store/api';
import { selectRootShifts } from '../../../redux-store/root-shifts';
// import { deserializeQuery } from '../../../utils';
import { ContentContainer } from '../../../ui/content-container';
import styles from './styles.module.css';

export const PageShiftsAll = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const { pathname: currentPath, search } = location;
  // const page = deserializeQuery<{ page: string }>(search).page;
  const { data } = useGetAllShiftsQuery();
  const { preparing: isPreparingShift } = useAppSelector(selectRootShifts);

  const titles = [
    'Номер смены',
    'Название смены',
    'Дата старта',
    'Дата окончания',
    'Кол-во участников',
    'Статус',
  ];

  // const handleSetPage = (page: number) => {
  //   navigate({ pathname: currentPath, search: `page=${page}` });
  // };

  return (
    <ContentContainer extClassName={styles.shifts}>
      <ContentHeading title="Смены">
        <Button
          htmlType="button"
          type={isPreparingShift ? 'disabled' : 'primary'}
          disabled={Boolean(isPreparingShift)}
          onClick={() =>
            navigate('/shifts/create', {
              state: {
                background: location,
              },
            })
          }
        >
          <PlusIcon type={isPreparingShift ? 'interface-secondary' : 'interface-white'} />
          Создать смену
        </Button>
      </ContentHeading>
      <Table
        extClassName={styles.shifts__table}
        header={titles}
        gridClassName={styles.shifts__tableColumns}
        renderRows={(rowStyles) =>
          data ? (
            <div className={cn(styles.shifts__scrollSection, 'custom-scroll')}>
              {data.map((shift) => (
                <ShiftsRow key={shift.id} shiftData={shift} extClassName={rowStyles} />
              ))}
            </div>
          ) : null
        }
      />
      {/* <Pagination //to be
        extClassName={styles.shifts__pagination}
        page={Number(page)}
        total={0}
        next={handleSetPage}
        prev={handleSetPage}
      /> */}
    </ContentContainer>
  );
};
