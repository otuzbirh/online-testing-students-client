import React, { useState, useEffect } from "react";
import { Paper } from "@mui/material";
import scoreApi from "../../../../http/score";
import { useSelector } from "react-redux";
import SimpleTable from "../../../../components/table/simpleTable";



const Score = () => {
  const [scores, setScores] = useState([]);

  const studentId = useSelector((state) => state.auth.userID);

 
  //fetching quizes
  async function fetchData() {
    const { data } = await scoreApi().studentScores(studentId);
    setScores(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  //table config
  const columns = [
    { id: "id", label: "ID", minWidth: 170 },
    { id: "quizname", label: "Naziv", minWidth: 170 },
    { id: "score", label: "Rezultat", minWidth: 170 },
    
  ];

  function createData(id,  quizname,  score) {
    return {  id, quizname, score };
  }

  const rows = scores?.map((score) => {
    return createData(score?._id, score?.quizId?.quizname,  score?.score);
  });



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
     
  
      <SimpleTable  columns={columns} createData={createData} rows={rows} />
    </Paper>
  );
};

export default Score;
