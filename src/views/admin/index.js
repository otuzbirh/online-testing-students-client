import React from 'react'
import { useSelector } from 'react-redux';
import Dashboard from '../../components/layout/dashboard';
import AdminUsers from './components/admin-users/index';
import Quiz from './components/quiz';
import {Routes, Route} from 'react-router-dom'
import AdminProfile from './components/admin-profile';

const Admin = () => {

  return (
    <Dashboard>
  
     <Routes>
          <Route path="/users" element={<AdminUsers />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path='/profile' element={<AdminProfile />} />

      </Routes>

    </Dashboard>
  )
}

export default Admin