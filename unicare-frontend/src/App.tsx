import AdminDashboard from "./pages/dashboard/AdminDashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageTitle from "./pageTitle";
import AdminLayout from "./layout/AdminLayout";
import StudentRegistration from "./pages/dashboard/RegisterStudent";
import StaffRegistration from "./pages/dashboard/RegisterStaff";
import ActivityLog from "./pages/dashboard/ActivityLog";
import Settings from "./pages/dashboard/Settings";
import AdminSignIn from "./pages/auth/AdminLogin";
import ReceptionistPage from "./pages/receptionist";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout />}>
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
                  {<StaffRegistration />}
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
            path="/admin/settings"
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
        <Route path="/admin/login" element={<AdminSignIn />} />
        <Route path="*" element={<h1>Not Found</h1>} />

        {/* Reception route */}
        <Route path="/reception" element={<ReceptionistPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
