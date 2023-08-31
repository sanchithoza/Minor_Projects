// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from './component/Layout';
import AddUpdateResidentForm from './component/AddUpdateResidentForm';
import NoMatch from './component/NoMatch';
import Dashboard from './component/Dashboard';
import AddUpdateSocietyForm from './component/AddUpdateSocietyForm';
import SocietyGridView from './component/SocietyGridView';
import ResidentGridView from './component/ResidentGridView';
import MaintenanceTransactionForm from './component/MaintenanceTransactionForm';
export default function App() {
  return (
    <div>
   
      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-resident" element={<AddUpdateResidentForm />} />
          <Route path="view-resident" element={<ResidentGridView />} />
          <Route path="add-society" element={<AddUpdateSocietyForm />} />
          <Route path="edit-society/:id" element={<AddUpdateSocietyForm />} />
          <Route path="view-society" element={<SocietyGridView />} />
          <Route path="edit-resident/:id" element={<AddUpdateResidentForm />} />
          <Route path="add-maintenance" element={<MaintenanceTransactionForm />} />
          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}



