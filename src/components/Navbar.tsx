import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  Menu, 
  MenuItem, 
  Avatar, 
  Divider,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ConstructionIcon from '@mui/icons-material/Construction';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useAuth } from '../context/AuthContext';
import { APP_NAME } from '../lib/constants';

const Navbar: React.FC = () => {
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
    handleClose();
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const isAdmin = userProfile?.role === 'super_admin' || userProfile?.role === 'organization_admin';

  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: 'background.paper', color: 'text.primary', borderBottom: '1px solid', borderColor: 'divider' }}>
      <Toolbar>
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        
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

        {!isMobile && user && (
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <Button 
              component={RouterLink} 
              to="/dashboard" 
              color="inherit"
              startIcon={<DashboardIcon />}
              sx={{ mx: 1 }}
            >
              Dashboard
            </Button>
            <Button 
              component={RouterLink} 
              to="/projects" 
              color="inherit"
              startIcon={<FolderIcon />}
              sx={{ mx: 1 }}
            >
              Projects
            </Button>
            {isAdmin && (
              <Button 
                component={RouterLink} 
                to="/admin" 
                color="inherit"
                startIcon={<AdminPanelSettingsIcon />}
                sx={{ mx: 1 }}
              >
                Admin
              </Button>
            )}
          </Box>
        )}

        {user ? (
          <Box>
            <IconButton onClick={handleMenu} size="small">
              <Avatar 
                sx={{ width: 36, height: 36, bgcolor: 'primary.main' }}
                alt={user.email || ''}
                src={user.user_metadata?.avatar_url || ''}
              >
                {user.email?.charAt(0).toUpperCase() || 'U'}
              </Avatar>
            </IconButton>
            {/* Only render the Menu when anchorEl is not null */}
            {anchorEl && (
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    mt: 1.5,
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
              >
                <MenuItem component={RouterLink} to="/profile" onClick={handleClose}>
                  Profile
                </MenuItem>
                <MenuItem component={RouterLink} to="/settings" onClick={handleClose}>
                  Settings
                </MenuItem>
                {isAdmin && (
                  <MenuItem component={RouterLink} to="/admin" onClick={handleClose}>
                    Admin Dashboard
                  </MenuItem>
                )}
                <Divider />
                <MenuItem onClick={handleSignOut}>
                  Sign Out
                </MenuItem>
              </Menu>
            )}
          </Box>
        ) : (
          <Box>
            <Button 
              component={RouterLink} 
              to="/login" 
              color="inherit"
              sx={{ mr: 1 }}
            >
              Login
            </Button>
            <Button 
              component={RouterLink} 
              to="/register" 
              variant="contained" 
              color="primary"
              sx={{ 
                px: 3,
                py: 0.8,
                borderRadius: 2,
                boxShadow: 2
              }}
            >
              Sign Up
            </Button>
          </Box>
        )}
      </Toolbar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <ConstructionIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" color="primary.main" fontWeight="bold">
              {APP_NAME}
            </Typography>
          </Box>
          <Divider />
          <List>
            <ListItem button component={RouterLink} to="/dashboard">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={RouterLink} to="/projects">
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary="Projects" />
            </ListItem>
            {isAdmin && (
              <ListItem button component={RouterLink} to="/admin">
                <ListItemIcon>
                  <AdminPanelSettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Admin" />
              </ListItem>
            )}
            <ListItem button component={RouterLink} to="/settings">
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
            {user && (
              <ListItem button onClick={handleSignOut}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Out" />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;