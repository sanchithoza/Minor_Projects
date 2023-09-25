import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import AddStudent from "./pages/AddStudent";
import StudentDetails from "./pages/StudentDetails";
import Home from "./pages/Home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout name="Student Profile Management" />}>
          <Route index element={<Home />} />;
          <Route path="AddStudent" element={<AddStudent />} />
          <Route path="StudentDetails" element={<StudentDetails />} />
          <Route path="Register" element={<Register />} />
          <Route path="Login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
