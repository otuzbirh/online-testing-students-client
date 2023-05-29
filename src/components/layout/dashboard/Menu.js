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
import { useSelector, useDispatch } from 'react-redux';
import {
  setIsAuthenticated,
} from "./../../../store/store";

const drawerWidth = 240;

const Menu = ({open, handleClose}) => {

  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const adminLinks = [
    { text: 'Users', icon: <PeopleIcon />, path: '/admin/users' },
    { text: 'Quiz', icon: <QuizIcon />, path: '/admin/quiz' },
    { text: 'Profile', icon: <PersonIcon />, path: '/admin/profile' },

  ];

  const teacherLinks = [
    { text: 'Quiz', icon: <QuizIcon />, path: '/teacher/quiz' },
    { text: 'Students', icon: <PeopleIcon />, path: '/teacher/students' },
    { text: 'Profile', icon: <PersonIcon />, path: '/teacher/profile' },
  ];

  const studentLinks = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Users', icon: <PeopleIcon />, path: '/users' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
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
            <ListItemText primary="Logout" />
          </ListItem>
        </Box>
      </Drawer>
    </>
  );
};

export default Menu;
