import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageTitle from "./pageTitle";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import AdminLayout from "./layout/AdminLayout";
import StudentRegistration from "./pages/dashboard/RegisterStudent";
import StaffRegistration from "./pages/dashboard/StaffManagement";
import ActivityLog from "./pages/dashboard/ActivityLog";



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
        </Route>

        <Route path="/admin/register-staff" element={
            <>
              <PageTitle title="Register Staff" />
              <div className="bg-white rounded-lg shadow p-8">
                {<StaffRegistration/>}
              </div>
            </>
          } />
          <Route path="/admin/register-student" element={
            <>
              <PageTitle title="Register Student" />
              <div className="bg-white rounded-lg shadow p-8">
                <StudentRegistration />
              </div>
            </>
          } />
          <Route path="/admin/manage-staff" element={
            <>
              <PageTitle title="Manage Staff" />
              <h2>Manage Staff Content</h2>
            </>
          } />
          <Route path="/admin/activity-log" element={
            <>
              <PageTitle title="Activity Log" />
              <div className="div">
                <ActivityLog/>
              </div>
             
            </>
          } />
          <Route path="/admin/settings" element={
            <>
              <PageTitle title="Settings" />
              <h2>Settings Content</h2>
            </>
          } />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
