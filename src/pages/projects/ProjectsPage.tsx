import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  Divider,
  CircularProgress,
  Alert,
  Paper,
  InputAdornment,
  Tab,
  Tabs
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FolderIcon from '@mui/icons-material/Folder';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

interface Project {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  status: string;
  organization_id: string | null;
  user_id: string;
}

const ProjectsPage: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [menuAnchorEl, setMenuAnchorEl] = useState<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    fetchProjects();
  }, [statusFilter]);

  const fetchProjects = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      let query = supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id);
        
      if (statusFilter) {
        query = query.eq('status', statusFilter);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async () => {
    if (!projectName.trim() || !user) return;
    
    try {
      setError(null);
      const { data, error } = await supabase
        .from('projects')
        .insert({
          name: projectName,
          description: projectDescription || null,
          user_id: user.id,
          status: 'active'
        })
        .select()
        .single();
        
      if (error) throw error;
      
      setProjects([data, ...projects]);
      setCreateDialogOpen(false);
      setProjectName('');
      setProjectDescription('');
    } catch (error: any) {
      console.error('Error creating project:', error);
      setError(error.message || 'Failed to create project');
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);
        
      if (error) throw error;
      
      setProjects(projects.filter(project => project.id !== projectId));
      handleCloseMenu(projectId);
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleUpdateProjectStatus = async (projectId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ status })
        .eq('id', projectId);
        
      if (error) throw error;
      
      setProjects(projects.map(project => 
        project.id === projectId ? { ...project, status } : project
      ));
      handleCloseMenu(projectId);
    } catch (error) {
      console.error('Error updating project status:', error);
    }
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, projectId: string) => {
    event.stopPropagation();
    setMenuAnchorEl({ ...menuAnchorEl, [projectId]: event.currentTarget });
  };

  const handleCloseMenu = (projectId: string) => {
    setMenuAnchorEl({ ...menuAnchorEl, [projectId]: null });
  };

  const handleOpenFilterMenu = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleCloseFilterMenu = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterSelect = (status: string | null) => {
    setStatusFilter(status);
    handleCloseFilterMenu();
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'on_hold':
        return 'warning';
      case 'completed':
        return 'info';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'on_hold':
        return 'On Hold';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Projects
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Manage your steel manufacturing projects
        </Typography>
      </Box>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              placeholder="Search projects..."
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ width: 250, mr: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={handleOpenFilterMenu}
              size="small"
            >
              {statusFilter ? `Filter: ${getStatusLabel(statusFilter)}` : 'Filter'}
            </Button>
            <Menu
              anchorEl={filterAnchorEl}
              open={Boolean(filterAnchorEl)}
              onClose={handleCloseFilterMenu}
            >
              <MenuItem onClick={() => handleFilterSelect(null)}>
                All Projects
              </MenuItem>
              <MenuItem onClick={() => handleFilterSelect('active')}>
                Active
              </MenuItem>
              <MenuItem onClick={() => handleFilterSelect('on_hold')}>
                On Hold
              </MenuItem>
              <MenuItem onClick={() => handleFilterSelect('completed')}>
                Completed
              </MenuItem>
              <MenuItem onClick={() => handleFilterSelect('cancelled')}>
                Cancelled
              </MenuItem>
            </Menu>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setCreateDialogOpen(true)}
          >
            New Project
          </Button>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="project tabs">
            <Tab label="All Projects" />
            <Tab label="Recent" />
            <Tab label="Favorites" />
          </Tabs>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : filteredProjects.length > 0 ? (
          <Grid container spacing={3}>
            {filteredProjects.map((project) => (
              <Grid item xs={12} sm={6} md={4} key={project.id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    position: 'relative'
                  }}
                >
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      top: 12, 
                      right: 12, 
                      zIndex: 1 
                    }}
                  >
                    <IconButton 
                      size="small" 
                      onClick={(e) => handleOpenMenu(e, project.id)}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                    <Menu
                      anchorEl={menuAnchorEl[project.id]}
                      open={Boolean(menuAnchorEl[project.id])}
                      onClose={() => handleCloseMenu(project.id)}
                    >
                      <MenuItem onClick={() => handleUpdateProjectStatus(project.id, 'active')}>
                        Mark as Active
                      </MenuItem>
                      <MenuItem onClick={() => handleUpdateProjectStatus(project.id, 'on_hold')}>
                        Put on Hold
                      </MenuItem>
                      <MenuItem onClick={() => handleUpdateProjectStatus(project.id, 'completed')}>
                        Mark as Completed
                      </MenuItem>
                      <Divider />
                      <MenuItem 
                        onClick={() => handleDeleteProject(project.id)}
                        sx={{ color: 'error.main' }}
                      >
                        Delete
                      </MenuItem>
                    </Menu>
                  </Box>
                  <Box 
                    sx={{ 
                      p: 2, 
                      display: 'flex', 
                      alignItems: 'center',
                      bgcolor: 'primary.main',
                      color: 'white'
                    }}
                  >
                    <FolderIcon sx={{ mr: 1 }} />
                    <Typography variant="h6" component="h2" noWrap>
                      {project.name}
                    </Typography>
                  </Box>
                  <CardContent sx={{ flexGrow: 1, pt: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Chip 
                        label={getStatusLabel(project.status)} 
                        color={getStatusColor(project.status) as any}
                        size="small"
                      />
                      <Typography variant="caption" color="text.secondary">
                        {new Date(project.created_at).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {project.description || 'No description provided'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View Details</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <FolderIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              No projects found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {searchQuery 
                ? 'No projects match your search criteria' 
                : 'Create your first project to get started'}
            </Typography>
            {!searchQuery && (
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                onClick={() => setCreateDialogOpen(true)}
              >
                Create Project
              </Button>
            )}
          </Box>
        )}
      </Paper>

      {/* Create Project Dialog */}
      <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)}>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            autoFocus
            margin="dense"
            label="Project Name"
            fullWidth
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleCreateProject}
            variant="contained"
            disabled={!projectName.trim()}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProjectsPage;