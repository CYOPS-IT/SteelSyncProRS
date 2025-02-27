/*
  # Create roles and organizations tables

  1. New Tables
    - `roles`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `description` (text)
      - `created_at` (timestamp)
    - `organizations`
      - `id` (uuid, primary key)
      - `name` (text)
      - `created_at` (timestamp)
      - `created_by` (uuid, references profiles.id)
    - `organization_members`
      - `id` (uuid, primary key)
      - `organization_id` (uuid, references organizations.id)
      - `profile_id` (uuid, references profiles.id)
      - `role_id` (uuid, references roles.id)
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for proper access control
*/

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create organizations table
CREATE TABLE IF NOT EXISTS organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL
);

-- Create organization_members junction table
CREATE TABLE IF NOT EXISTS organization_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  role_id uuid REFERENCES roles(id) ON DELETE RESTRICT NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(organization_id, profile_id)
);

-- Add role column to profiles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'role'
  ) THEN
    ALTER TABLE profiles ADD COLUMN role text DEFAULT 'standard_user';
  END IF;
END $$;

-- Enable Row Level Security
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;

-- Insert default roles
INSERT INTO roles (name, description)
VALUES 
  ('super_admin', 'Can create organizations, manage users, and impersonate users'),
  ('organization_admin', 'Can manage users within their organization'),
  ('standard_user', 'Standard user with organization-specific roles')
ON CONFLICT (name) DO NOTHING;

-- Roles policies
CREATE POLICY "Anyone can read roles"
  ON roles
  FOR SELECT
  TO authenticated
  USING (true);

-- Organizations policies
CREATE POLICY "Super admins can create organizations"
  ON organizations
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'super_admin'
  ));

CREATE POLICY "Organization admins and super admins can update organizations"
  ON organizations
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'super_admin'
    ) OR
    EXISTS (
      SELECT 1 FROM organization_members
      JOIN roles ON organization_members.role_id = roles.id
      WHERE organization_members.profile_id = auth.uid()
      AND organization_members.organization_id = organizations.id
      AND roles.name = 'organization_admin'
    )
  );

CREATE POLICY "Users can view organizations they belong to"
  ON organizations
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'super_admin'
    ) OR
    EXISTS (
      SELECT 1 FROM organization_members
      WHERE organization_members.profile_id = auth.uid()
      AND organization_members.organization_id = organizations.id
    )
  );

-- Organization members policies
CREATE POLICY "Super admins can manage all organization members"
  ON organization_members
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'super_admin'
    )
  );

CREATE POLICY "Organization admins can manage their organization members"
  ON organization_members
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM organization_members om
      JOIN roles ON om.role_id = roles.id
      WHERE om.profile_id = auth.uid()
      AND om.organization_id = organization_members.organization_id
      AND roles.name = 'organization_admin'
    )
  );

CREATE POLICY "Users can view their own organization memberships"
  ON organization_members
  FOR SELECT
  TO authenticated
  USING (
    organization_members.profile_id = auth.uid()
  );

-- Create function to check if user is super admin
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'super_admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check if user is organization admin
CREATE OR REPLACE FUNCTION is_organization_admin(org_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM organization_members om
    JOIN roles r ON om.role_id = r.id
    WHERE om.profile_id = auth.uid()
    AND om.organization_id = org_id
    AND r.name = 'organization_admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check if user belongs to organization
CREATE OR REPLACE FUNCTION is_organization_member(org_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM organization_members
    WHERE profile_id = auth.uid()
    AND organization_id = org_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;