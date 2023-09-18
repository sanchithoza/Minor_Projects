import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddAssignment from "./pages/AddAssignment";
import AssignmentDetails from "./pages/AssignmentDetails";
import Home from "./pages/Home";
import Header from "./pages/Header";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Header/>}>
        <Route index element={<Home />} />;
        <Route path="AddAssignment" element={<AddAssignment />} />
        <Route path="AssignmentDetails" element={<AssignmentDetails />} />
        <Route path="Register" element={<Register />} />
        <Route path="Login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
