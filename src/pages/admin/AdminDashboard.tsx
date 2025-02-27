import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Tabs, 
  Tab, 
  Button,
  Divider
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import UsersManagement from './UsersManagement';
import OrganizationsManagement from './OrganizationsManagement';

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
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
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
    id: `admin-tab-${index}`,
    'aria-controls': `admin-tabpanel-${index}`,
  };
}

const AdminDashboard: React.FC = () => {
  const { userProfile } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setIsSuperAdmin(userProfile.role === 'super_admin');
    }
  }, [userProfile]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Admin Dashboard
          </Typography>
          <Typography variant="subtitle1" color="primary">
            {isSuperAdmin ? 'Super Admin' : 'Organization Admin'}
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="admin dashboard tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Organizations" {...a11yProps(0)} disabled={!isSuperAdmin} />
            <Tab label="Users" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <OrganizationsManagement />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <UsersManagement isSuperAdmin={isSuperAdmin} />
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;