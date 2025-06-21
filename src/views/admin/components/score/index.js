import React, { useState, useEffect } from "react";
import { Paper } from "@mui/material";
import scoreApi from "../../../../http/score";
import SimpleTable from "../../../../components/table/simpleTable";
import DeleteScoreModal from "../../../../components/modals/deleteScore"


const Score = () => {
  const [scores, setScores] = useState([]);
  const [openDelete, setOpenDelete] = useState(false)
  const [selectedDeleteId, setSelectedDeleteId] = useState("")



  //fetching quizes
  async function fetchData() {
    const { data } = await scoreApi().listScores();
    setScores(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  //table config
  const columns = [
    { id: "id", label: "ID", minWidth: 170 },
    { id: "quizname", label: "Naziv", minWidth: 170 },
    { id: "studentname", label: "Ime", minWidth: 170 },
    { id: "studentsurname", label: "Prezime", minWidth: 170 },
    { id: "email", label: "Emaiil", minWidth: 170 },
    { id: "score", label: "Rezultat", minWidth: 170 },

  ];

  function createData(id, quizname, studentname, studentsurname, email, score) {
    return { id, quizname, studentname, studentsurname, email, score };
  }

  const rows = scores?.map((score) => {
    return createData(score?._id, score?.quizId?.quizname, score?.studentId?.firstName, score?.studentId?.lastName, score?.studentId?.email, score?.score);
  });

  //delete modal

  const handleOpenDeleteModal = () => setOpenDelete(true);
  const handleCloseDeleteModal = () => setOpenDelete(false);

  function handleDelete() {
    scoreApi().deleteScore(selectedDeleteId)
      .then((res) => {
        setTimeout(() => {
          setOpenDelete(false)
          window.location.reload()
        }, 1000)

      })
      .catch((error) => {
        alert('Došlo je do greškre prilikom brisanja rezultata!', error.message)
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


      <SimpleTable handleOpenDeleteModal={handleOpenDeleteModal} setSelectedDeleteId={setSelectedDeleteId} columns={columns} createData={createData} rows={rows} />
      <DeleteScoreModal open={openDelete} handleClose={handleCloseDeleteModal} handleDelete={handleDelete} />

    </Paper>
  );
};

export default Score;
