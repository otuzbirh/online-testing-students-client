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
import usersApi from "../../http/users";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  role: Yup.string().required("Role is required"),
  // email: Yup.string().email("Invalid email").required("Email is required"),
  // password: Yup.string().required("Password is required"),
});

const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "teacher", label: "Teacher" },
  { value: "student", label: "Student" },
];

export default function EditUser({ open, handleClose, id }) {
  // Fetching user
  const [user, setUser] = useState({});

  const [firstNameLabel, setFirstNameLabel] = useState("");
  const [lastNameLabel, setLastNameLabel] = useState("");
  const [roleLabel, setRoleLabel] = useState("");



  const handleFieldFocus = (fieldName) => {
    if (fieldName === "firstName") setFirstNameLabel("Ime");
    else if (fieldName === "lastName") setLastNameLabel("Prezime");
    else if (fieldName === "role") setLastNameLabel("Status");

  };

  const handleFieldBlur = () => {
    setFirstNameLabel(formik.values.firstName ? "" : "Ime");
    setLastNameLabel(formik.values.lastName ? "" : "Prezime");
    setRoleLabel(formik.values.role ? "" : "Status");

    // setEmailLabel(formik.values.email ? "" : "Email");
    // setPasswordLabel(formik.values.password ? "" : "Šifra");
  };
 

  function fetchUser() {
    usersApi()
      .singleUser(id)
      .then((res) => {
        setUser(res.data.user);

      })
      .catch((error) => {
        console.log("Error ocured while fetching user", error.message);
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
    role: user?.role,
    // email: user?.email,
    // password: user?.password,
   },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      usersApi()
        .editUser(id, values)
        .then((res) => {
          if(res.status === 200) {
    
          handleClick({
            vertical: "top",
            horizontal: "right",
            message: "Uspješna promjena korisnikovih podataka!",
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
            message: "Greška prilikom uređivanja korisnika!",
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
            id="firstName"
            name="firstName"
            label={firstNameLabel}
            type="text"
            fullWidth
            onFocus={() => handleFieldFocus("firstName")}
            onBlur={handleFieldBlur}
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            margin="dense"
            id="lastName"
            name="lastName"
            label={lastNameLabel}
            type="text"
            fullWidth
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onFocus={() => handleFieldFocus("lastName")}
            onBlur={handleFieldBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <TextField
            margin="dense"
            id="role"
            name="role"
            label={roleLabel}
            select
            fullWidth
            value={formik.values.role}
            onFocus={() => handleFieldFocus("role")}
            onBlur={handleFieldBlur}
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
          {/* <TextField
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
          /> */}
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
