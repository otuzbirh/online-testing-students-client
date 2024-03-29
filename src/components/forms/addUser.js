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
import usersApi from "../../http/users";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  role: Yup.string().required("Role is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "teacher", label: "Teacher" },
  { value: "student", label: "Student" },
];

export default function AddUser({ open, handleClose }) {

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
      firstName: "",
      lastName: "",
      role: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      usersApi()
        .create(values)
        .then((res) => {
          handleClick({
            vertical: 'top',
            horizontal: 'right',
            message: 'Korisnik je uspješno kreiran!',
            severity: 'success'
          })
          handleClose();
          window.location.reload();
        
        })
        .catch((error) => {
          handleClick({
            vertical: 'top',
            horizontal: 'right',
            message: 'Greška prilikom kreiranja korisnika!',
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
            id="firstName"
            name="firstName"
            label="First Name"
            type="text"
            fullWidth
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            margin="dense"
            id="lastName"
            name="lastName"
            label="Last Name"
            type="text"
            fullWidth
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <TextField
            margin="dense"
            id="role"
            name="role"
            label="Role"
            select
            fullWidth
            value={formik.values.role}
            onChange={formik.handleChange}
            error={formik.touched.role && Boolean(formik.errors.role)}
            helperText={formik.touched.role && formik.errors.role}
          >
            {roleOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
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
