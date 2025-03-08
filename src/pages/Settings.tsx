import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
  Grid
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';
import DevicesIcon from '@mui/icons-material/Devices';
import LaptopIcon from '@mui/icons-material/Laptop';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { useTimezone } from '../contexts/TimezoneContext';

const Settings: React.FC = () => {
  // Notification settings
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    systemUpdates: true,
    maintenanceAlerts: true
  });

  // Security settings
  const [sessionTimeout, setSessionTimeout] = useState('30');

  const { timezone, setTimezone } = useTimezone();

  // Device history data
  const devices = [
    {
      device: 'Windows PC',
      icon: LaptopIcon,
      browser: 'Chrome (Windows 11)',
      lastUsed: 'Mar 7, 2025, 09:45 PM'
    },
    {
      device: 'MacBook Pro',
      icon: LaptopIcon,
      browser: 'Safari (macOS)',
      lastUsed: 'Mar 7, 2025, 07:35 PM'
    },
    {
      device: 'iPhone 13',
      icon: PhoneIphoneIcon,
      browser: 'Safari Mobile (iOS 17)',
      lastUsed: 'Mar 6, 2025, 09:45 PM'
    }
  ];

  const handleNotificationChange = (setting: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

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
        <Grid container spacing={3}>
          {/* Security Section */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <SecurityIcon color="primary" />
                <Typography variant="h6" fontWeight="bold">
                  Security
                </Typography>
              </Box>
              
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Two-Factor Authentication
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                  >
                    <MenuItem value="15">15 minutes</MenuItem>
                    <MenuItem value="30">30 minutes</MenuItem>
                    <MenuItem value="60">1 hour</MenuItem>
                    <MenuItem value="120">2 hours</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Typography variant="subtitle2" gutterBottom>
                Device History
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Device</TableCell>
                    <TableCell>Browser</TableCell>
                    <TableCell>Last Used</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {devices.map((device, index) => {
                    const Icon = device.icon;
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Icon fontSize="small" color="action" />
                            {device.device}
                          </Box>
                        </TableCell>
                        <TableCell>{device.browser}</TableCell>
                        <TableCell>{device.lastUsed}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </Grid>

          {/* Preferences Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <SettingsIcon color="primary" />
                <Typography variant="h6" fontWeight="bold">
                  Preferences
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Notifications
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.email}
                      onChange={() => handleNotificationChange('email')}
                      color="primary"
                    />
                  }
                  label="Email Notifications"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.push}
                      onChange={() => handleNotificationChange('push')}
                      color="primary"
                    />
                  }
                  label="Push Notifications"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.systemUpdates}
                      onChange={() => handleNotificationChange('systemUpdates')}
                      color="primary"
                    />
                  }
                  label="System Updates"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.maintenanceAlerts}
                      onChange={() => handleNotificationChange('maintenanceAlerts')}
                      color="primary"
                    />
                  }
                  label="Maintenance Alerts"
                />
              </Box>

              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Timezone
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value as string)}
                  >
                    <MenuItem value="UTC">UTC</MenuItem>
                    <MenuItem value="America/New_York">Eastern Time (ET)</MenuItem>
                    <MenuItem value="America/Chicago">Central Time (CT)</MenuItem>
                    <MenuItem value="America/Denver">Mountain Time (MT)</MenuItem>
                    <MenuItem value="America/Los_Angeles">Pacific Time (PT)</MenuItem>
                    <MenuItem value="Europe/London">London (GMT)</MenuItem>
                    <MenuItem value="Europe/Paris">Paris (CET)</MenuItem>
                    <MenuItem value="Asia/Tokyo">Tokyo (JST)</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default Settings;