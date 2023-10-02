import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Switch,
  Router,
} from "react-router-dom";

import logo from "./logo.svg";
import AboutUs from "./AboutUs";
import "./App.css";
import CompForm from "./CompForm";
import ContactUs from "./ContactUs";
import Navbar from "./Navbar";
import P_Login from "./P_Login";
import LoginForm from "./LoginForm";
import RegForm from "./RegForm";
import HomePage from "./HomePage";
import StudentDetails from "./StudentDetails";
import ViewComp from "./ViewComp";
import ViewUsers from "./ViewUsers";
// import 'bootstrap/dist/css/bootstrap.css';

// Put any other imports below so that CSS from your
// components takes precedence over default styles.

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navbar />}>
          <Route index element={<HomePage />} />;
          <Route path="CompForm" element={<CompForm />} />
          <Route path="HomePage" element={<HomePage />} />
          <Route path="AboutUs" element={<AboutUs />} />
          <Route path="ContactUs" element={<ContactUs />} />
          <Route path="LoginForm" element={<LoginForm />} />
          <Route path="RegForm" element={<RegForm />} />
          <Route path="P_Login" element={<P_Login />} />
          <Route path="/students/:id" component={"/StudentDetails"} />
          <Route path="Register" element={<RegForm />} />
          <Route path="Login" element={<LoginForm />} />
          <Route path="ViewComp" element={<ViewComp />} />
          <Route path="ViewUsers" element={<ViewUsers/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
