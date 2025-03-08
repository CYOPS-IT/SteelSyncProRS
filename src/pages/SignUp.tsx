import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import SignUpForm from '../components/auth/SignUpForm';
import { APP_NAME } from '../lib/constants';

const SignUp: React.FC = () => {
  return (
    <Box sx={{ py: 8, minHeight: 'calc(100vh - 200px)', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                Join {APP_NAME}
              </Typography>
              <Typography variant="h6" paragraph color="text.secondary">
                Create an account to access our powerful steel manufacturing management platform and streamline your operations.
              </Typography>
            </Box>
            <Box 
              component="img"
              src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
              alt="Steel manufacturing"
              sx={{ 
                width: '100%', 
                borderRadius: 4,
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                display: { xs: 'none', md: 'block' }
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SignUpForm />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SignUp;