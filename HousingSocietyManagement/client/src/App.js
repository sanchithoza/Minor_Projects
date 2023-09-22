// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import AddUpdateResidentForm from "./component/AddUpdateResidentForm";
import NoMatch from "./component/NoMatch";
import Dashboard from "./component/Dashboard";
import AddUpdateSocietyForm from "./component/AddUpdateSocietyForm";
import SocietyGridView from "./component/SocietyGridView";
import ResidentGridView from "./component/ResidentGridView";
import MaintenanceTransactionForm from "./component/MaintenanceTransactionForm";
import { AuthProvider } from "./context/AuthContext";
import ResidentMaintenanceReport from "./component/ResidentMaintenanceReport";
import SocietyMaintenanceReport from "./component/SocietyMaintenanceReport";
export default function App() {
  return (
    <AuthProvider>
      <div>
        {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              {sessionStorage.userRole ? (
                sessionStorage.userRole === "society" ||
                sessionStorage.userRole === "admin" ? (
                  <>
                    <Route
                      path="add-resident"
                      element={<AddUpdateResidentForm />}
                    />
                    <Route
                      path="view-resident"
                      element={<ResidentGridView />}
                    />
                    .
                    <Route
                      path="edit-resident/:id"
                      element={<AddUpdateResidentForm />}
                    />
                  </>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              {sessionStorage.userRole ? (
                sessionStorage.userRole === "admin" ? (
                  <>
                    <Route
                      path="add-society"
                      element={<AddUpdateSocietyForm />}
                    />
                    <Route
                      path="edit-society/:id"
                      element={<AddUpdateSocietyForm />}
                    />
                    <Route path="view-society" element={<SocietyGridView />} />
                  </>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
               {sessionStorage.userRole ? (
                sessionStorage.userRole === "society" ? (
                  <Route
                  path="society-maintenance-report/:id"
                  element={<SocietyMaintenanceReport/>}
                />
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              <Route
                path="add-maintenance"
                element={<MaintenanceTransactionForm />}
              />
              <Route
                path="resident-maintenance-report/:id"
                element={<ResidentMaintenanceReport />}
              />
             
              {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}
