import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./views/admin";
import Student from "./views/student";
import Teacher from "./views/teacher";
import "./App.css";

function App() {
  return (
 
     
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/student" element={<Student />} />
          <Route path="*" element={<div>Page not found</div>} />
      </Routes>

  );
}

export default App;
