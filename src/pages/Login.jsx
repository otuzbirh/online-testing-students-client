import React, { useState, useMemo } from "react";
import { CircularProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Paper,
  Grid,
  CssBaseline,
  Avatar,
  Box,
} from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setIsAuthenticated,
  setRole,
  setUserID,
  setName,
  setSurname,
} from "./../store/store";
import { isEmail } from "./../utilities/fields/validations";
import AuthTextInput from "../components/auth-input/authTextInput";
import AuthPasswordInput from "../components/auth-input/authPasswordInput";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

const validations = {
  password: (value) => {
    if (!value) return "Polje passworda je obavezno";
    if (value.length < 4)
      return "Password mora sadržavati minimalno 4 karaktera";
    if (value.length > 20)
      return "Password maksimalno može sadržavati 20 karaktera";
    return null;
  },

  email: (value) => {
    if (!value) return "Email polje je obavezno";
    if (!isEmail(value)) return "Email je u pogrešnom formatu";
    return null;
  },
};

export default function Login() {
  const dispatch = useDispatch();

  const [error, setError] = useState(""); // State variable for error message

  // Email
  const [email, setEmail] = useState({
    value: "",
    error: validations.email(""),
    label: "Email",
  });
  const changeEmail = (value) =>
    setEmail({ ...email, value, error: validations.email(value) });

  // Password
  const [password, setPassword] = useState({
    value: "",
    error: validations.password(""),
    label: "Password",
  });
  const changePassword = (value) =>
    setPassword({ ...password, value, error: validations.password(value) });

  // Form
  const [triedToSubmitAtLeastOnce, setTriedToSubmitAtLeastOnce] =
    useState(false);
  const [loading, setLoading] = useState(false);

  const formHasErrors = useMemo(
    () => !!(email.error || password.error),
    [email.error, password.error]
  );
  const buttonsDisabled = useMemo(
    () => triedToSubmitAtLeastOnce && formHasErrors,
    [triedToSubmitAtLeastOnce, formHasErrors]
  );

  const navigate = useNavigate();

  const loginData = {
    email: email.value,
    password: password.value,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTriedToSubmitAtLeastOnce(true);
    if (formHasErrors) return;

    setLoading(true);

    const apiUrl =
      process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_API_URL_LOCAL
        : process.env.REACT_APP_API_URL_PRODUCTION;

    console.log({ apiUrl });

    try {
      const response = await axios.post(
        `${apiUrl}/auth/login`,

        loginData,
        { headers: { "Content-Type": "application/json" } }
      );

      const data = response.data;
      dispatch(setIsAuthenticated(data.status));
      dispatch(setName(data.firstName));
      dispatch(setSurname(data.lastName));
      dispatch(setRole(data.role));
      dispatch(setUserID(data.id));
      if (data.status === true) {
        localStorage.setItem("token", data.token);
        if (data.role === "teacher") {
          navigate("/teacher/students");
        } else if (data.role === "admin") {
          navigate("/admin/users");
        } else if (data.role === "student") {
          navigate("/student/quiz");
        } else {
          navigate("/");
        }
      } else {
        setError("Unijeli ste pogrešne podatke! Pokušajte ponovo");
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        setError("Pogrešni podaci za prijavu!");
      } else {
        setError("Došlo je do greške prilikom prijave. Pokušajte ponovo!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          className="login-background"
          sx={{
            // backgroundImage:
            //   // "url(https://source.unsplash.com/random?wallpapers)",
            //   "url(./../../../public/assets/images/login-image.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={2} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Avatar
              sx={{
                m: 1,
                bgcolor: "primary.main",
                height: "60px",
                width: "60px",
              }}
            >
              <AccountCircleIcon sx={{ height: "90%", width: "90%" }} />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              sx={{ textAlign: "center" }}
            >
              Dobrodošli na Platformu za online testiranje studenata
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <AuthTextInput
                fieldData={email}
                onChange={changeEmail}
                triedToSubmitAtLeastOnce={triedToSubmitAtLeastOnce}
              />

              <AuthPasswordInput
                fieldData={password}
                onChange={changePassword}
                triedToSubmitAtLeastOnce={triedToSubmitAtLeastOnce}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                disabled={buttonsDisabled || loading}
                sx={{
                  mt: 1,
                  mb: 2,
                  textTransform: "none",
                  color: "#ffffff",
                  fontSize: "15px",
                  height: "58px",
                  "&:hover": {
                    backgroundColor: "#06439E",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Prijava"
                )}
              </Button>

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                {error && (
                  <Typography
                    variant="body2"
                    color="error"
                    align="center"
                    sx={{ mt: 1, textAlign: "center" }}
                  >
                    {error}
                  </Typography>
                )}
              </Box>
              {/* <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid> */}
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
