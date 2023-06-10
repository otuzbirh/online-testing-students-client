import React from 'react'
import Dashboard from '../../components/layout/dashboard';
import TeacherProfile from './components/profile';
import {Routes, Route} from 'react-router-dom'
import Students from './components/students/Students';
import Quiz from './components/quiz/index'
import QuizManagment from './components/quiz/QuizManagment';
import Score from './components/score';

const Admin = () => {

  return (
    <Dashboard>
  
      <Routes>
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/profile" element={<TeacherProfile />} />
          <Route path="/students" element={<Students />} />
          <Route path="/scores" element={<Score />} />

          <Route path='/quiz/:id' element={<QuizManagment />} />

      </Routes>

    </Dashboard>
  )
}

export default Admin