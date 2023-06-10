import React from 'react'
import Dashboard from '../../components/layout/dashboard';
import StudentProfile from './components/profile';
import {Routes, Route} from 'react-router-dom'
import Quiz from './components/quiz/index'
import AccessQuiz from './components/quiz/AccessQuiz';
import Score from './components/score';

const Student = () => {

  return (
    <Dashboard>
  
      <Routes>
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/profile" element={<StudentProfile />} />
          <Route path="/scores" element={<Score />} />
          <Route path='/quiz/:id' element={<AccessQuiz />} />


      </Routes>

    </Dashboard>
  )
}

export default Student