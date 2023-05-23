import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  Container,
 
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

    if(email.length === 0 || password.length === 0){
      setError(true);
    }
    
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/auth/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
     
      const data = response.data;
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
          navigate('/admin/users');
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
    <div className='back--img'>
    <Container maxWidth="sm">
      <Typography fontFamily={'serif'}  variant="h3" component="h1" align="center" marginTop={22} gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        
        <div className='login--form'>
        <div className='form--img'>
        </div>
          <div className='email--form'>
            <TextField
              id="email"
              label="Email"
              type="email"
              variant="filled"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {error && email.length<=0?
          <label htmlFor='email' className='email--label'>*Email is required</label>: ""}
          
          <div className='passw--form'>
            <TextField 
              id="password"
              label="Password"
              type="password"
              variant="filled"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && password.length<=0?
          <label htmlFor='password' className='passw--label'>*Password is required</label>:""}
          <div >
            <Button className='btn' type="submit" formNoValidate fullWidth>
              LOG IN
            </Button>
          </div>
        </div>
      </form>
      {error && (
        <Typography fontFamily={'serif'} variant="body1" color="error" align="center">
          {error}
        </Typography>
      )}
    </Container>
    </div>
  );
}
