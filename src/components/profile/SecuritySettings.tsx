import React, { useState } from 'react';
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Avatar,
  Chip,
  Switch
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import LockIcon from '@mui/icons-material/Lock';
import DevicesIcon from '@mui/icons-material/Devices';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyIcon from '@mui/icons-material/Key';
import DeleteIcon from '@mui/icons-material/Delete';
import ComputerIcon from '@mui/icons-material/Computer';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import TabletIcon from '@mui/icons-material/Tablet';
import { useAuth } from '../../contexts/AuthContext';

const SecuritySettings: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDevicesDialog, setOpenDevicesDialog] = useState(false);
  const [openNotificationsDialog, setOpenNotificationsDialog] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [connectedDevices] = useState([
    { id: 1, name: 'Windows PC', type: 'desktop', icon: ComputerIcon, lastActive: 'Active now', location: 'New York, USA' },
    { id: 2, name: 'iPhone 13', type: 'mobile', icon: PhoneAndroidIcon, lastActive: '2 hours ago', location: 'Miami, FL' },
    { id: 3, name: 'iPad Pro', type: 'tablet', icon: TabletIcon, lastActive: '1 day ago', location: 'Chicago, IL' }
  ]);

  const [notifications, setNotifications] = useState({
    loginAlerts: true,
    securityAlerts: true,
    deviceAlerts: true,
    updateAlerts: false,
    maintenanceAlerts: true
  });

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setError('Password must be at least 8 characters with at least one uppercase letter, one lowercase letter, and one number');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Password updated successfully');
      setOpenDialog(false);
      
      // Reset form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError('Failed to update password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
          <SecurityIcon />
        </Avatar>
        <Typography variant="h6" fontWeight="bold">
          Security Settings
        </Typography>
      </Box>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}

      <List sx={{ mb: 3 }}>
        <ListItem sx={{ 
          bgcolor: 'background.default', 
          mb: 2, 
          borderRadius: 2,
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 1
          }
        }}>
          <ListItemIcon>
            <LockIcon color="primary" />
          </ListItemIcon>
          <ListItemText 
            primary={<Typography fontWeight={500}>Password</Typography>}
            secondary={<Typography variant="body2" color="text.secondary">Last changed 30 days ago</Typography>}
          />
          <ListItemSecondaryAction>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setOpenDialog(true)}
              startIcon={<KeyIcon fontSize="small" />}
              sx={{ px: 2 }}
            >
              Change
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
        
        <ListItem sx={{ 
          bgcolor: 'background.default', 
          mb: 2, 
          borderRadius: 2,
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 1
          }
        }}>
          <ListItemIcon>
            <DevicesIcon color="primary" />
          </ListItemIcon>
          <ListItemText 
            primary={<Typography fontWeight={500}>Connected Devices</Typography>}
            secondary={<Typography variant="body2" color="text.secondary">{connectedDevices.length} devices connected</Typography>}
          />
          <ListItemSecondaryAction>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setOpenDevicesDialog(true)}
              startIcon={<DevicesIcon fontSize="small" />}
              sx={{ px: 2 }}
            >
              Manage
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
        
        <ListItem sx={{ 
          bgcolor: 'background.default', 
          borderRadius: 2,
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 1
          }
        }}>
          <ListItemIcon>
            <NotificationsIcon color="primary" />
          </ListItemIcon>
          <ListItemText 
            primary={<Typography fontWeight={500}>System Notifications</Typography>}
            secondary={<Typography variant="body2" color="text.secondary">Manage your system notification preferences</Typography>}
          />
          <ListItemSecondaryAction>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setOpenNotificationsDialog(true)}
              startIcon={<NotificationsIcon fontSize="small" />}
              sx={{ px: 2 }}
            >
              Configure
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      </List>

      {/* Password Change Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Change Password</DialogTitle>
        <form onSubmit={handlePasswordChange}>
          <DialogContent>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            <TextField
              margin="dense"
              label="Current Password"
              type="password"
              fullWidth
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <TextField
              margin="dense"
              label="New Password"
              type="password"
              fullWidth
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              helperText="Password must be at least 8 characters with at least one uppercase letter, one lowercase letter, and one number"
            />
            <TextField
              margin="dense"
              label="Confirm New Password"
              type="password"
              fullWidth
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? 'Updating...' : 'Update Password'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      
      {/* Connected Devices Dialog */}
      <Dialog open={openDevicesDialog} onClose={() => setOpenDevicesDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Connected Devices</DialogTitle>
        <DialogContent>
          <List>
            {connectedDevices.map((device) => {
              const DeviceIcon = device.icon;
              return (
                <ListItem key={device.id} sx={{ 
                  bgcolor: 'background.default',
                  mb: 2,
                  borderRadius: 2,
                  '&:last-child': { mb: 0 }
                }}>
                  <ListItemIcon>
                    <DeviceIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography fontWeight={500}>{device.name}</Typography>
                        {device.lastActive === 'Active now' && (
                          <Chip
                            label="Active"
                            color="success"
                            size="small"
                            sx={{ height: 20 }}
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {device.lastActive} • {device.location}
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" color="error" size="small">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDevicesDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      
      {/* Notification Settings Dialog */}
      <Dialog open={openNotificationsDialog} onClose={() => setOpenNotificationsDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>System Notifications</DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <ListItemText
                primary="Login Alerts"
                secondary="Get notified when someone logs into your account"
              />
              <Switch
                edge="end"
                checked={notifications.loginAlerts}
                onChange={(e) => setNotifications({ ...notifications, loginAlerts: e.target.checked })}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Security Alerts"
                secondary="Receive alerts about security-related events"
              />
              <Switch
                edge="end"
                checked={notifications.securityAlerts}
                onChange={(e) => setNotifications({ ...notifications, securityAlerts: e.target.checked })}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Device Alerts"
                secondary="Get notified when a new device accesses your account"
              />
              <Switch
                edge="end"
                checked={notifications.deviceAlerts}
                onChange={(e) => setNotifications({ ...notifications, deviceAlerts: e.target.checked })}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Update Notifications"
                secondary="Receive notifications about system updates"
              />
              <Switch
                edge="end"
                checked={notifications.updateAlerts}
                onChange={(e) => setNotifications({ ...notifications, updateAlerts: e.target.checked })}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Maintenance Alerts"
                secondary="Get notified about scheduled maintenance"
              />
              <Switch
                edge="end"
                checked={notifications.maintenanceAlerts}
                onChange={(e) => setNotifications({ ...notifications, maintenanceAlerts: e.target.checked })}
              />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNotificationsDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenNotificationsDialog(false)}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SecuritySettings;