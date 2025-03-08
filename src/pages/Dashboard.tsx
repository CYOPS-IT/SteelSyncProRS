import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  LinearProgress,
  Chip
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [favorites] = React.useState(['Dashboard', 'Production']);

  const recentActivities = [
    {
      id: 1,
      title: 'Batch #45872 completed',
      time: '30m ago',
      status: 'success'
    },
    {
      id: 2,
      title: 'Quality check pending for Batch #45873',
      time: '45m ago',
      status: 'warning'
    },
    {
      id: 3,
      title: 'Machine M12 requires immediate maintenance',
      time: '1h ago',
      status: 'error'
    },
    {
      id: 4,
      title: 'New shipment received: 500 units',
      time: '1h ago',
      status: 'success'
    }
  ];

  if (!user) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* Favorites Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          ★ Favorites
        </Typography>
        <Grid container spacing={2}>
          {['Dashboard', 'Production'].map((item) => (
            <Grid item key={item}>
              <Paper 
                sx={{ 
                  px: 2, 
                  py: 1, 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: 1,
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'action.hover' }
                }}
              >
                <Typography>{item}</Typography>
                <StarIcon fontSize="small" color="primary" />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Widgets Section */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Widgets
      </Typography>
      <Grid container spacing={3}>
        {/* Production Overview Widget */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Production Overview</Typography>
              <IconButton size="small">
                <MoreVertIcon />
              </IconButton>
            </Box>
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Daily Production
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
                <Typography variant="h3" component="span">850</Typography>
                <Typography variant="body2" color="text.secondary">/ 1,000</Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={85} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  bgcolor: 'action.hover',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    bgcolor: 'primary.main'
                  }
                }} 
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                <ArrowUpwardIcon color="success" fontSize="small" />
                <Typography variant="body2" color="success.main">+5%</Typography>
              </Box>
            </Box>
            
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Paper sx={{ p: 2, bgcolor: 'success.main', color: 'white' }}>
                  <Typography variant="overline" sx={{ opacity: 0.8 }}>
                    Efficiency Rate
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                    <Typography variant="h4">92%</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>+4%</Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
                  <Typography variant="overline" sx={{ opacity: 0.8 }}>
                    Downtime
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                    <Typography variant="h4">45m</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>/120m</Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Inventory Status Widget */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Inventory Status</Typography>
              <IconButton size="small">
                <MoreVertIcon />
              </IconButton>
            </Box>
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Total Stock
              </Typography>
              <Typography variant="h3">12,500</Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Chip 
                  label="8,750 Available"
                  color="success" 
                  size="small" 
                />
                <Chip 
                  label="2,250 Reserved"
                  color="warning" 
                  size="small" 
                />
              </Box>
            </Box>
            
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Alerts
            </Typography>
            <List>
              <ListItem sx={{ px: 0 }}>
                <ListItemText 
                  primary="Steel Plates"
                  secondary={
                    <Typography variant="body2" color="error.main">
                      Current: 150 (Min: 200)
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemText 
                  primary="Welding Rods"
                  secondary={
                    <Typography variant="body2" color="warning.main">
                      Current: 50 (Min: 100)
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Recent Activities Widget */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Recent Activities</Typography>
              <IconButton size="small">
                <MoreVertIcon />
              </IconButton>
            </Box>
            
            <List>
              {recentActivities.map((activity) => (
                <ListItem 
                  key={activity.id}
                  sx={{ 
                    px: 2, 
                    py: 1.5, 
                    bgcolor: 'background.default',
                    borderRadius: 1,
                    mb: 1,
                    '&:last-child': { mb: 0 }
                  }}
                >
                  <ListItemIcon>
                    {activity.status === 'success' && <CheckCircleIcon color="success" />}
                    {activity.status === 'warning' && <WarningIcon color="warning" />}
                    {activity.status === 'error' && <ErrorIcon color="error" />}
                  </ListItemIcon>
                  <ListItemText 
                    primary={activity.title}
                    secondary={activity.time}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;