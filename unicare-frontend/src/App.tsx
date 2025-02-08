import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/adminDashboard";
import DefaultLayout from "./layout/defaultLayout";
import PageTitle from "./pageTitle";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
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
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
