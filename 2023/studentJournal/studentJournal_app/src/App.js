import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddJournal from "./pages/AddJournal";
import JournalDetails from "./pages/JournalDetails";
import Home from "./pages/Home";
import Header from "./pages/Header";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Header/>}>
        <Route index element={<Home />} />;
        <Route path="AddJournal" element={<AddJournal />} />
        <Route path="JournalDetails" element={<JournalDetails />} />
        <Route path="Register" element={<Register />} />
        <Route path="Login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
