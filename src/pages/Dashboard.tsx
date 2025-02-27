import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Divider,
  Chip
} from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ErrorIcon from '@mui/icons-material/Error';
import InventoryIcon from '@mui/icons-material/Inventory';
import ConstructionIcon from '@mui/icons-material/Construction';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { APP_NAME } from '../lib/constants';

interface Project {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (!user) return;
        
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);
          
        if (error) throw error;
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
        <ConstructionIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
        <Box>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Welcome back, {user?.user_metadata?.full_name || 'User'}! Here's an overview of your manufacturing operations.
          </Typography>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', borderTop: '4px solid', borderColor: 'primary.main' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Production Efficiency
                  </Typography>
                  <Typography variant="h4" component="div" fontWeight="bold">
                    87%
                  </Typography>
                  <Typography variant="body2" color="success.main" sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
                    +2.5% from last week
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: 'primary.main', p: 1.5, borderRadius: 2, color: 'white' }}>
                  <BarChartIcon />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', borderTop: '4px solid', borderColor: 'warning.main' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Inventory Status
                  </Typography>
                  <Typography variant="h4" component="div" fontWeight="bold">
                    24
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Items low in stock
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: 'warning.main', p: 1.5, borderRadius: 2, color: 'white' }}>
                  <InventoryIcon />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', borderTop: '4px solid', borderColor: 'error.main' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Quality Issues
                  </Typography>
                  <Typography variant="h4" component="div" fontWeight="bold">
                    3
                  </Typography>
                  <Typography variant="body2" color="error.main" sx={{ display: 'flex', alignItems: 'center' }}>
                    <ErrorIcon fontSize="small" sx={{ mr: 0.5 }} />
                    Requires attention
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: 'error.main', p: 1.5, borderRadius: 2, color: 'white' }}>
                  <ErrorIcon />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', borderTop: '4px solid', borderColor: 'success.main' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Active Projects
                  </Typography>
                  <Typography variant="h4" component="div" fontWeight="bold">
                    {projects.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    In progress
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: 'success.main', p: 1.5, borderRadius: 2, color: 'white' }}>
                  <TrendingUpIcon />
                </Box>
              </Box>
             </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Production Status */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight="bold">
                Recent Projects
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<AddIcon />}
                size="small"
              >
                New Project
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Project Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell align="right">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4}>
                        <LinearProgress />
                      </TableCell>
                    </TableRow>
                  ) : projects.length > 0 ? (
                    projects.map((project) => (
                      <TableRow key={project.id} hover>
                        <TableCell sx={{ fontWeight: 'medium' }}>{project.name}</TableCell>
                        <TableCell>{project.description || 'No description'}</TableCell>
                        <TableCell>{new Date(project.created_at).toLocaleDateString()}</TableCell>
                        <TableCell align="right">
                          <Chip 
                            label="Active" 
                            size="small" 
                            sx={{ 
                              bgcolor: 'success.light', 
                              color: 'success.dark',
                              fontWeight: 'medium'
                            }} 
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                          <ConstructionIcon sx={{ fontSize: 48, color: 'text.disabled' }} />
                          <Typography color="text.secondary">No projects found. Create your first project!</Typography>
                          <Button 
                            variant="contained" 
                            color="primary" 
                            startIcon={<AddIcon />}
                          >
                            Create New Project
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Production Schedule
            </Typography>
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" fontWeight="medium">
                  Steel Beam Production
                </Typography>
                <Chip 
                  label="On Track" 
                  size="small" 
                  sx={{ 
                    bgcolor: 'success.light', 
                    color: 'success.dark',
                    fontWeight: 'medium',
                    fontSize: '0.7rem'
                  }} 
                />
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={75} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  bgcolor: 'rgba(46, 204, 113, 0.2)',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: 'success.main'
                  }
                }} 
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                <Typography variant="caption" color="text.secondary">
                  75% Complete
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Due: Oct 15
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" fontWeight="medium">
                  Sheet Metal Processing
                </Typography>
                <Chip 
                  label="Delayed" 
                  size="small" 
                  sx={{ 
                    bgcolor: 'warning.light', 
                    color: 'warning.dark',
                    fontWeight: 'medium',
                    fontSize: '0.7rem'
                  }} 
                />
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={45} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  bgcolor: 'rgba(243, 156, 18, 0.2)',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: 'warning.main'
                  }
                }} 
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                <Typography variant="caption" color="text.secondary">
                  45% Complete
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Due: Oct 10
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" fontWeight="medium">
                  Quality Testing
                </Typography>
                <Chip 
                  label="Not Started" 
                  size="small" 
                  sx={{ 
                    bgcolor: 'info.light', 
                    color: 'info.dark',
                    fontWeight: 'medium',
                    fontSize: '0.7rem'
                  }} 
                />
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={0} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  bgcolor: 'rgba(52, 152, 219, 0.2)',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: 'info.main'
                  }
                }} 
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                <Typography variant="caption" color="text.secondary">
                  0% Complete
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Due: Oct 20
                </Typography>
              </Box>
            </Box>
            
            <Button 
              variant="outlined" 
              fullWidth
              sx={{ 
                mt: 2,
                borderRadius: 2,
                py: 1
              }}
            >
              View Full Schedule
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;