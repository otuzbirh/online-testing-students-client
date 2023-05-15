import React, {useState, useEffect} from 'react'
import usersApi from '../../../../http/users'

const AdminUsers = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data } = await usersApi().listUsers();
    setUsers(data);
  }

  const useri =  users?.data?.users?.map(user => (
    <p> {user?.firstName} </p>
  ))

  const token = localStorage.getItem("token")
  return (
    <>
    <div>{token}</div>
    {useri}
    </>
  )
}

export default AdminUsers