import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StarIcon from '@mui/icons-material/Star';
import FactoryIcon from '@mui/icons-material/Factory';
import InventoryIcon from '@mui/icons-material/Inventory';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FolderIcon from '@mui/icons-material/Folder';
import SettingsIcon from '@mui/icons-material/Settings';

interface SidebarProps {
  open: boolean;
  toggleSidebar: () => void;
}

const drawerWidth = 240;
const collapsedWidth = 64;

const Sidebar: React.FC<SidebarProps> = ({ open, toggleSidebar }) => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Simplified menu items
  const menuItems = [
    { text: 'Features', icon: <StarIcon />, path: '/features' },
    { text: 'Capabilities', icon: <FactoryIcon />, path: '/capabilities' },
    { text: 'Tech Stack', icon: <FolderIcon />, path: '/tech-stack' },
    { text: 'Documentation', icon: <SettingsIcon />, path: '/documentation' },
  ];

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? { xs: 0, md: drawerWidth } : { xs: 0, md: collapsedWidth },
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? { xs: 0, md: drawerWidth } : { xs: 0, md: collapsedWidth },
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
          pt: 0,
          mt: '64px', // Space for fixed header
          mb: '56px', // Space for fixed footer
          height: 'auto',
          top: 0,
          bottom: 0,
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      <Box sx={{ overflow: 'auto', height: '100%', position: 'relative' }}>
        <IconButton 
          onClick={toggleSidebar}
          sx={{ 
            position: 'absolute', 
            right: 8, 
            top: 8, 
            display: { xs: 'none', md: 'flex' },
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: 1,
            '&:hover': { bgcolor: 'background.paper' }
          }}
        >
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
        
        <List sx={{ mt: 6 }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  component={RouterLink}
                  to={item.path}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    borderLeft: isActive ? '4px solid' : 'none',
                    borderColor: isActive ? 'primary.main' : 'transparent',
                    bgcolor: isActive ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: isActive ? 'primary.main' : 'inherit',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    sx={{ 
                      opacity: open ? 1 : 0,
                      '& .MuiTypography-root': {
                        fontWeight: isActive ? 'bold' : 'normal',
                      }
                    }} 
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;