import { supabase } from './supabase';
import { Database } from '../types/supabase';

export type Role = 'super_admin' | 'organization_admin' | 'standard_user';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: Role;
}

export interface Organization {
  id: string;
  name: string;
  shortname: string;
  created_at: string;
  owner_id: string | null;
  settings: any;
}

export interface OrganizationMember {
  id: string;
  organization_id: string;
  profile_id: string;
  role_id: string;
  created_at: string;
  organization?: Organization;
  profile?: UserProfile;
  role?: {
    id: string;
    name: string;
    description: string | null;
  };
}

// Fetch user profile with role information
export const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      // If profile doesn't exist yet, return a minimal profile
      if (error.code === 'PGRST116') {
        const { data: userData } = await supabase.auth.getUser();
        if (userData && userData.user) {
          return {
            id: userData.user.id,
            email: userData.user.email || '',
            full_name: userData.user.user_metadata?.full_name || null,
            avatar_url: null,
            role: 'standard_user'
          };
        }
      }
      console.error('Error fetching user profile:', error);
      return null;
    }

    return data as UserProfile;
  } catch (error) {
    console.error('Unexpected error fetching profile:', error);
    return null;
  }
};

// Fetch organizations for a user
export const fetchUserOrganizations = async (userId: string): Promise<Organization[]> => {
  // First check if user is super_admin
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single();

  if (profileError) {
    console.error('Error fetching user role:', profileError);
    return [];
  }

  if (profile.role === 'super_admin') {
    // Super admins can see all organizations
    const { data, error } = await supabase
      .from('organizations')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching organizations:', error);
      return [];
    }

    return data as Organization[];
  } else {
    // Regular users only see organizations they belong to
    const { data, error } = await supabase
      .from('organization_members')
      .select('organization:organizations(*)')
      .eq('profile_id', userId);

    if (error) {
      console.error('Error fetching user organizations:', error);
      return [];
    }

    return data.map(item => item.organization) as Organization[];
  }
};

// Check if user is a super admin
export const isSuperAdmin = async (userId: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error checking super admin status:', error);
    return false;
  }

  return data.role === 'super_admin';
};

// Check if user is an organization admin
export const isOrganizationAdmin = async (userId: string, organizationId: string): Promise<boolean> => {
  const { data, error } = await supabase
    .rpc('is_organization_admin', { org_id: organizationId });

  if (error) {
    console.error('Error checking organization admin status:', error);
    return false;
  }

  return data;
};

// Create a new organization (super admin only)
export const createOrganization = async (
  name: string, 
  shortname: string, 
  settings: any = {}
): Promise<Organization | null> => {
  try {
    const { data, error } = await supabase
      .rpc('create_organization', { 
        org_name: name, 
        org_shortname: shortname,
        org_settings: settings
      });

    if (error) {
      console.error('Error creating organization:', error);
      throw error;
    }

    if (data) {
      // Fetch the newly created organization
      const { data: orgData, error: orgError } = await supabase
        .from('organizations')
        .select('*')
        .eq('id', data)
        .single();

      if (orgError) {
        console.error('Error fetching created organization:', orgError);
        return null;
      }

      return orgData as Organization;
    }

    return null;
  } catch (error) {
    console.error('Error in createOrganization:', error);
    return null;
  }
};

// Add a user to an organization
export const addUserToOrganization = async (
  organizationId: string,
  profileId: string,
  roleId: string
): Promise<boolean> => {
  const { error } = await supabase
    .from('organization_members')
    .insert({
      organization_id: organizationId,
      profile_id: profileId,
      role_id: roleId
    });

  if (error) {
    console.error('Error adding user to organization:', error);
    return false;
  }

  return true;
};

// Get all roles
export const fetchRoles = async () => {
  const { data, error } = await supabase
    .from('roles')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching roles:', error);
    return [];
  }

  return data;
};

// Get organization members
export const fetchOrganizationMembers = async (organizationId: string): Promise<OrganizationMember[]> => {
  const { data, error } = await supabase
    .from('organization_members')
    .select(`
      *,
      profile:profiles(id, email, full_name, avatar_url, role),
      role:roles(id, name, description)
    `)
    .eq('organization_id', organizationId);

  if (error) {
    console.error('Error fetching organization members:', error);
    return [];
  }

  return data as OrganizationMember[];
};

// Update user role (super admin only)
export const updateUserRole = async (userId: string, role: Role): Promise<boolean> => {
  const { error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', userId);

  if (error) {
    console.error('Error updating user role:', error);
    return false;
  }

  return true;
};

// Remove user from organization
export const removeUserFromOrganization = async (organizationId: string, profileId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('organization_members')
    .delete()
    .eq('organization_id', organizationId)
    .eq('profile_id', profileId);

  if (error) {
    console.error('Error removing user from organization:', error);
    return false;
  }

  return true;
};

// Update organization member role
export const updateOrganizationMemberRole = async (
  memberId: string,
  roleId: string
): Promise<boolean> => {
  const { error } = await supabase
    .from('organization_members')
    .update({ role_id: roleId })
    .eq('id', memberId);

  if (error) {
    console.error('Error updating organization member role:', error);
    return false;
  }

  return true;
};

// Update organization settings
export const updateOrganizationSettings = async (
  organizationId: string,
  settings: any
): Promise<boolean> => {
  const { error } = await supabase
    .from('organizations')
    .update({ settings })
    .eq('id', organizationId);

  if (error) {
    console.error('Error updating organization settings:', error);
    return false;
  }

  return true;
};