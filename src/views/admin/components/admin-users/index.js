import React, { useState, useEffect } from "react";
import { Paper } from "@mui/material";
import usersApi from "../../../../http/users";
import TableComponent from "../../../../components/table";
import ActionButton from "../../../../components/buttons/actionButton";
import AddIcon from "@mui/icons-material/Add";
import AddUser from "../../../../components/forms/addUser";
import EditUser from "../../../../components/forms/editUser";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedUpdateId, setSelectedUpdateId] = useState("")

  // useEffect(() => {
  //   setSelectedId(selectedId)
  // }, [selectedId])


  //fetching users
  async function fetchData() {
    const { data } = await usersApi().listUsers();
    setUsers(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  //table config
  const columns = [
    { id: "id", label: "ID", minWidth: 170 },
    { id: "firstName", label: "Ime", minWidth: 170 },
    { id: "lastName", label: "Prezime", minWidth: 170 },
    { id: "email", label: "Email", minWidth: 170 },
    { id: "role", label: "Status", minWidth: 170 },
  ];

  function createData(id, firstName, lastName, email, role) {
    return {  id, firstName, lastName, email, role };
  }

  const rows = users?.data?.users?.map((user) => {
    return createData(user?._id, user?.firstName, user?.lastName, user?.email, user?.role);
  });

  //create modal
  const handleOpenCreateModal = () => setOpen(true);

  const handleCloseCreateModal = () => {
    setOpen(false);
  };

  //edit modal

  const handleOpenEditModal = () => setOpenEdit(true);
  const handleCloseEditModal = () => setOpenEdit(false)


  return (
    <Paper
      elevation={5}
      sx={{
        width: "95%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        flexDirection: "column",
      }}
    >
      <ActionButton
        handleClick={handleOpenCreateModal}
        endIcon={<AddIcon />}
        btnText={"Kreiraj"}
      />
      <TableComponent rows={rows} columns={columns} createData={createData}  setSelectedUpdateId={setSelectedUpdateId} handleOpenEditModal={handleOpenEditModal} />
      <AddUser open={open} handleClose={handleCloseCreateModal} />
      <EditUser open={openEdit} handleClose={handleCloseEditModal} id={selectedUpdateId} />
    </Paper>
  );
};

export default AdminUsers;
