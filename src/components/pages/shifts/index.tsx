import cn from 'classnames';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Button } from '../../../ui/button';
import { PlusIcon } from '../../../ui/icons';
import { ContentHeading } from '../../../ui/content-heading';
import { Table } from '../../../ui/table-native';
import { ShiftsRow } from '../../shifts-row';
import { useGetAllShiftsQuery } from '../../../redux-store/api';
import { ContentContainer } from '../../../ui/content-container';
import { useCallback, useMemo } from 'react';
import { Modal } from '../../../ui/modal';
import { ShiftSettingsForm } from '../../shift-settings-form';
import styles from './styles.module.css';

export const PageShiftsAll = () => {
  const navigate = useNavigate();
  const { data } = useGetAllShiftsQuery();

  const titles = useMemo(
    () => [
      'Номер смены',
      'Название смены',
      'Дата старта',
      'Дата окончания',
      'Кол-во участников',
      'Статус',
    ],
    []
  );

  const handleCreateShift = () => void navigate('create');

  const handleCloseModal = useCallback(() => navigate(-1), [navigate]);

  return (
    <>
      <ContentContainer extClassName={styles.shifts}>
        <ContentHeading title="Смены">
          <Button htmlType="button" type="primary" onClick={handleCreateShift}>
            <PlusIcon type="interface-white" />
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
      </ContentContainer>
      <Routes>
        <Route
          path="create"
          element={
            <Modal title="Новая смена" close={handleCloseModal}>
              <ShiftSettingsForm shiftStatus="creating" />
            </Modal>
          }
        />
      </Routes>
    </>
  );
};
