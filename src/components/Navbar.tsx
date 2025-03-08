import React, { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  Container,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  CircularProgress
} from '@mui/material';
import FactoryIcon from '@mui/icons-material/Factory';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import PaletteIcon from '@mui/icons-material/Palette';
import { APP_NAME } from '../lib/constants';
import { useAuth } from '../contexts/AuthContext';
import { useTheme, ThemeStyle, themeColors } from '../contexts/ThemeContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, signOut, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [signingOut, setSigningOut] = useState(false);
  
  const [themeMenuAnchor, setThemeMenuAnchor] = useState<null | HTMLElement>(null);
  const { theme, setTheme } = useTheme();
  
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    handleClose(); // Close the menu first
    setSigningOut(true);
    
    try {
      await signOut(); // The signOut function now handles navigation
    } catch (error) {
      console.error("Error signing out:", error);
      // Force navigation to home page even if there's an error
      window.location.href = '/';
    }
  };

  const handleDashboard = () => {
    handleClose();
    navigate('/dashboard');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const handleThemeMenu = (event: React.MouseEvent<HTMLElement>) => {
    setThemeMenuAnchor(event.currentTarget);
  };

  const handleThemeMenuClose = () => {
    setThemeMenuAnchor(null);
  };

  const handleThemeStyleChange = (style: ThemeStyle) => {
    setTheme({ ...theme, style });
    handleThemeMenuClose();
  };

  const handleThemeVariantToggle = () => {
    const newVariant = theme.variant === 'light' ? 'dark' : 'light';
    setTheme({ ...theme, variant: newVariant });
  };

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => setMobileOpen(false)}>
      <List>
        {!isAuthenticated ? (
          <>
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
            <Divider />
            <ListItem button component={RouterLink} to="/portal">
              <ListItemText primary="Portal" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button onClick={handleSignOut} disabled={signingOut}>
              <ListItemIcon>
                {signingOut ? <CircularProgress size={24} /> : <LogoutIcon />}
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItem>
          </>
        )}
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
        background: theme => theme.palette.mode === 'dark' ?
          'linear-gradient(135deg, rgba(17, 24, 39, 0.98) 0%, rgba(31, 41, 55, 0.98) 100%)' :
          'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(244, 247, 254, 0.98) 100%)',
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
            to={isAuthenticated ? "/dashboard" : "/"}
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              fontWeight: 'bold',
              fontFamily: 'inherit',
              color: 'text.secondary',
              textDecoration: 'none'
            }}
          >
            <FactoryIcon sx={{ mr: 1, color: 'text.secondary' }} />
            {APP_NAME}
          </Typography>
          </Box>
          
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
            {/* Only show these links for non-authenticated users */}
            {isAuthenticated && (
              <>
                <IconButton
                  onClick={handleThemeVariantToggle}
                  size="small"
                  sx={{ 
                    color: 'text.secondary',
                    bgcolor: 'action.hover',
                    '&:hover': {
                      bgcolor: 'action.selected',
                    }
                  }}
                >
                  {theme.variant === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>
                <IconButton
                  onClick={handleThemeMenu}
                  size="small"
                  sx={{ 
                    color: 'text.secondary',
                    bgcolor: 'action.hover',
                    '&:hover': {
                      bgcolor: 'action.selected',
                    }
                  }}
                >
                  <PaletteIcon />
                </IconButton>
                <Menu
                  anchorEl={themeMenuAnchor}
                  open={Boolean(themeMenuAnchor)}
                  onClose={handleThemeMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  {Object.keys(themeColors).map((style) => (
                    <MenuItem
                      key={style}
                      onClick={() => handleThemeStyleChange(style as ThemeStyle)}
                      selected={theme.style === style}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        minWidth: 180
                      }}
                    >
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          background: themeColors[style as ThemeStyle].gradient
                        }}
                      />
                      <Typography
                        sx={{
                          textTransform: 'capitalize',
                          fontWeight: theme.style === style ? 600 : 400
                        }}
                      >
                        {style}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Button 
                  component={RouterLink} 
                  to="/features" 
                  color="inherit"
                >
                  Features
                </Button>
                <Button 
                  component={RouterLink} 
                  to="/capabilities" 
                  color="inherit"
                >
                  Capabilities
                </Button>
                <Button 
                  component={RouterLink} 
                  to="/documentation" 
                  color="inherit"
                >
                  Documentation
                </Button>
              </>
            )}
            
            {isAuthenticated ? (
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                  disabled={loading || signingOut}
                >
                  {loading || signingOut ? (
                    <CircularProgress size={32} color="inherit" />
                  ) : (
                    <Avatar 
                      src={user?.profileImage}
                      sx={{ 
                        width: 32, 
                        height: 32,
                        bgcolor: 'primary.main',
                        border: '2px solid',
                        borderColor: 'background.paper'
                      }}
                    >
                      {user ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}` : 'U'}
                    </Avatar>
                  )}
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => {
                    handleClose();
                    navigate('/profile');
                  }}>
                    <ListItemIcon>
                      <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => {
                    handleClose();
                    navigate('/settings');
                  }}>
                    <ListItemIcon>
                      <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleSignOut} disabled={signingOut}>
                    <ListItemIcon>
                      {signingOut ? <CircularProgress size={20} /> : <LogoutIcon fontSize="small" />}
                    </ListItemIcon>
                    Sign Out
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button 
                component={RouterLink} 
                to="/portal" 
                variant="contained" 
                color="primary"
                sx={{ 
                  px: 4,
                  py: 0.8,
                  borderRadius: 2,
                  boxShadow: 2
                }}
              >
                Portal
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
      
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        PaperProps={{
          sx: {
            background: theme => theme.palette.mode === 'dark' ?
              'linear-gradient(135deg, rgba(17, 24, 39, 0.98) 0%, rgba(31, 41, 55, 0.98) 100%)' :
              'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(244, 247, 254, 0.98) 100%)',
            backdropFilter: 'blur(10px)'
          }
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

export default Navbar