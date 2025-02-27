import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  Container
} from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import { APP_NAME } from '../lib/constants';

const Navbar: React.FC = () => {
  return (
    <AppBar 
      position="static" 
      elevation={0} 
      sx={{ 
        backgroundColor: 'background.paper', 
        color: 'text.primary', 
        borderBottom: '1px solid', 
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ px: { xs: 0 } }}>
          <Typography 
            variant="h6" 
            component={RouterLink} 
            to="/"
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              flexGrow: 1, 
              fontWeight: 'bold', 
              color: 'primary.main',
              textDecoration: 'none'
            }}
          >
            <ConstructionIcon sx={{ mr: 1 }} />
            {APP_NAME}
          </Typography>
          
          <Box>
            <Button 
              component={RouterLink} 
              to="/features" 
              color="inherit"
              sx={{ mr: 1 }}
            >
              Features
            </Button>
            <Button 
              component={RouterLink} 
              to="/capabilities" 
              color="inherit"
              sx={{ mr: 1 }}
            >
              Capabilities
            </Button>
            <Button 
              component={RouterLink} 
              to="/tech-stack" 
              color="inherit"
              sx={{ mr: 1 }}
            >
              Tech Stack
            </Button>
            <Button 
              component={RouterLink} 
              to="/documentation" 
              color="inherit"
              sx={{ mr: 1 }}
            >
              Documentation
            </Button>
            <Button 
              component={RouterLink} 
              to="/contact" 
              variant="contained" 
              color="primary"
              sx={{ 
                px: 3,
                py: 0.8,
                borderRadius: 2,
                boxShadow: 2
              }}
            >
              Contact Us
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;