import React from 'react'
import Dashboard from '../../components/layout/dashboard';
import Quiz from '@mui/icons-material/Quiz';
import TeacherProfile from './components/profile';
import {Routes, Route} from 'react-router-dom'
import Students from './components/students/Students';

const Admin = () => {

  return (
    <Dashboard>
  
      <Routes>
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/profile" element={<TeacherProfile />} />
          <Route path="/students" element={<Students />} />

      </Routes>

    </Dashboard>
  )
}

export default Admin