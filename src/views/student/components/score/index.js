import React, { useState, useEffect } from "react";
import { Paper, Box, Typography, CircularProgress, Alert } from "@mui/material";
import scoreApi from "../../../../http/score";
import { useSelector } from "react-redux";
import SimpleTable from "../../../../components/table/simpleTable";

const Score = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const studentId = useSelector((state) => state.auth.userID);

  //fetching scores
  async function fetchData() {
    try {
      setLoading(true);
      setError(null);
      const { data } = await scoreApi().studentScores(studentId);
      setScores(data);
    } catch (err) {
      setError('Greška pri učitavanju rezultata. Molimo pokušajte ponovo.');
      console.error('Error fetching scores:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (studentId) {
      fetchData();
    }
  }, [studentId]);

  //table config
  const columns = [
    { id: "id", label: "ID", minWidth: 170 },
    { id: "quizname", label: "Naziv", minWidth: 170 },
    { id: "score", label: "Rezultat", minWidth: 170 },
  ];

  function createData(id, quizname, score) {
    return { id, quizname, score };
  }

  const rows = scores?.map((score) => {
    return createData(score?._id, score?.quizId?.quizname, score?.score);
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
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
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      <Box sx={{ 
        p: 3, 
        textAlign: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          Moji rezultati
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          Pregled svih vaših rezultata na kvizovima
        </Typography>
      </Box>
      
      <SimpleTable 
        columns={columns} 
        createData={createData} 
        rows={rows} 
      />
    </Paper>
  );
};

export default Score;
