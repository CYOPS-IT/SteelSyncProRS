import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { APP_NAME } from '../lib/constants';

const Footer = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDateTime = currentDateTime.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <Box component="footer" sx={{bgcolor: 'background.paper', py: 4, borderTop: '1px solid', borderColor: 'divider'}}>
      <Container maxWidth="lg">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} />
          <Grid item xs={12} md={4} sx={{display: 'flex', justifyContent: {xs: 'flex-start', md: 'flex-end'}}}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <AccessTimeIcon fontSize="small" sx={{mr: 1, color: 'primary.main'}} />
              <Typography variant="body2" color="text.secondary">{formattedDateTime}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;