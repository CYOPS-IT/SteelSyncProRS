import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import ThemeSelector from '../components/ThemeSelector';
import SettingsIcon from '@mui/icons-material/Settings';

const Settings: React.FC = () => {
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <SettingsIcon sx={{ fontSize: 32, color: 'primary.main' }} />
            <Typography variant="h4" component="h1" fontWeight="bold">
              Settings
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: -4, position: 'relative', zIndex: 3 }}>
        <ThemeSelector />
      </Container>
    </Box>
  );
};

export default Settings;