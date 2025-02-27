import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  IconButton,
  Tooltip,
  CircularProgress,
  Collapse,
  Divider,
  Grid,
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SettingsIcon from '@mui/icons-material/Settings';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { createOrganization, Organization } from '../../lib/auth';
import UsersManagement from './UsersManagement';

interface OrganizationWithMemberCount extends Organization {
  member_count?: number;
}

const OrganizationsManagement: React.FC = () => {
  const { userProfile } = useAuth();
  const [organizations, setOrganizations] = useState<OrganizationWithMemberCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [organizationName, setOrganizationName] = useState('');
  const [organizationShortname, setOrganizationShortname] = useState('');
  const [processing, setProcessing] = useState(false);
  const [expandedOrg, setExpandedOrg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<OrganizationWithMemberCount | null>(null);

  useEffect(() => {
    const fetchOrganizations = async () => {
      setLoading(true);
      try {
        // Fetch all organizations (for super admin)
        const { data, error } = await supabase
          .from('organizations')
          .select('*')
          .order('name');

        if (error) throw error;

        // Get member count for each organization
        const orgsWithCounts = await Promise.all(
          data.map(async (org) => {
            const { count, error: countError } = await supabase
              .from('organization_members')
              .select('*', { count: 'exact', head: true })
              .eq('organization_id', org.id);

            if (countError) throw countError;

            return {
              ...org,
              member_count: count || 0
            };
          })
        );

        setOrganizations(orgsWithCounts);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  const handleCreateOrganization = async () => {
    if (!organizationName.trim() || !organizationShortname.trim() || !userProfile) return;
    
    setProcessing(true);
    setError(null);
    
    try {
      const newOrg = await createOrganization(organizationName, organizationShortname);
      
      if (newOrg) {
        setOrganizations([...organizations, { ...newOrg, member_count: 0 }]);
        setCreateDialogOpen(false);
        setOrganizationName('');
        setOrganizationShortname('');
      }
    } catch (error: any) {
      console.error('Error creating organization:', error);
      setError(error.message || 'Failed to create organization');
    } finally {
      setProcessing(false);
    }
  };

  const handleEditOrganization = (org: OrganizationWithMemberCount) => {
    setSelectedOrg(org);
    setEditDialogOpen(true);
  };

  const handleUpdateOrganization = async () => {
    if (!selectedOrg) return;
    
    setProcessing(true);
    setError(null);
    
    try {
      const { error } = await supabase
        .from('organizations')
        .update({
          name: selectedOrg.name,
          shortname: selectedOrg.shortname,
          settings: selectedOrg.settings
        })
        .eq('id', selectedOrg.id);
        
      if (error) throw error;
      
      // Update local state
      setOrganizations(organizations.map(org => 
        org.id === selectedOrg.id ? selectedOrg : org
      ));
      
      setEditDialogOpen(false);
    } catch (error: any) {
      console.error('Error updating organization:', error);
      setError(error.message || 'Failed to update organization');
    } finally {
      setProcessing(false);
    }
  };

  const toggleExpand = (orgId: string) => {
    setExpandedOrg(expandedOrg === orgId ? null : orgId);
  };

  const validateShortname = (shortname: string): boolean => {
    const regex = /^[a-z0-9_]+$/;
    return regex.test(shortname);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight="bold">
          Organizations
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setCreateDialogOpen(true)}
        >
          Create Organization
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Organization Name</TableCell>
                <TableCell>Shortname</TableCell>
                <TableCell>Members</TableCell>
                <TableCell>Created</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {organizations.length > 0 ? (
                organizations.map((org) => (
                  <React.Fragment key={org.id}>
                    <TableRow hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {org.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <code>{org.shortname}</code>
                      </TableCell>
                      <TableCell>{org.member_count}</TableCell>
                      <TableCell>
                        {new Date(org.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="right">
                        <Box>
                          <Tooltip title="Manage Members">
                            <IconButton 
                              size="small" 
                              onClick={() => toggleExpand(org.id)}
                            >
                              {expandedOrg === org.id ? 
                                <ExpandLessIcon fontSize="small" /> : 
                                <ExpandMoreIcon fontSize="small" />
                              }
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton 
                              size="small"
                              onClick={() => handleEditOrganization(org)}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Settings">
                            <IconButton size="small">
                              <SettingsIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={5} sx={{ py: 0 }}>
                        <Collapse in={expandedOrg === org.id}>
                          <Box sx={{ py: 2 }}>
                            <UsersManagement organizationId={org.id} />
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="body2" color="textSecondary">
                      No organizations found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Create Organization Dialog */}
      <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)}>
        <DialogTitle>Create Organization</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                label="Organization Name"
                fullWidth
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                helperText="Full name of the organization"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Shortname"
                fullWidth
                value={organizationShortname}
                onChange={(e) => setOrganizationShortname(e.target.value.toLowerCase())}
                error={organizationShortname !== '' && !validateShortname(organizationShortname)}
                helperText={
                  organizationShortname !== '' && !validateShortname(organizationShortname)
                    ? "Shortname must contain only lowercase letters, numbers, and underscores"
                    : "Used for role identification (e.g., 'acme_corp')"
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleCreateOrganization}
            disabled={
              !organizationName.trim() || 
              !organizationShortname.trim() || 
              !validateShortname(organizationShortname) ||
              processing
            }
            variant="contained"
          >
            {processing ? <CircularProgress size={24} /> : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Organization Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Organization</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                label="Organization Name"
                fullWidth
                value={selectedOrg?.name || ''}
                onChange={(e) => selectedOrg && setSelectedOrg({...selectedOrg, name: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Shortname"
                fullWidth
                value={selectedOrg?.shortname || ''}
                onChange={(e) => selectedOrg && setSelectedOrg({...selectedOrg, shortname: e.target.value.toLowerCase()})}
                error={selectedOrg?.shortname !== '' && !validateShortname(selectedOrg?.shortname || '')}
                helperText={
                  selectedOrg?.shortname !== '' && !validateShortname(selectedOrg?.shortname || '')
                    ? "Shortname must contain only lowercase letters, numbers, and underscores"
                    : "Used for role identification (e.g., 'acme_corp')"
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleUpdateOrganization}
            disabled={
              !selectedOrg?.name.trim() || 
              !selectedOrg?.shortname.trim() || 
              !validateShortname(selectedOrg?.shortname || '') ||
              processing
            }
            variant="contained"
          >
            {processing ? <CircularProgress size={24} /> : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrganizationsManagement;