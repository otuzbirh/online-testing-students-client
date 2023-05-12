import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./views/admin";
import Student from "./views/student";
import Teacher from "./views/teacher";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="side-bar"></div>
      <div className="header-nav"></div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<div className="container">
          <Route path="/admin" element={<Admin />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/student" element={<Student />} />
        </div>} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </div>
  );
}

export default App;
