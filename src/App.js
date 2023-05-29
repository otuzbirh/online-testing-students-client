import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Admin from "./views/admin";
import Student from "./views/student";
import Teacher from "./views/teacher";
import "./App.css";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);

  const ProtectedRoute = ({ element, userRole  }) => {
    if (isAuthenticated && userRole && role === userRole) {
      return element;
    }
    else {
      return <Navigate to="/" replace />;
    }

  };

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/admin/*"
        element={<ProtectedRoute element={<Admin />} userRole="admin" />}
      />
      <Route
        path="/teacher/*"
        element={<ProtectedRoute element={<Teacher />} userRole="teacher" />}
      />
      <Route
        path="/student/*"
        element={<ProtectedRoute element={<Student />} userRole="student" />}
      />
      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  );
}

export default App;
