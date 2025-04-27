import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "./state/app";
import { Suspense, lazy, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// Layouts & Components
import AdminLayout from "./layout/AdminLayout";
import PageTitle from "./pageTitle";
import MessageModal from "./components/alerts/MessageModal";
import { CircularProgress } from "@mui/material";
import ScheduleManager from "./pages/doctor/ScheduleManager";
import LabTechnicianDashboard from "./pages/labtech/LabTechnicianDashboard";
import PageNotFound from "./pages/error/NotFound";
import DoctorsDashboard from "./pages/doctor/DoctorsDashboard";

// Lazy-loaded Admin Pages
const AdminDashboard = lazy(() => import("./pages/dashboard/AdminDashboard"));
const StudentRegistration = lazy(
  () => import("./pages/dashboard/RegisterStudent")
);
const StaffRegistration = lazy(() => import("./pages/dashboard/RegisterStaff"));
const ActivityLog = lazy(() => import("./pages/dashboard/ActivityLog"));
const Settings = lazy(() => import("./pages/dashboard/Settings"));

// Lazy-loaded Doctor Pages
const DoctorDashboard = lazy(() => import("./pages/doctor/DoctorDashboard"));
const DoctorLabReports = lazy(() => import("./pages/doctor/LabReports"));

// Lazy-loaded Authentication Pages
const AdminSignIn = lazy(() => import("./pages/auth/AdminLogin"));
const AdminRegistration = lazy(() => import("./pages/auth/AdminRegistration"));

const PharmacyDashboard = lazy(() => import("./pages/pharmacy"));

// Lazy-loaded Other Pages
const ReceptionistPage = lazy(() => import("./pages/receptionist"));

// Fallback Loader Component
const LoaderComponent = () => (
  <div className="flex bg-white dark:bg-boxdark items-center justify-center h-screen">
    <CircularProgress />
  </div>
);

function App() {
  const message = useSelector((state: any) => state.app.alert);
  const currentUser = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser || (currentUser && window.location.pathname != '/')) return;
    const userRole = currentUser?.role;
    window.location.href = `/${userRole}`;
  }, [currentUser?.role]);

  return (
    <BrowserRouter>
      {/* Alert Message Modal */}
      {message && (
        <MessageModal
          message={message.message}
          type={message.type}
          onClose={() => dispatch(clearMessage())}
        />
      )}

      <Suspense fallback={<LoaderComponent />}>
        <Routes>
          {/* Admin Routes (Wrapped in AdminLayout) */}
          <Route element={<AdminLayout />}>
            <Route
              path="/"
              element={
                <>
                  <PageTitle title="Unicare" />
                  <AdminDashboard />
                </>
              }
            />
            <Route
              path="/admin"
              element={
                <>
                  <PageTitle title="Dashboard" />
                  <AdminDashboard />
                </>
              }
            />
            <Route
              path="/admin/register-staff"
              element={
                <>
                  <PageTitle title="Register Staff" />
                  <div className="bg-white dark:bg-boxdark-2 rounded-lg shadow p-8">
                    <StaffRegistration />
                  </div>
                </>
              }
            />
            <Route
              path="/admin/register-student"
              element={
                <>
                  <PageTitle title="Register Student" />
                  <div className="bg-white dark:bg-boxdark-2 rounded-lg shadow p-8">
                    <StudentRegistration />
                  </div>
                </>
              }
            />
            <Route
              path="/admin/manage-staff"
              element={
                <>
                  <PageTitle title="Manage Staff" />
                  <h2>Manage Staff Content</h2>
                </>
              }
            />
            <Route
              path="/admin/activity-log"
              element={
                <>
                  <PageTitle title="Activity Log" />
                  <div className="bg-white dark:bg-boxdark-2 rounded-lg shadow p-8">
                    <ActivityLog />
                  </div>
                </>
              }
            />
            <Route
              path="/account/settings"
              element={
                <>
                  <PageTitle title="Settings" />
                  <div className="bg-white dark:bg-boxdark-2 rounded-lg shadow p-8">
                    <Settings />
                  </div>
                </>
              }
            />
          </Route>

          {/* Doctor Routes (Wrapped in AdminLayout) */}
          <Route element={<AdminLayout />}>
            <Route
              path="/doctor"
              element={
                <>
                  <PageTitle title="Doctor Dashboard" />
                  <DoctorsDashboard />
                </>
              }
            />
            <Route
              path="/doctor/lab"
              element={
                <>
                  <PageTitle title="Lab Reports" />
                  <DoctorLabReports />
                </>
              }
            />
            <Route
              path="/doctor/appointments"
              element={
                <>
                  <PageTitle title="Schedule Manager" />
                  <ScheduleManager />
                </>
              }
            />
          </Route>

          {/* Authentication Routes */}
          <Route path="/auth/login" element={<AdminSignIn />} />
          <Route path="/auth/register" element={<AdminRegistration />} />

          {/* Receptionist Route */}
          <Route element={<AdminLayout />}>
            <Route
              path="/receptionist"
              element={
                <>
                  <PageTitle title="Receptionist Dashboard" />
                  <ReceptionistPage />
                </>
              }
            />
          </Route>

          <Route
            path="/pharmacist"
            element={
              <>
                <PageTitle title="Unicare | Pharmacy" />
                <PharmacyDashboard />
              </>
            }
          />

          {/* Labtech Route */}
          <Route element={<AdminLayout />}>
            <Route
              path="/labtech"
              element={
                <>
                  <PageTitle title="LabTech Dashboard" />
                  <LabTechnicianDashboard />
                </>
              }
            />
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
