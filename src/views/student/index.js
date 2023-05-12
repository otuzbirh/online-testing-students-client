import React from 'react'
import { useSelector } from 'react-redux';

const Student = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);
  const userID = useSelector((state) => state.auth.userID)
  return (
    <>
    <h1>Welcome! </h1>
    <h2>Role: {role}</h2>
    <h3>Authenticated: {isAuthenticated ? "yes" : "no"}</h3>
    <h4>User ID: {userID}</h4>
    </>
  )
}

export default Student