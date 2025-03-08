import React from 'react';
import { Typography, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, Chip, Box, Avatar } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import EditIcon from '@mui/icons-material/Edit';
import LoginIcon from '@mui/icons-material/Login';
import SecurityIcon from '@mui/icons-material/Security';

const activities = [
  {
    id: 1,
    type: 'profile_update',
    description: 'Profile updated',
    timestamp: '03/06/2025, 08:42 PM',
    icon: EditIcon
  },
  {
    id: 2,
    type: 'settings_update',
    description: 'Settings updated',
    timestamp: '03/06/2025, 07:42 PM',
    icon: SecurityIcon
  },
  {
    id: 3,
    type: 'login',
    description: 'Logged in',
    timestamp: '03/05/2025, 09:42 PM',
    icon: LoginIcon
  }
];

const RecentActivity: React.FC = () => {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
          <HistoryIcon />
        </Avatar>
        <Typography variant="h6" fontWeight="bold">
          Recent Activity
        </Typography>
      </Box>

      <List>
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <ListItem key={activity.id} sx={{ 
              bgcolor: 'background.default',
              mb: 2, 
              borderRadius: 2,
              '&:last-child': { mb: 0 },
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 1
              }
            }}>
              <ListItemIcon>
                <Icon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary={<Typography fontWeight={500}>{activity.description}</Typography>}
              />
              <ListItemSecondaryAction>
                <Chip 
                  label={activity.timestamp}
                  size="small"
                  color="primary"
                  variant="outlined" 
                  sx={{ fontSize: '0.75rem', fontWeight: 500 }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default RecentActivity;