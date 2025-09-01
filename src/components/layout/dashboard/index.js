import { useState } from 'react';
import { Container, Box } from '@mui/material';
import Menu from './Menu';




const Dashboard = ({ children }) => {

  const [open, setOpen] = useState(true);

  const handleToggle = () => {
    setOpen(!open);
  }

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      minWidth: '100%',
      flexDirection: 'row',
      position: 'relative',
      overflow: 'hidden !important'
    }}>

      <Menu handleToggle={handleToggle} open={open} />

      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        {/* <Header handleOpen={handleOpen} open={open} /> */}
        <Container maxWidth="xl" sx={{ 
          padding: 3, 
          display: 'flex', 
          width: '100%', 
          flexDirection: 'column', 
          minHeight: '100%',
          justifyContent: 'flex-start', 
          alignItems: 'stretch',
          overflow: 'visible'
        }}>
          {children}
        </Container>
        {/* <Footer /> */}
      </Box>
    </div>
  );
};

export default Dashboard;
