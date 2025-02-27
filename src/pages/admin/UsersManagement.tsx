import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  CircularProgress
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { fetchRoles, updateUserRole, Role } from '../../lib/auth';

interface UsersManagementProps {
  isSuperAdmin?: boolean;
  organizationId?: string;
}

interface UserData {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
  avatar_url: string | null;
  created_at: string;
}

const UsersManagement: React.FC<UsersManagementProps> = ({ isSuperAdmin = false, organizationId }) => {
  const { userProfile } = useAuth();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState<any[]>([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Fetch roles
        const rolesData = await fetchRoles();
        setRoles(rolesData);

        // Fetch users based on admin type
        let usersData;
        if (isSuperAdmin) {
          // Super admins can see all users
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

          if (error) throw error;
          usersData = data;
        } else if (organizationId) {
          // Organization admins can only see users in their organization
          const { data, error } = await supabase
            .from('organization_members')
            .select(`
              profile:profiles(*)
            `)
            .eq('organization_id', organizationId);

          if (error) throw error;
          usersData = data.map(item => item.profile);
        } else {
          // Default case - fetch users from organizations where user is admin
          const { data: orgData, error: orgError } = await supabase
            .from('organization_members')
            .select(`
              organization_id
            `)
            .eq('profile_id', userProfile?.id)
            .eq('role_id', roles.find(r => r.name === 'organization_admin')?.id);

          if (orgError) throw orgError;
          
          const orgIds = orgData.map(item => item.organization_id);
          
          if (orgIds.length > 0) {
            const { data, error } = await supabase
              .from('organization_members')
              .select(`
                profile:profiles(*)
              `)
              .in('organization_id', orgIds);

            if (error) throw error;
            
            // Deduplicate users
            const userMap = new Map();
            data.forEach(item => {
              if (item.profile) {
                userMap.set(item.profile.id, item.profile);
              }
            });
            
            usersData = Array.from(userMap.values());
          } else {
            usersData = [];
          }
        }

        setUsers(usersData);
      } catch (error) {
        console.error('Error loading users data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [isSuperAdmin, organizationId, userProfile?.id]);

  const handleEditUser = (user: UserData) => {
    setSelectedUser(user);
    setSelectedRole(user.role);
    setOpenEditDialog(true);
  };

  const handleUpdateRole = async () => {
    if (!selectedUser || !selectedRole) return;
    
    setProcessing(true);
    try {
      const success = await updateUserRole(selectedUser.id, selectedRole as Role);
      
      if (success) {
        // Update local state
        setUsers(users.map(user => 
          user.id === selectedUser.id ? { ...user, role: selectedRole } : user
        ));
        setOpenEditDialog(false);
      }
    } catch (error) {
      console.error('Error updating user role:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleInviteUser = async () => {
    if (!inviteEmail || !inviteRole) return;
    
    setProcessing(true);
    try {
      // In a real application, you would send an invitation email here
      // For now, we'll just create a user with a random password
      const password = Math.random().toString(36).slice(-8);
      
      const { data, error } = await supabase.auth.admin.createUser({
        email: inviteEmail,
        password,
        email_confirm: true,
        user_metadata: { invited_by: userProfile?.id }
      });
      
      if (error) throw error;
      
      if (data.user) {
        // Create profile using the secure RPC function
        const { error: profileError } = await supabase.rpc('create_user_profile', {
          user_id: data.user.id,
          user_email: inviteEmail,
          user_full_name: '',
          user_role: inviteRole
        });
        
        if (profileError) {
          console.error("Error creating profile:", profileError);
          throw profileError;
        }
        
        // If organization context is provided, add user to organization
        if (organizationId) {
          const roleId = roles.find(r => r.name === inviteRole)?.id;
          if (roleId) {
            await supabase.from('organization_members').insert({
              organization_id: organizationId,
              profile_id: data.user.id,
              role_id: roleId
            });
          }
        }
        
        // Refresh user list
        const { data: newUser } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
          
        if (newUser) {
          setUsers([newUser, ...users]);
        }
        
        setInviteDialogOpen(false);
        setInviteEmail('');
        setInviteRole('');
      }
    } catch (error) {
      console.error('Error inviting user:', error);
    } finally {
      setProcessing(false);
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

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight="bold">
          User Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={() => setInviteDialogOpen(true)}
        >
          Invite User
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
                <TableCell>User</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Joined</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length > 0 ? (
                users.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar 
                          sx={{ mr: 2, bgcolor: 'primary.main' }}
                          src={user.avatar_url || undefined}
                        >
                          {user.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography variant="body2" fontWeight="medium">
                          {user.full_name || 'Unnamed User'}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip 
                        label={user.role.replace('_', ' ')} 
                        color={getRoleColor(user.role) as any}
                        size="small"
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(user.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="right">
                      <Box>
                        {isSuperAdmin && (
                          <Tooltip title="Edit Role">
                            <IconButton 
                              size="small" 
                              onClick={() => handleEditUser(user)}
                              disabled={user.id === userProfile?.id} // Can't edit yourself
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                    <Typography color="text.secondary">No users found</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Edit User Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit User Role</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, minWidth: 300 }}>
            <Typography variant="subtitle1" gutterBottom>
              {selectedUser?.full_name || selectedUser?.email}
            </Typography>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                value={selectedRole}
                label="Role"
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.name}>
                    {role.name.replace('_', ' ')}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleUpdateRole} 
            variant="contained"
            disabled={processing}
          >
            {processing ? <CircularProgress size={24} /> : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Invite User Dialog */}
      <Dialog open={inviteDialogOpen} onClose={() => setInviteDialogOpen(false)}>
        <DialogTitle>Invite New User</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, minWidth: 300 }}>
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              margin="normal"
            />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="invite-role-select-label">Role</InputLabel>
              <Select
                labelId="invite-role-select-label"
                value={inviteRole}
                label="Role"
                onChange={(e) => setInviteRole(e.target.value)}
              >
                {roles
                  .filter(role => isSuperAdmin || role.name !== 'super_admin')
                  .map((role) => (
                    <MenuItem key={role.id} value={role.name}>
                      {role.name.replace('_', ' ')}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInviteDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleInviteUser} 
            variant="contained"
            disabled={!inviteEmail || !inviteRole || processing}
          >
            {processing ? <CircularProgress size={24} /> : 'Invite'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsersManagement;