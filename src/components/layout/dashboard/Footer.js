import React from 'react';
import { Typography, Link } from '@mui/material';



const Footer = () => {

  return (
    <footer style={{ backgroundColor: '#f9f9f9', padding: 6, marginTop: 'auto', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;' }}>

      <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        © {new Date().getFullYear()}  All rights reserved.
      </Typography>

    </footer>
  );
};

export default Footer;
