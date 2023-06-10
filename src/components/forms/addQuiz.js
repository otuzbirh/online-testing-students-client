import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Snackbar,
  Alert
} from "@mui/material";
import quizApi from "../../http/quiz";
import { useSelector } from "react-redux";

const validationSchema = Yup.object().shape({
  quizname: Yup.string().required("Naziv ispita je obavezan"),
  quizdescription: Yup.string().required("Opis ispita je obavezan"),
});


export default function AddQuiz({ open, handleClose }) {

    const ownerId = useSelector((state) => state.auth.userID);


  const [state, setState] = useState({
    opened: false,
    vertical: 'top',
    horizontal: 'right',
    message: '',
    severity: 'success'
  });
  const { vertical, horizontal, opened, message, severity } = state;

  function handleClick(newState) {
    setState({ opened: true, ...newState });
  };

  function handleCloseAlert() {
    setState({...state, opened: false})
  }

  const formik = useFormik({
    initialValues: {
      quizname: "",
      quizdescription: "",
      owner: ownerId,
 
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      quizApi()
        .create(values)
        .then((res) => {
          handleClick({
            vertical: 'top',
            horizontal: 'right',
            message: 'Ispit je uspješno kreiran!',
            severity: 'success'
          })
          handleClose();
          window.location.reload();
        
        })
        .catch((error) => {
          handleClick({
            vertical: 'top',
            horizontal: 'right',
            message: 'Greška prilikom kreiranja ispita!',
            severity: 'error'
          });
          console.log(error)
        });
    },
  });



  return (
    <Dialog open={open} onClose={handleClose}>
        <Snackbar utoHideDuration={6000}
          anchorOrigin={{ vertical, horizontal }}
          open={opened}
          onClose={handleCloseAlert}
          key={vertical + horizontal}
      >
        <Alert onClose={handleCloseAlert} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <DialogTitle>Kreiraj korisnika</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="quizname"
            name="quizname"
            label="Naziv ispita"
            type="text"
            fullWidth
            value={formik.values.quizname}
            onChange={formik.handleChange}
            error={formik.touched.quizname && Boolean(formik.errors.quizname)}
            helperText={formik.touched.quizname && formik.errors.quizname}
          />
          <TextField
            margin="dense"
            id="quizdescription"
            name="quizdescription"
            label="Sadržaj ispita"
            type="text"
            fullWidth
            value={formik.values.quizdescription}
            onChange={formik.handleChange}
            error={formik.touched.quizdescription && Boolean(formik.errors.quizdescription)}
            helperText={formik.touched.quizdescription && formik.errors.quizdescription}
          />
      
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{color: '#ffffff', backgroundColor: 'red', '&:hover': {
            backgroundColor: 'red'
          }}}>
            Otkaži
          </Button>
          <Button type="submit" sx={{color: '#ffffff', backgroundColor: 'green', '&:hover': {
            backgroundColor: 'green'
          }}} >
            Kreiraj
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
