import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Transaction from "./pages/Transaction";
import Report from "./pages/Report";
import Home from "./pages/Home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout name="Expense Tracker Application" />}>
          <Route index element={<Home />} />;
          <Route path="Transaction" element={<Transaction />} />
          <Route path="Report" element={<Report />} />
          <Route path="Register" element={<Register />} />
          <Route path="Login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
