import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useFormik } from "formik";
import * as Yup from "yup";
import usersApi from "../../../../http/users";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setName,
  setSurname,
} from "./../../../../store/store";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Polje ime ne može biti prazno!"),
  lastName: Yup.string().required("Polje prezime ne može biti prazno!"),
  email: Yup.string()
    .email("Pogrešan format emaila")
    .required("Polje email je obavezno"),
  password: Yup.string().required("Polje šifre je obavezno"),
});

export default function StudentProfile() {
  const id = useSelector((state) => state.auth.userID);

  const [user, setUser] = useState({});

  const dispatch = useDispatch()

  function fetchUser() {
    usersApi()
      .singleUser(id)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((error) => {
        alert("Greška prilikom prikupljanja podataka o korisniku!", error.message);
      });
  }

  useEffect(() => {
    if (id !== "") {
      fetchUser();
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
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      password: user?.password,
    },
    validationSchema,
    onSubmit: (values) => {
      usersApi()
        .editUser(id, values)
        .then((res) => {
          if (res.status === 200) {
            handleClick({
              vertical: "top",
              horizontal: "right",
              message: "Uspješna promjena podataka!",
              severity: "success",
            });
            dispatch(setName(values.firstName));
            dispatch(setSurname(values.lastName));
          } else {
            console.log("Greska");
          }
        })
        .catch((error) => {
          handleClick({
            vertical: "top",
            horizontal: "right",
            message: "Greška prilikom promjene podataka!",
            severity: "error",
          });
          console.log(error);
        });
    },
  });

  const [firstNameLabel, setFirstNameLabel] = useState("");
  const [lastNameLabel, setLastNameLabel] = useState("");
  const [emailLabel, setEmailLabel] = useState("");
  const [passwordLabel, setPasswordLabel] = useState("");

  const handleFieldFocus = (fieldName) => {
    if (fieldName === "firstName") setFirstNameLabel("Ime");
    else if (fieldName === "lastName") setLastNameLabel("Prezime");
    else if (fieldName === "email") setEmailLabel("Email");
    else if (fieldName === "password") setPasswordLabel("Šifra");
  };

  const handleFieldBlur = () => {
    setFirstNameLabel(formik.values.firstName ? "" : "Ime");
    setLastNameLabel(formik.values.lastName ? "" : "Prezime");
    setEmailLabel(formik.values.email ? "" : "Email");
    setPasswordLabel(formik.values.password ? "" : "Šifra");
  };

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "80%",
        padding: 3,
      }}
      elevation={5}
    >
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
      <Avatar sx={{width: '70px', height: '70px', marginBottom: 2}}>
        <AccountCircleIcon sx={{width: '90%', height: '90%'}} />
      </Avatar>
      <Typography component="h1" variant="h5">
        Profil Studenta
      </Typography>
      <form sx={{ width: "100%", marginTop: 2 }} onSubmit={formik.handleSubmit}>
        <TextField
          variant="filled"
          margin="normal"
          fullWidth
          id="firstName"
          label={firstNameLabel}
          name="firstName"
          onFocus={() => handleFieldFocus("firstName")}
          onBlur={handleFieldBlur}
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && formik.errors.firstName}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          variant="filled"
          margin="normal"
          fullWidth
          id="lastName"
          label={lastNameLabel}
          name="lastName"
          value={formik.values.lastName}
          onFocus={() => handleFieldFocus("lastName")}
          onBlur={handleFieldBlur}
          onChange={formik.handleChange}
          error={formik.touched.lastName && formik.errors.lastName}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <TextField
          variant="filled"
          margin="normal"
          fullWidth
          id="email"
          label={emailLabel}
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onFocus={() => handleFieldFocus("email")}
          onBlur={handleFieldBlur}
          error={formik.touched.email && formik.errors.email}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          variant="filled"
          margin="normal"
          fullWidth
          name="password"
          label={passwordLabel}
          onFocus={() => handleFieldFocus("password")}
          onBlur={handleFieldBlur}
          type="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && formik.errors.password}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Spasi promjene
        </Button>
      </form>
    </Paper>
  );
}
