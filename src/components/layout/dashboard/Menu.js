import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link, Navigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import QuizIcon from '@mui/icons-material/Quiz';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import { useSelector, useDispatch } from 'react-redux';
import {
  setIsAuthenticated,
} from "./../../../store/store";

const drawerWidth = 240;

const Menu = ({open, handleClose}) => {

  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const adminLinks = [
    { text: 'Korisnici', icon: <PeopleIcon />, path: '/admin/users' },
    { text: 'Ispiti', icon: <QuizIcon />, path: '/admin/quiz' },
    { text: 'Rezultati', icon: <CreditScoreIcon />, path: '/admin/scores' },
    { text: 'Profil', icon: <PersonIcon />, path: '/admin/profile' },

  ];

  const teacherLinks = [
    { text: 'Ispiti', icon: <QuizIcon />, path: '/teacher/quiz' },
    { text: 'Studenti', icon: <PeopleIcon />, path: '/teacher/students' },
    { text: 'Rezultati', icon: <CreditScoreIcon />, path: '/teacher/scores' },
    { text: 'Profil', icon: <PersonIcon />, path: '/teacher/profile' },
  ];

  const studentLinks = [
   
    { text: 'Ispiti', icon: <QuizIcon />, path: '/student/quiz' },
    { text: 'Rezultati', icon: <CreditScoreIcon />, path: '/student/scores' },
    { text: 'Profil', icon: <PersonIcon />, path: '/student/profile' },



  ];

  const getLinks = (role) => {
    if (role === 'admin') {
      return adminLinks;
    } else if (role === 'teacher') {
      return teacherLinks;
    } else {
      return studentLinks;
    }
  };

  const menuItems = getLinks(role);

  function handleLogout()  {
    dispatch(setIsAuthenticated(false));
    <Navigate to='/' />

  }

 

  return (
    <>
      
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display: open ? 'block' : 'none',
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            backgroundColor: '#1a233a',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          <Typography variant="h6" sx={{ color: 'white', flexGrow: 1 }}>
           Online test
          </Typography>

          <IconButton
            edge="start"
            color="primary"
            aria-label="menu"
            onClick={handleClose}
            sx={{  zIndex: '100', color: 'white' }}
          >
            {open ? <CloseIcon /> : ""}
          </IconButton>
       
        </Box>
     
        <Divider />

        <List>
          {menuItems?.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              sx={{
                color: 'white',
                '&.Mui-selected': {
                  backgroundColor: '#ffd54f',
                },
                '&:hover': {
                  backgroundColor: '#546e7a',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>

        <Divider />

        <Box sx={{ p: 2 }}>
          <ListItem
            button
            onClick={handleLogout}
            sx={{
              color: 'white',
              '&:hover': {
                backgroundColor: '#546e7a',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'white' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Odjava" />
          </ListItem>
        </Box>
      </Drawer>
    </>
  );
};

export default Menu;
