import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { APP_NAME } from '../lib/constants';
import { useTimezone } from '../contexts/TimezoneContext';

const Footer = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const { timezone } = useTimezone();
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getFormattedDateTime = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: timezone,
      timeZoneName: 'short'
    };
    
    return currentDateTime.toLocaleString('en-US', options);
  };

  return (
    <Box component="footer" sx={{
      py: 2, 
      borderTop: '1px solid', 
      borderColor: 'divider',
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1200,
      background: theme => theme.palette.mode === 'dark' ?
        'linear-gradient(135deg, rgba(17, 24, 39, 0.98) 0%, rgba(31, 41, 55, 0.98) 100%)' :
        'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(244, 247, 254, 0.98) 100%)',
      backdropFilter: 'blur(10px)',
      boxShadow: theme => theme.palette.mode === 'dark' ?
        '0 -4px 20px rgba(0, 0, 0, 0.2)' :
        '0 -4px 20px rgba(0, 0, 0, 0.1)'
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary" fontFamily="inherit" sx={{ fontWeight: 'bold' }}>
              © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="body2" color="text.secondary" fontFamily="inherit">
              Version 25.03.08.1
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{display: 'flex', justifyContent: {xs: 'flex-start', md: 'flex-end'}, alignItems: 'center'}}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <AccessTimeIcon fontSize="small" sx={{mr: 1, color: 'primary.main'}} />
              <Typography variant="body2" color="text.secondary" fontFamily="inherit">{getFormattedDateTime()}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;