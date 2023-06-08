import React, { useState, useEffect } from "react";
import { Paper } from "@mui/material";
import usersApi from "../../../../http/users";
import quizApi from "../../../../http/quiz";
import TableComponent from "../../../../components/table";
import ActionButton from "../../../../components/buttons/actionButton";
import AddIcon from "@mui/icons-material/Add";
import AddStudent from "../../../../components/forms/addStudent";
import EditStudent from "../../../../components/forms/editStudent";
import DeleteModal from "../../../../components/modals/deleteModal";

const Quiz = () => {
  const [quizes, setQuizes] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false)
  const [selectedUpdateId, setSelectedUpdateId] = useState("")
  const [selectedDeleteId, setSelectedDeleteId] = useState("")
  const [selectedName, setSelectedName] = useState("")

 
  //fetching quizes
  async function fetchData() {
    const { data } = await quizApi().listQuizes();
    setQuizes(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  //table config
  const columns = [
    { id: "id", label: "ID", minWidth: 170 },
    { id: "quizname", label: "Naziv", minWidth: 170 },
    { id: "quizdescription", label: "Opis", minWidth: 170 },
    { id: "owner", label: "Kreator", minWidth: 170 },
  ];

  function createData(id, quizname, quizdescription, owner) {
    return {  id, quizname, quizdescription, owner };
  }

  const rows = quizes?.map((user) => {
    return createData(user?.id, user?.quizname, user?.quizdescription, user?.owner);
  });

  //create modal
  const handleOpenCreateModal = () => setOpen(true);

  const handleCloseCreateModal = () => {
    setOpen(false);
  };

  //edit modal

  const handleOpenEditModal = () => setOpenEdit(true);
  const handleCloseEditModal = () => setOpenEdit(false)

  //delete modal

  const handleOpenDeleteModal = () => setOpenDelete(true);
  const handleCloseDeleteModal = () => setOpenDelete(false);

  function handleDelete () {
   usersApi().deleteUser(selectedDeleteId)
   .then((res) => {
    setTimeout(() => {
      setOpenDelete(false)
      window.location.reload()
    }, 1000)
      
   })
   .catch((error) => {
    alert('Došlo je do greškre prilikom brisanja korisnika!', error.message)
   })
  }

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
  
      <TableComponent rows={rows} columns={columns} createData={createData}  setSelectedUpdateId={setSelectedUpdateId} 
      handleOpenEditModal={handleOpenEditModal} handleOpenDeleteModal={handleOpenDeleteModal} setSelectedDeleteId={setSelectedDeleteId}  setSelectedName={setSelectedName} module="student"/>
      <AddStudent open={open} handleClose={handleCloseCreateModal} />
      <EditStudent open={openEdit} handleClose={handleCloseEditModal} id={selectedUpdateId} />
      <DeleteModal open={openDelete} handleClose={handleCloseDeleteModal} handleDelete={handleDelete} userName={selectedName}  />
    </Paper>
  );
};

export default Quiz;
