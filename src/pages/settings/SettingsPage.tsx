import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  IconButton,
  Tooltip
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LanguageIcon from '@mui/icons-material/Language';
import PaletteIcon from '@mui/icons-material/Palette';
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('notifications');
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    projectUpdates: true,
    securityAlerts: true,
    marketingEmails: false
  });
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const handleNotificationChange = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    });
  };

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };

  const handleThemeChange = (event: SelectChangeEvent) => {
    setTheme(event.target.value);
  };

  const handleSaveSettings = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      // In a real app, you would save these settings to the database
      // For this demo, we'll just simulate a successful save
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user metadata with settings
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          settings: {
            notifications: notificationSettings,
            language,
            theme
          }
        }
      });
      
      if (updateError) throw updateError;
      
      setSuccess(true);
    } catch (err: any) {
      console.error('Error saving settings:', err);
      setError(err.message || 'Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'notifications':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Notification Settings
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Control how and when you receive notifications from the system
            </Typography>
            
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Email Notifications
                </Typography>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNotificationChange('emailNotifications')}>
                      <ListItemText 
                        primary="Email Notifications" 
                        secondary="Receive notifications via email" 
                      />
                      <Switch 
                        edge="end"
                        checked={notificationSettings.emailNotifications}
                        onChange={() => handleNotificationChange('emailNotifications')}
                      />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNotificationChange('projectUpdates')}>
                      <ListItemText 
                        primary="Project Updates" 
                        secondary="Get notified about changes to your projects" 
                      />
                      <Switch 
                        edge="end"
                        checked={notificationSettings.projectUpdates}
                        onChange={() => handleNotificationChange('projectUpdates')}
                      />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNotificationChange('securityAlerts')}>
                      <ListItemText 
                        primary="Security Alerts" 
                        secondary="Receive alerts about security-related events" 
                      />
                      <Switch 
                        edge="end"
                        checked={notificationSettings.securityAlerts}
                        onChange={() => handleNotificationChange('securityAlerts')}
                      />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNotificationChange('marketingEmails')}>
                      <ListItemText 
                        primary="Marketing Emails" 
                        secondary="Receive promotional content and updates" 
                      />
                      <Switch 
                        edge="end"
                        checked={notificationSettings.marketingEmails}
                        onChange={() => handleNotificationChange('marketingEmails')}
                      />
                    </ListItemButton>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Notification Schedule
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Choose when you want to receive notifications
                </Typography>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="notification-frequency-label">Notification Frequency</InputLabel>
                  <Select
                    labelId="notification-frequency-label"
                    value="daily"
                    label="Notification Frequency"
                  >
                    <MenuItem value="realtime">Real-time</MenuItem>
                    <MenuItem value="hourly">Hourly Digest</MenuItem>
                    <MenuItem value="daily">Daily Digest</MenuItem>
                    <MenuItem value="weekly">Weekly Digest</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="quiet-hours-label">Quiet Hours</InputLabel>
                  <Select
                    labelId="quiet-hours-label"
                    value="none"
                    label="Quiet Hours"
                  >
                    <MenuItem value="none">No quiet hours</MenuItem>
                    <MenuItem value="night">Night (10 PM - 7 AM)</MenuItem>
                    <MenuItem value="work">Work hours (9 AM - 5 PM)</MenuItem>
                    <MenuItem value="custom">Custom</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
            </Card>
          </Box>
        );
        
      case 'security':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Security Settings
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Manage your account security and privacy preferences
            </Typography>
            
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Password
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  It's a good idea to use a strong password that you don't use elsewhere
                </Typography>
                <Button variant="outlined">
                  Change Password
                </Button>
              </CardContent>
            </Card>
            
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Two-Factor Authentication
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Add an extra layer of security to your account
                </Typography>
                <Button variant="outlined" color="secondary">
                  Enable 2FA
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Login Sessions
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Manage your active sessions and sign out from other devices
                </Typography>
                <Button variant="outlined" color="error">
                  Sign Out All Other Sessions
                </Button>
              </CardContent>
            </Card>
          </Box>
        );
        
      case 'appearance':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Appearance Settings
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Customize how the application looks and feels
            </Typography>
            
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Theme
                </Typography>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel id="theme-select-label">Theme</InputLabel>
                  <Select
                    labelId="theme-select-label"
                    value={theme}
                    label="Theme"
                    onChange={handleThemeChange}
                  >
                    <MenuItem value="light">Light</MenuItem>
                    <MenuItem value="dark">Dark</MenuItem>
                    <MenuItem value="system">System Default</MenuItem>
                  </Select>
                </FormControl>
                
                <Typography variant="subtitle1" gutterBottom>
                  Language
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="language-select-label">Language</InputLabel>
                  <Select
                    labelId="language-select-label"
                    value={language}
                    label="Language"
                    onChange={handleLanguageChange}
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="es">Spanish</MenuItem>
                    <MenuItem value="fr">French</MenuItem>
                    <MenuItem value="de">German</MenuItem>
                    <MenuItem value="zh">Chinese</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Dashboard Layout
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Customize your dashboard view
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="layout-select-label">Default Layout</InputLabel>
                  <Select
                    labelId="layout-select-label"
                    value="compact"
                    label="Default Layout"
                  >
                    <MenuItem value="compact">Compact</MenuItem>
                    <MenuItem value="comfortable">Comfortable</MenuItem>
                    <MenuItem value="detailed">Detailed</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
            </Card>
          </Box>
        );
        
      case 'about':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              About Steel Sync Pro
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Information about the application and system
            </Typography>
            
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Application Information
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText 
                      primary="Version" 
                      secondary="1.0.0" 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Build Date" 
                      secondary="May 15, 2025" 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="License" 
                      secondary="Enterprise" 
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Support
                </Typography>
                <Typography variant="body2" paragraph>
                  If you need assistance, please contact our support team:
                </Typography>
                <Typography variant="body2">
                  Email: support@steelsyncpro.com
                </Typography>
                <Typography variant="body2">
                  Phone: +1 (555) 123-4567
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button variant="outlined" startIcon={<HelpIcon />}>
                    View Documentation
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        );
        
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Settings
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Customize your application preferences and account settings
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ mb: { xs: 3, md: 0 } }}>
            <List component="nav" aria-label="settings navigation">
              <ListItemButton
                selected={activeSection === 'notifications'}
                onClick={() => handleSectionChange('notifications')}
              >
                <ListItemIcon>
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText primary="Notifications" />
              </ListItemButton>
              
              <ListItemButton
                selected={activeSection === 'security'}
                onClick={() => handleSectionChange('security')}
              >
                <ListItemIcon>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText primary="Security & Privacy" />
              </ListItemButton>
              
              <ListItemButton
                selected={activeSection === 'appearance'}
                onClick={() => handleSectionChange('appearance')}
              >
                <ListItemIcon>
                  <PaletteIcon />
                </ListItemIcon>
                <ListItemText primary="Appearance" />
              </ListItemButton>
              
              <Divider />
              
              <ListItemButton
                selected={activeSection === 'about'}
                onClick={() => handleSectionChange('about')}
              >
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="About" />
              </ListItemButton>
            </List>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 3 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            
            {success && (
              <Alert severity="success" sx={{ mb: 3 }}>
                Settings saved successfully!
              </Alert>
            )}
            
            {renderContent()}
            
            {activeSection !== 'about' && (
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  onClick={handleSaveSettings}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Save Settings'}
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SettingsPage;