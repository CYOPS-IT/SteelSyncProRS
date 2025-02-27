/*
  # Update Projects Table with Status Field

  1. Changes
    - Add `status` column to projects table with default value 'active'
    - Add `organization_id` column to link projects to organizations
  
  2. Security
    - Update RLS policies to include organization access
*/

-- Add status column to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS status text DEFAULT 'active';

-- Add organization_id column to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS organization_id uuid REFERENCES organizations(id) ON DELETE SET NULL;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS projects_status_idx ON projects(status);
CREATE INDEX IF NOT EXISTS projects_organization_id_idx ON projects(organization_id);

-- Update projects policies to include organization access
DROP POLICY IF EXISTS "Users can view their own projects" ON projects;
CREATE POLICY "Users can view their own projects"
  ON projects
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM organization_members
      WHERE organization_members.profile_id = auth.uid()
      AND organization_members.organization_id = projects.organization_id
    )
  );

DROP POLICY IF EXISTS "Users can update their own projects" ON projects;
CREATE POLICY "Users can update their own projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM organization_members
      JOIN roles ON organization_members.role_id = roles.id
      WHERE organization_members.profile_id = auth.uid()
      AND organization_members.organization_id = projects.organization_id
      AND roles.name IN ('organization_admin', 'super_admin')
    )
  );

DROP POLICY IF EXISTS "Users can delete their own projects" ON projects;
CREATE POLICY "Users can delete their own projects"
  ON projects
  FOR DELETE
  TO authenticated
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM organization_members
      JOIN roles ON organization_members.role_id = roles.id
      WHERE organization_members.profile_id = auth.uid()
      AND organization_members.organization_id = projects.organization_id
      AND roles.name IN ('organization_admin', 'super_admin')
    )
  );