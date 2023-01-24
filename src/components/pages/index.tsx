import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './auth-login';
import { ForgotPassword } from './auth-forgot';
import { ResetPassword } from './auth-create';
import { Layout } from './layout';
import { PageRequestsConsidered } from './requests-considered';
import { PageRequestsPending } from './requests-pending';
import { PageFinishedShift } from './shift-finished';
import { PagePreparingShift } from './shift-preparing';
import { PageStartedShift } from './shift-started';
import { PageShiftsAll } from './shifts';
import { PageTasksSlider } from './tasks-slider';
import { PageTasksUnderReview } from './tasks-under-review';
import { RequireAuth } from '../../hoc';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/pwd_forgot" element={<ForgotPassword />} />
      <Route path="/pwd_reset/:token" element={<ResetPassword />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="shifts/all" replace />} />
        <Route path="shifts/all/*" element={<PageShiftsAll />} />
        <Route path="shifts/preparing/*" element={<PagePreparingShift />} />
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
          path="profile"
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
  );
}
