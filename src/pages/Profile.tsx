import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Stack, Divider } from '@mui/material';
import { useState } from 'react';
import UserProfile from '../components/profile/UserProfile';
import RecentActivity from '../components/profile/RecentActivity';
import SecuritySettings from '../components/profile/SecuritySettings';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <Box>
      <Box 
        sx={{ 
          bgcolor: 'background.paper',
          color: 'white',
          py: 6,
          borderBottom: '1px solid',
          borderColor: 'divider',
          position: 'relative',
          color: 'text.primary',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: theme => `linear-gradient(135deg, ${theme.palette.primary.main}95, ${theme.palette.primary.dark}95)`,
            zIndex: 1
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="text.primary">
            My Profile
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Manage your account settings and preferences
          </Typography>
        </Container>
      </Box>
      
      <Container maxWidth="lg" sx={{ mt: -4, position: 'relative', zIndex: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={4}>
            <Card sx={{ p: 3, height: '100%', boxShadow: 3 }}>
              <UserProfile />
            </Card>
          </Grid>
          
          <Grid item xs={12} lg={8}>
            <Stack spacing={3}>
              <Card sx={{ p: 3, boxShadow: 3 }}>
                <SecuritySettings />
              </Card>
              
              <Card sx={{ p: 3, boxShadow: 3 }}>
                <RecentActivity />
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile;