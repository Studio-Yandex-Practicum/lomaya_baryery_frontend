import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './auth-login';
import { ForgotPassword } from './auth-forgot';
import { ResetPassword } from './auth-create';
import { Layout } from './layout/layout';
import { PageRequestsRealized } from './requests-realized';
import { PageRequestsPending } from './requests-pending';
import { PageFinishedShift } from './shift-finished';
import { PagePreparingShift } from './shift-preparing';
import { PageStartedShift } from './shift-started';
import { PageShiftsAll } from './shifts';
// import { PageReportsReviewingSlider } from './reports-reviewing-slider';
import { PageReportsReviewing } from './reports-reviewing';
import { RequireAuth } from '../processes/auth/hoc';
import { PageReportsRealized } from './reports-realized';
import { PageReportsDeclined } from './reports-declined';

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
        <Route path="shifts/all/" element={<PageShiftsAll />} />
        <Route path="shifts/preparing/*" element={<PagePreparingShift />} />
        <Route path="shifts/started/*" element={<PageStartedShift />} />
        <Route
          path="shifts/finished/:shiftId"
          element={<PageFinishedShift />}
        />
        <Route path="requests/pending/*" element={<PageRequestsPending />} />
        <Route path="requests/realized" element={<PageRequestsRealized />} />
        <Route path="reports/reviewing" element={<PageReportsReviewing />} />

        {/* <Route
          path="reports/reviewing/:id"
          element={<PageReportsReviewingSlider />}
        /> */}

        <Route path="reports/realized/*" element={<PageReportsRealized />} />
        <Route path="reports/declined/*" element={<PageReportsDeclined />} />

        <Route
          path="profile"
          element={
            <h1 className="text text_type_main-extra-large">UNDER DEVELOP</h1>
          }
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
