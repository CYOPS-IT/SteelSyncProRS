import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();
  
  React.useEffect(() => {
    // Keep location effect for future use
  }, [location]);

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
        <Navbar />
        <Box sx={{ display: 'flex', flex: 1, mt: '64px' }}>
          <Box
            component="main"
            sx={{
              width: '100%',
              flexGrow: 1,
              p: 3, 
              pb: 10,
              minHeight: '100%',
              display: 'flex',
              flexDirection: 'column',
              background: theme => theme.palette.background.default,
              backdropFilter: 'blur(10px)',
              borderRight: '1px solid',
              borderColor: theme => theme.palette.divider
            }}
          >
            <Outlet />
          </Box>
          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default Layout;