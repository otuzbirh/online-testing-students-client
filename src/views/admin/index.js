import React from 'react'
import { useSelector } from 'react-redux';
import Dashboard from '../../components/layout/dashboard';
import AdminUsers from './components/admin-users/index';
import Quiz from './components/quiz';
import {Routes, Route} from 'react-router-dom'
import AdminProfile from './components/admin-profile';

const Admin = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);
  const userID = useSelector((state) => state.auth.userID)
  return (
    <Dashboard>
    {/* <h1>Welcome! </h1>
    <h2>Role: {role}</h2>
    <h3>Authenticated: {isAuthenticated ? "yes" : "no"}</h3>
    <h4>User ID: {userID}</h4> */}
     <Routes>
          <Route path="/users" element={<AdminUsers />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path='/profile' element={<AdminProfile />} />

      </Routes>

    </Dashboard>
  )
}

export default Admin