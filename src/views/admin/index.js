import React from 'react'
import { useSelector } from 'react-redux';
import Dashboard from '../../components/layout/dashboard';
import AdminUsers from './components/admin-users/index';
import Quiz from './components/quiz';
import { Routes, Route } from 'react-router-dom'
import AdminProfile from './components/admin-profile';
import QuizManagment from './components/quiz/QuizManagment';
import Score from './components/score';
import AdminDashboard from './components/admin-dashboard';

const Admin = () => {

  return (
    <Dashboard>

      <Routes>
        <Route path='/dashboard' element={<AdminDashboard />} />
        <Route path="/users" element={<AdminUsers />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path='/quiz/:id' element={<QuizManagment />} />
        <Route path='/scores' element={<Score />} />

        <Route path='/profile' element={<AdminProfile />} />

      </Routes>

    </Dashboard>
  )
}

export default Admin