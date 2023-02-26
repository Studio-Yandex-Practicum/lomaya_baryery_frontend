import { Navigate, Route, Routes } from 'react-router-dom';
import { RequireRole } from 'entities/viewer';
import { Login } from './auth-login';
import { ForgotPassword } from './auth-forgot';
import { CreatePassword } from './auth-create';
import { Layout } from './layout/layout';
import { PageRequestsRealized } from './requests-realized';
import { PageRequestsPending } from './requests-pending';
import { PageFinishedShift } from './shift-finished';
import { PagePreparingShift } from './shift-preparing';
import { PageStartedShift } from './shift-started';
import { PageShiftsAll } from './shifts';
import { PageReportsReviewingSlider } from './reports-reviewing-slider';
import { PageReportsReviewing } from './reports-reviewing';
import { RequireAuth, RequireUnauth } from '../features/auth';
import { PageReportsRealized } from './reports-realized';
import { PageReportsDeclined } from './reports-declined';
import { PageAdminList } from './admin-list';
import { PageInvitationList } from './invitation-list';

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <RequireUnauth>
            <Login />
          </RequireUnauth>
        }
      />
      <Route
        path="/pwd_forgot"
        element={
          <RequireUnauth>
            <ForgotPassword />
          </RequireUnauth>
        }
      />
      <Route
        path="/pwd_create/:token"
        element={
          <RequireUnauth>
            <CreatePassword />
          </RequireUnauth>
        }
      />
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
        <Route
          path="reports/reviewing/detailed"
          element={<PageReportsReviewingSlider />}
        />
        <Route path="reports/realized/*" element={<PageReportsRealized />} />
        <Route path="reports/declined/*" element={<PageReportsDeclined />} />

        <Route
          path="admins/members"
          element={
            <RequireRole viewerRole="administrator">
              <PageAdminList />
            </RequireRole>
          }
        />
        <Route
          path="admins/invitations"
          element={
            <RequireRole viewerRole="administrator">
              <PageInvitationList />
            </RequireRole>
          }
        />

        <Route
          path="profile"
          element={<h1 className="text text_type_main-extra-large">...</h1>}
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
