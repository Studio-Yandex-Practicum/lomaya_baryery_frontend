import { useCallback } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Modal } from '../../ui/modal';
import { IAppLocation } from '../../utils';
import { ShiftSettingsForm } from '../shift-settings-form';
import { Layout } from './layout';
import { PageRequestsConsidered } from './requests-considered';
import { PageRequestsPending } from './requests-pending';
import { PageFinishedShift } from './shift-finished';
import { PagePreparingShift } from './shift-preparing';
import { PageStartedShift } from './shift-started';
import { PageShiftsAll } from './shifts';
import { PageTasksSlider } from './tasks-slider';
import { PageTasksUnderReview } from './tasks-under-review';

export const AppRoutes = () => {
  const { state, pathname, search }: IAppLocation = useLocation();
  const navigate = useNavigate();

  const rootLocation = state?.background || pathname.concat(search);

  const handleCloseModal = useCallback(() => navigate(-1), [navigate]);

  return (
    <>
      <Routes location={rootLocation}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="shifts/all" replace />} />
          <Route path="shifts/all" element={<PageShiftsAll />} />
          <Route path="shifts/preparing/" element={<PagePreparingShift />} />
          <Route path="shifts/started/*" element={<PageStartedShift />} />
          <Route path="shifts/finished/:id" element={<PageFinishedShift />} />
          <Route path="requests/pending/*" element={<PageRequestsPending />} />
          <Route path="requests/considered" element={<PageRequestsConsidered />} />
          <Route
            path="users"
            element={<h1 className="text text_type_main-extra-large">UNDER DESIGN</h1>}
          />
          <Route path="tasks/under_review" element={<PageTasksUnderReview />} />
          <Route path="tasks/under_review/:id" element={<PageTasksSlider />} />
          <Route
            path="tasks/reviewed"
            element={<h1 className="text text_type_main-extra-large">UNDER DEVELOP</h1>}
          />
          <Route
            path="tasks/reviewed/:id"
            element={<h1 className="text text_type_main-extra-large">UNDER DEVELOP</h1>}
          />
          <Route
            path="tasks/declined"
            element={<h1 className="text text_type_main-extra-large">UNDER DEVELOP</h1>}
          />
          <Route
            path="tasks/declined/:id"
            element={<h1 className="text text_type_main-extra-large">UNDER DEVELOP</h1>}
          />
          <Route
            path="*"
            element={
              <h1 className="text text_type_main-extra-large">
                Страница не найдена или её никогда не было
              </h1>
            }
          />
        </Route>
      </Routes>
      {state?.background && (
        <Routes>
          <Route
            path="shifts/create"
            element={
              <Modal title="Новая смена" close={handleCloseModal}>
                <ShiftSettingsForm shiftStatus="creating" />
              </Modal>
            }
          />
          <Route
            path="shifts/preparing/settings"
            element={
              <Modal title="Редактировать смену" close={handleCloseModal}>
                <ShiftSettingsForm shiftStatus="preparing" />
              </Modal>
            }
          />
          <Route
            path="shifts/started/settings"
            element={
              <Modal title="Редактировать смену" close={handleCloseModal}>
                <ShiftSettingsForm shiftStatus="started" />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};
