import { useCallback, useMemo } from 'react';
import cn from 'classnames';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Button } from '../../../ui/button';
import { PlusIcon } from '../../../ui/icons';
import { ContentHeading } from '../../../ui/content-heading';
import { Table } from '../../../ui/table-native';
import { ShiftsRow } from '../../shifts-row';
import { useGetAllShiftsQuery } from '../../../redux-store/api';
import { ContentContainer } from '../../../ui/content-container';
import { Modal } from '../../../ui/modal';
import { ShiftSettingsForm } from '../../shift-settings-form';
import { useAppSelector } from '../../../redux-store/hooks';
import { selectShiftForRequests } from '../../../redux-store/root-shifts';
import { ModalAlert } from '../../../ui/modal-alert';
import styles from './styles.module.css';

export const PageShiftsAll = () => {
  const navigate = useNavigate();
  const { data } = useGetAllShiftsQuery();
  const { shiftType } = useAppSelector(selectShiftForRequests);

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

  const handleCreateShift = useCallback(() => navigate('create'), [navigate]);

  const handleCloseModal = useCallback(() => navigate(-1), [navigate]);

  const modal = useMemo(() => {
    if (shiftType === 'preparing') {
      return (
        <ModalAlert onCloseModal={handleCloseModal} titleText="Новая смена уже создана">
          <Button
            extClassName={styles.modalAlert__button}
            htmlType="button"
            onClick={handleCloseModal}
          >
            Понятно
          </Button>
        </ModalAlert>
      );
    }

    if (shiftType === 'started') {
      return (
        <ModalAlert
          onCloseModal={handleCloseModal}
          titleText="Новую смену можно создать через 2 дня после старта текущей"
        >
          <Button
            extClassName={styles.modalAlert__button}
            htmlType="button"
            onClick={handleCloseModal}
          >
            Понятно
          </Button>
        </ModalAlert>
      );
    }

    return (
      <Modal title="Новая смена" close={handleCloseModal}>
        <ShiftSettingsForm shiftStatus="creating" />
      </Modal>
    );
  }, [shiftType]); // eslint-disable-line

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
        <Route path="create" element={modal} />
      </Routes>
    </>
  );
};
