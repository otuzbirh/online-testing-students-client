import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';


const Header = ({handleOpen, open}) => {
    const name = useSelector((state) => state.auth.name);
    const surname = useSelector((state) => state.auth.surname);

 
  return (
    <AppBar position="static" sx={{backgroundColor: '#f9f9f9'}}>
      <Toolbar sx={{ display: 'flex', justifyContent: open === false ?  'space-between' : 'flex-end' }}>
       { open  === false ? <Typography variant="h6" noWrap>
          <MenuIcon onClick={handleOpen} sx={{color: '#253237', '&:hover': {cursor: 'pointer'}}} />
        </Typography> : ""
        }
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        {/* <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', marginRight: '10px'}}> */}
        <h4 style={{color: '#253237', fontWeight: 500, marginRight: 10}}>{name || "user" } </h4>
        <h4 style={{color: '#253237', marginRight: 10, fontWeight: 500,}}>{surname || "user" } </h4>
        {/* <h4 style={{color: 'black'}}>adnan@gmail.com</h4>
        </Box> */}
        <Avatar alt="Profile"/>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
