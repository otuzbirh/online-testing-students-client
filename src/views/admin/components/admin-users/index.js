import React, {useState, useEffect} from 'react'
import usersApi from '../../../../http/users'
import {Button, Paper} from '@mui/material'
import TableComponent from '../../../../components/table';
import ActionButton from '../../../../components/buttons/actionButton';
import AddIcon from '@mui/icons-material/Add';
import AddModal from '../../../../components/modals/addModal';
import AddUser from '../../../../components/forms/addUser';

const AdminUsers = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  function handleCreateButton() {
    console.log("handle create")
  }

  async function fetchData() {
    const { data } = await usersApi().listUsers();
    setUsers(data);
  }


  const columns = [
    { id: 'firstName', label: 'Ime', minWidth: 170 },
    { id: 'lastName', label: 'Prezime', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'role', label: 'Status', minWidth: 170 },


    
    // {
    //   id: 'population',
    //   label: 'Population',
    //   minWidth: 170,
    //   align: 'right',
    //   format: (value) => value.toLocaleString('en-US'),
    // },  
    // {
    //   id: 'size',
    //   label: 'Size\u00a0(km\u00b2)',
    //   minWidth: 170,
    //   align: 'right',
    //   format: (value) => value.toLocaleString('en-US'),
    // },
    // {
    //   id: 'density',
    //   label: 'Density',
    //   minWidth: 170,
    //   align: 'right',
    //   format: (value) => value.toFixed(2),
    // },
  ];
  
  function createData(firstName, lastName, email, role) {
    return { firstName, lastName, email, role };
  }

  function handleCreateUser() {
    console.log("created")
  }
  

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);


  const rows  =  users?.data?.users?.map( (user) => {
    return createData(user?.firstName, user?.lastName, user?.email, user?.role)
  })

  return (
    <Paper elevation={2} sx={{width: '95%', height: '95%', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', flexDirection: 'column'}}>
    {/* {useri} */}
   <ActionButton handleClick={handleOpenCreateModal} endIcon={<AddIcon />} btnText={'Kreiraj'}/>
   <AddModal openCreateModal={openCreateModal} handleCloseCreateModal={handleCloseCreateModal} handleSubmit={handleCreateUser} modalText={'Dodaj korisnika'}  />

    <TableComponent rows={rows} columns={columns} createData={createData} />
    </Paper>
  )
}

export default AdminUsers