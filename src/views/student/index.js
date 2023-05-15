import React from 'react'
import { useSelector } from 'react-redux';
import Dashboard from '../../components/layout/dashboard';

const Student = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);
  const userID = useSelector((state) => state.auth.userID)
  return (
    <Dashboard>
    <h1>Welcome! </h1>
    <h2>Role: {role}</h2>
    <h3>Authenticated: {isAuthenticated ? "yes" : "no"}</h3>
    <h4>User ID: {userID}</h4>
    </Dashboard>
  )
}

export default Student