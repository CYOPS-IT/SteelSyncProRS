import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import SignInForm from '../components/auth/SignInForm';
import { APP_NAME } from '../lib/constants';

const SignIn: React.FC = () => {
  return (
    <Box sx={{ py: 8, minHeight: 'calc(100vh - 200px)', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                Welcome Back
              </Typography>
              <Typography variant="h6" paragraph color="text.secondary">
                Sign in to your {APP_NAME} account to access your dashboard, manage your projects, and more.
              </Typography>
            </Box>
            <Box 
              component="img"
              src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
              alt="Manufacturing dashboard"
              sx={{ 
                width: '100%', 
                borderRadius: 4,
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                display: { xs: 'none', md: 'block' }
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SignInForm />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SignIn;