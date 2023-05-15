import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
} from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setIsAuthenticated, setRole, setUserID, setName, setSurname } from './../store/store';

export default function Login() {

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/auth/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const data = response.data;
      console.log({ data });
      dispatch(setIsAuthenticated(data.status));
      dispatch(setName(data.firstName));
      dispatch(setSurname(data.lastName));
      dispatch(setRole(data.role));
      dispatch(setUserID(data.id))
      if (data.status === true) {
        localStorage.setItem('token', data.token);
        if (data.role === 'teacher') {
          navigate('/teacher');
        } else if (data.role === 'admin') {
          navigate('/admin');
        } else if (data.role === 'student') {
          navigate('/student');
        } else {
          navigate('/');
        }
      } else {
        setError(data.msg);
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred while trying to log in');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <TextField
              id="email"
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Log in
            </Button>
          </Grid>
        </Grid>
      </form>
      {error && (
        <Typography variant="body1" color="error" align="center">
          {error}
        </Typography>
      )}
    </Container>
  );
}
