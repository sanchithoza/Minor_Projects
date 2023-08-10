import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddAssignment from "./pages/AddAssignment";
import AssignmentDetails from "./pages/AssignmentDetails";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />;
        <Route path="AddAssignment" element={<AddAssignment />} />
        <Route path="AssignmentDetails" element={<AssignmentDetails />} />
        <Route path="Register" element={<Register />} />
        <Route path="Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
