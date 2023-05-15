import React, {useEffect, useState} from 'react';
import { Container, Box } from '@mui/material';
import Header from './Header';
import Menu from './Menu';
import Footer from './Footer';



const Dashboard = ({ children }) => {

    const [open, setOpen] = useState(true);

    const handleOpen = () => {
        setOpen(true);
      };

      const handleClose = () => { 
        setOpen(false)
      }

   

  return (
    <div style={{ display: 'flex',
    minHeight: '100vh',
    minWidth: '100%',
    flexDirection: 'row'}}>
     
      <Menu handleClose={handleClose} open={open}  />

      <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
      <Header handleOpen={handleOpen} open={open}/>
      <Container maxWidth="lg" sx={{padding: 3, display: 'flex', width: '100%', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
        {children}
      </Container>
      <Footer />
      </Box>
    </div>
  );
};

export default Dashboard;
