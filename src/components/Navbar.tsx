import React, { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import FactoryIcon from '@mui/icons-material/Factory';
import MenuIcon from '@mui/icons-material/Menu';
import { APP_NAME } from '../lib/constants';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => setMobileOpen(false)}>
      <List>
        <ListItem button component={RouterLink} to="/" selected={isActive('/')}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={RouterLink} to="/features" selected={isActive('/features')}>
          <ListItemText primary="Features" />
        </ListItem>
        <ListItem button component={RouterLink} to="/capabilities" selected={isActive('/capabilities')}>
          <ListItemText primary="Capabilities" />
        </ListItem>
        <ListItem button component={RouterLink} to="/documentation" selected={isActive('/documentation')}>
          <ListItemText primary="Documentation" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar 
      position="fixed"
      elevation={0} 
      sx={{
        borderBottom: '1px solid', 
        borderColor: 'divider',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        width: '100%',
        background: theme => theme.palette.background.paper,
        backdropFilter: 'blur(10px)'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ px: { xs: 0 }, display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Mobile menu button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography 
            variant="h6" 
            component={RouterLink} 
            to="/"
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              fontWeight: 'bold',
              fontFamily: 'inherit',
              color: 'text.primary',
              textDecoration: 'none'
            }}
          >
            <FactoryIcon sx={{ mr: 1, color: 'primary.main' }} />
            {APP_NAME}
          </Typography>
          </Box>
          
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
            {/* Only show these links for non-authenticated users */}
            <Button 
              component={RouterLink} 
              to="/features" 
              color="inherit"
              sx={{ color: 'text.primary' }}
            >
              Features
            </Button>
            <Button 
              component={RouterLink} 
              to="/capabilities" 
              color="inherit"
              sx={{ color: 'text.primary' }}
            >
              Capabilities
            </Button>
            <Button 
              component={RouterLink} 
              to="/documentation" 
              color="inherit"
              sx={{ color: 'text.primary' }}
            >
              Documentation
            </Button>
          </Box>
        </Toolbar>
      </Container>
      
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        PaperProps={{
          sx: {
            background: theme => theme.palette.background.paper
          },
        }}
        onClose={() => setMobileOpen(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 250,
            borderRight: '1px solid',
            borderColor: 'divider'
          }
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;