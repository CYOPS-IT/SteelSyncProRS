import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Navbar from './Navbar';
import { useAuth } from '../contexts/AuthContext';
import Footer from './Footer';
import { useTheme as useAppTheme } from '../contexts/ThemeContext';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import FactoryIcon from '@mui/icons-material/Factory';
import BarChartIcon from '@mui/icons-material/BarChart';
import BuildIcon from '@mui/icons-material/Build';
import { APP_NAME } from '../lib/constants';

const DRAWER_WIDTH = 240;

const Layout = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [desktopOpen, setDesktopOpen] = React.useState(true);
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { getMuiTheme } = useAppTheme();
  const muiTheme = React.useMemo(() => createTheme(getMuiTheme()), [getMuiTheme, isAuthenticated]);

  const MENU_ITEMS = [
    { title: 'Dashboard', icon: DashboardIcon, path: '/dashboard' },
    { title: 'Production', icon: FactoryIcon, path: '/production' },
    { title: 'Inventory', icon: InventoryIcon, path: '/inventory' },
    { title: 'Analytics', icon: BarChartIcon, path: '/analytics' },
    { title: 'Maintenance', icon: BuildIcon, path: '/maintenance' }
  ];
  
  React.useEffect(() => {
    // Close mobile drawer when location changes
    setMobileOpen(false);
  }, [location]);

  const drawer = (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <IconButton onClick={() => setDesktopOpen(prev => !prev)}>
          {desktopOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>
      <List>
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <ListItem
              key={item.title}
              sx={{
                mb: 1,
                borderRadius: '10px',
                mx: desktopOpen ? 1 : '4px',
                width: desktopOpen ? 'auto' : '40px',
                height: '40px',
                p: 0,
                transition: 'all 0.2s ease-in-out',
                justifyContent: desktopOpen ? 'flex-start' : 'center',
                alignItems: 'center',
                bgcolor: theme => location.pathname === item.path 
                  ? theme.palette.mode === 'dark'
                    ? `${muiTheme.palette.primary.main}30`
                    : `${muiTheme.palette.primary.main}15`
                  : 'transparent',
                '&:hover': {
                  bgcolor: theme => theme.palette.mode === 'dark'
                    ? `${muiTheme.palette.primary.main}40`
                    : `${muiTheme.palette.primary.main}20`,
                  transform: 'translateX(4px)',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main'
                  }
                }
              }}
              button
            >
              <ListItemIcon sx={{
                minWidth: 'auto',
                mr: desktopOpen ? 2 : 0,
                width: 24,
                height: 24,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Icon 
                  sx={{ 
                    color: location.pathname === item.path ? 'text.secondary' : 'text.primary',
                    transition: 'color 0.2s ease-in-out'
                  }} 
                />
              </ListItemIcon>
              <ListItemText
                sx={{ 
                  opacity: desktopOpen ? 1 : 0,
                  display: desktopOpen ? 'block' : 'none'
                }}
                primary={item.title}
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                  color: theme => location.pathname === item.path 
                    ? 'text.secondary'
                    : 'text.primary'
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
        <Navbar />
        <Box sx={{ display: 'flex', flex: 1, mt: '64px' }}>
          {isAuthenticated && (
            <Box 
              component="nav" 
              sx={{ 
                flexShrink: 0,
                display: { xs: 'none', md: 'block' }
              }}
            >
              {/* Mobile drawer */}
              <Drawer
                variant="temporary"
                open={mobileOpen}
                PaperProps={{
                  sx: {
                    background: theme => theme.palette.mode === 'dark' ?
                      'linear-gradient(135deg, rgba(26, 26, 26, 0.98) 0%, rgba(13, 13, 13, 0.98) 100%)' :
                      'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(244, 247, 254, 0.98) 100%)',
                    backdropFilter: 'blur(10px)',
                    borderRight: '1px solid',
                    borderColor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                  }
                }}
                onClose={() => setMobileOpen(false)}
                ModalProps={{ keepMounted: true }}
                sx={{
                  display: { xs: 'block', md: 'none' },
                  '& .MuiDrawer-paper': { 
                    boxSizing: 'border-box', 
                    width: DRAWER_WIDTH,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  },
                }}
              >
                {drawer}
              </Drawer>
              
              {/* Desktop drawer */}
              <Drawer
                variant="permanent"
                open={desktopOpen}
                PaperProps={{
                  sx: {
                    background: theme => theme.palette.mode === 'dark' ?
                      'linear-gradient(135deg, rgba(26, 26, 26, 0.98) 0%, rgba(13, 13, 13, 0.98) 100%)' :
                      'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(244, 247, 254, 0.98) 100%)',
                    backdropFilter: 'blur(10px)',
                    borderRight: '1px solid',
                    borderColor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                  }
                }}
                sx={{
                  width: desktopOpen ? DRAWER_WIDTH : 48,
                  transition: muiTheme.transitions.create('width', {
                    easing: muiTheme.transitions.easing.sharp,
                    duration: muiTheme.transitions.duration.enteringScreen,
                  }),
                  '& .MuiDrawer-paper': { 
                    width: desktopOpen ? DRAWER_WIDTH : 48,
                    overflowX: 'hidden',
                    transition: muiTheme.transitions.create('width', {
                      easing: muiTheme.transitions.easing.sharp,
                      duration: muiTheme.transitions.duration.enteringScreen,
                    }),
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    pt: '64px'
                  },
                }}
              >
                {drawer}
              </Drawer>
            </Box>
          )}
          <Box
            component="main"
            sx={{
              width: '100%',
              flexGrow: 1,
              p: 3, 
              pb: 10,
              minHeight: '100%',
              display: 'flex',
              flexDirection: 'column',
              background: theme => theme.palette.mode === 'dark' 
                ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`
                : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
              backdropFilter: 'blur(10px)',
              borderRight: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Outlet />
          </Box>
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;