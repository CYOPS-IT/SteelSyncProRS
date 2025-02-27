import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  Divider,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import WorkIcon from '@mui/icons-material/Work';
import SecurityIcon from '@mui/icons-material/Security';
import HistoryIcon from '@mui/icons-material/History';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`,
  };
}

interface ActivityLog {
  id: string;
  action: string;
  timestamp: string;
  details: string;
}

const ProfilePage: React.FC = () => {
  const { user, userProfile, refreshProfile } = useAuth();
  const [fullName, setFullName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setFullName(userProfile.full_name || '');
      
      // Get additional profile data if available
      const metadata = user?.user_metadata || {};
      setJobTitle(metadata.job_title || '');
      setDepartment(metadata.department || '');
      setBio(metadata.bio || '');
    }
  }, [userProfile, user]);

  useEffect(() => {
    if (tabValue === 1) {
      fetchActivityLogs();
    }
  }, [tabValue]);

  const fetchActivityLogs = async () => {
    if (!user) return;
    
    setLoadingLogs(true);
    try {
      // This would normally fetch from a real activity_logs table
      // For demo purposes, we'll create mock data
      const mockLogs: ActivityLog[] = [
        {
          id: '1',
          action: 'Login',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          details: 'Successful login from Chrome on Windows'
        },
        {
          id: '2',
          action: 'Project Created',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          details: 'Created project "Steel Beam Production Q2"'
        },
        {
          id: '3',
          action: 'Profile Updated',
          timestamp: new Date(Date.now() - 172800000).toISOString(),
          details: 'Updated profile information'
        },
        {
          id: '4',
          action: 'Password Changed',
          timestamp: new Date(Date.now() - 604800000).toISOString(),
          details: 'Password was changed successfully'
        }
      ];
      
      setActivityLogs(mockLogs);
    } catch (error) {
      console.error('Error fetching activity logs:', error);
    } finally {
      setLoadingLogs(false);
    }
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleUpdateProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      // Update profile in profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: fullName
        })
        .eq('id', user.id);
        
      if (profileError) throw profileError;
      
      // Update user metadata
      const { error: metadataError } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          job_title: jobTitle,
          department: department,
          bio: bio
        }
      });
      
      if (metadataError) throw metadataError;
      
      // Refresh profile data
      await refreshProfile();
      
      setSuccess(true);
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'error';
      case 'organization_admin':
        return 'warning';
      default:
        return 'primary';
    }
  };

  const getRoleLabel = (role: string) => {
    return role.replace('_', ' ');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          My Profile
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Manage your account information and settings
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar
                sx={{ 
                  width: 120, 
                  height: 120, 
                  mb: 2,
                  bgcolor: 'primary.main',
                  fontSize: 48
                }}
                src={userProfile?.avatar_url || undefined}
              >
                {fullName?.charAt(0) || user?.email?.charAt(0).toUpperCase() || 'U'}
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {fullName || 'Your Name'}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {user?.email}
              </Typography>
              <Chip 
                label={userProfile?.role ? getRoleLabel(userProfile.role) : 'User'} 
                color={userProfile?.role ? getRoleColor(userProfile.role) as any : 'primary'}
                size="small"
                sx={{ textTransform: 'capitalize' }}
              />
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary="Email" 
                  secondary={user?.email} 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <BadgeIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary="Job Title" 
                  secondary={jobTitle || 'Not specified'} 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <WorkIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary="Department" 
                  secondary={department || 'Not specified'} 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SecurityIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary="Role" 
                  secondary={userProfile?.role ? getRoleLabel(userProfile.role) : 'Standard User'} 
                />
              </ListItem>
            </List>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Account Created
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="profile tabs">
                <Tab label="Edit Profile" {...a11yProps(0)} />
                <Tab label="Activity Log" {...a11yProps(1)} />
                <Tab label="Security" {...a11yProps(2)} />
              </Tabs>
            </Box>
            
            <TabPanel value={tabValue} index={0}>
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}
              
              {success && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  Profile updated successfully!
                </Alert>
              )}
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Full Name"
                    fullWidth
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Job Title"
                    fullWidth
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Department"
                    fullWidth
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Bio"
                    fullWidth
                    multiline
                    rows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    helperText="Tell us a bit about yourself"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="contained"
                      onClick={handleUpdateProfile}
                      disabled={loading}
                    >
                      {loading ? <CircularProgress size={24} /> : 'Save Changes'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
            
            <TabPanel value={tabValue} index={1}>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              
              {loadingLogs ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                  <CircularProgress />
                </Box>
              ) : activityLogs.length > 0 ? (
                <Box>
                  {activityLogs.map((log) => (
                    <Card key={log.id} sx={{ mb: 2 }}>
                      <CardContent sx={{ py: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <HistoryIcon sx={{ mr: 1, color: 'primary.main' }} />
                            <Box>
                              <Typography variant="subtitle1">
                                {log.action}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {log.details}
                              </Typography>
                            </Box>
                          </Box>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(log.timestamp).toLocaleString()}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              ) : (
                <Typography color="text.secondary">
                  No recent activity found
                </Typography>
              )}
            </TabPanel>
            
            <TabPanel value={tabValue} index={2}>
              <Typography variant="h6" gutterBottom>
                Security Settings
              </Typography>
              
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    Change Password
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Update your password to maintain account security
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
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Add an extra layer of security to your account
                  </Typography>
                  <Button variant="outlined" color="secondary">
                    Enable 2FA
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom color="error">
                    Delete Account
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Permanently delete your account and all associated data
                  </Typography>
                  <Button variant="outlined" color="error">
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;