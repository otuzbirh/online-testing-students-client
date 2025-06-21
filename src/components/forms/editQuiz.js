import React, { useState, useEffect } from "react";
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
  Alert,
} from "@mui/material";
import quizApi from "../../http/quiz";
import { ContactSupportOutlined } from "@mui/icons-material";

const validationSchema = Yup.object().shape({
  quizname: Yup.string().required("Naziv ispita je obavezan"),
  quizdescription: Yup.string().required("Sadržaj ispita je obavezan"),
});


export default function EditQuiz({ open, handleClose, id }) {
  // Fetching quiz
  const [quiz, setQuiz] = useState({});

  const [quiznameLabel, setQuiznameLabel] = useState("");
  const [quizdescriptionLabel, setQuizdescriptionLabel] = useState("");


  const handleFieldFocus = (fieldName) => {
    if (fieldName === "quizname") setQuiznameLabel("Kviz");
    else if (fieldName === "quizdescription") setQuizdescriptionLabel("Opis");


  };

  const handleFieldBlur = () => {
    setQuiznameLabel(formik.values.quizname ? "" : "Kviz");
    setQuizdescriptionLabel(formik.values.quizdescription ? "" : "Opis");

  };


  function fetchQuiz() {
    quizApi()
      .singleQuiz(id)
      .then((res) => {
        setQuiz(res.data);

      })
      .catch((error) => {
        console.log("Error ocured while fetching user", error.message);
      });
  }

  useEffect(() => {
    if (id !== "") {
      fetchQuiz();
    } else {
      return;
    }
  }, [id]);




  const [state, setState] = useState({
    opened: false,
    vertical: "top",
    horizontal: "right",
    message: "",
    severity: "success",
  });
  const { vertical, horizontal, opened, message, severity } = state;

  function handleClick(newState) {
    setState({ opened: true, ...newState });
  }

  function handleCloseAlert() {
    setState({ ...state, opened: false });
  }



  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      quizname: quiz?.quizname,
      quizdescription: quiz?.quizdescription,

    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      quizApi()
        .editQuiz(id, values)
        .then((res) => {
          if (res.status === 200) {

            handleClick({
              vertical: "top",
              horizontal: "right",
              message: "Uspješna promjena kviza!",
              severity: "success",
            });
            // window.location.reload();

            setTimeout(() => {
              handleClose();
              window.location.reload();

            }, 2000)
          }
          else {
            console.log('Greska')
          }

        })
        .catch((error) => {
          handleClick({
            vertical: "top",
            horizontal: "right",
            message: "Greška prilikom uređivanja kviza!",
            severity: "error",
          });
          console.log(error);
        });
    },
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <Snackbar
        autoHideDuration={6000}
        anchorOrigin={{ vertical, horizontal }}
        open={opened}
        onClose={handleCloseAlert}
        key={vertical + horizontal}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <DialogTitle>Uredi korisnika</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="quizname"
            name="quizname"
            label={quiznameLabel}
            type="text"
            fullWidth
            onFocus={() => handleFieldFocus("quizname")}
            onBlur={handleFieldBlur}
            value={formik.values.quizname}
            onChange={formik.handleChange}
            error={formik.touched.quizname && Boolean(formik.errors.quizname)}
            helperText={formik.touched.quizname && formik.errors.quizname}
          />
          <TextField
            margin="dense"
            id="quizdescription"
            name="quizdescription"
            label={quizdescriptionLabel}
            type="text"
            fullWidth
            value={formik.values.quizdescription}
            onChange={formik.handleChange}
            onFocus={() => handleFieldFocus("quizdescription")}
            onBlur={handleFieldBlur}
            error={formik.touched.quizdescription && Boolean(formik.errors.quizdescription)}
            helperText={formik.touched.quizdescription && formik.errors.quizdescription}
          />

        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              color: "#ffffff",
              backgroundColor: "red",
              "&:hover": {
                backgroundColor: "red",
              },
            }}
          >
            Otkaži
          </Button>
          <Button
            type="submit"
            sx={{
              color: "#ffffff",
              backgroundColor: "green",
              "&:hover": {
                backgroundColor: "green",
              },
            }}
          >
            Spasi
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
