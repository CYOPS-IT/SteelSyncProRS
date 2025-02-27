/*
  # Create Organizations Table with Enhanced Fields

  1. New Tables
    - Modified `organizations` table with additional fields:
      - `shortname` (text, unique) - Used for role identification
      - `settings` (jsonb) - For customizable options
  
  2. Changes
    - Rename `created_by` to `owner_id` for clarity
    - Add unique constraints for name and shortname
    - Add validation functions for organization data
  
  3. Security
    - Ensure only super admins can create organizations
    - Add appropriate RLS policies
*/

-- Add shortname and settings to organizations table
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS shortname text UNIQUE;
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS settings jsonb DEFAULT '{}'::jsonb;

-- Rename created_by to owner_id for clarity (if it doesn't exist already)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'organizations' AND column_name = 'created_by'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'organizations' AND column_name = 'owner_id'
  ) THEN
    ALTER TABLE organizations RENAME COLUMN created_by TO owner_id;
  END IF;
END $$;

-- Add unique constraint to name if not already present
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'organizations_name_key'
  ) THEN
    ALTER TABLE organizations ADD CONSTRAINT organizations_name_key UNIQUE (name);
  END IF;
END $$;

-- Create function to validate organization data
CREATE OR REPLACE FUNCTION validate_organization_data()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate name (not empty, proper format)
  IF NEW.name IS NULL OR LENGTH(TRIM(NEW.name)) < 3 THEN
    RAISE EXCEPTION 'Organization name must be at least 3 characters long';
  END IF;
  
  -- Validate shortname (alphanumeric with underscores, lowercase)
  IF NEW.shortname IS NULL OR NEW.shortname !~ '^[a-z0-9_]+$' THEN
    RAISE EXCEPTION 'Shortname must contain only lowercase letters, numbers, and underscores';
  END IF;
  
  -- Ensure shortname is at least 3 characters
  IF LENGTH(NEW.shortname) < 3 THEN
    RAISE EXCEPTION 'Shortname must be at least 3 characters long';
  END IF;
  
  -- Validate settings is proper JSON
  IF NEW.settings IS NOT NULL AND jsonb_typeof(NEW.settings) != 'object' THEN
    RAISE EXCEPTION 'Settings must be a valid JSON object';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for validation
DROP TRIGGER IF EXISTS validate_organization_trigger ON organizations;
CREATE TRIGGER validate_organization_trigger
BEFORE INSERT OR UPDATE ON organizations
FOR EACH ROW
EXECUTE FUNCTION validate_organization_data();

-- Update or create RLS policies for organizations

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Super admins can create organizations" ON organizations;
DROP POLICY IF EXISTS "Organization admins and super admins can update organizations" ON organizations;
DROP POLICY IF EXISTS "Users can view organizations they belong to" ON organizations;

-- Create new policies
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
    ) OR
    owner_id = auth.uid()
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
    ) OR
    owner_id = auth.uid()
  );

-- Create function to create organization (for super admins only)
CREATE OR REPLACE FUNCTION create_organization(
  org_name TEXT,
  org_shortname TEXT,
  org_settings JSONB DEFAULT '{}'::jsonb
)
RETURNS UUID AS $$
DECLARE
  new_org_id UUID;
BEGIN
  -- Check if user is super admin
  IF NOT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'super_admin'
  ) THEN
    RAISE EXCEPTION 'Only super admins can create organizations';
  END IF;
  
  -- Insert new organization
  INSERT INTO organizations (name, shortname, owner_id, settings)
  VALUES (org_name, org_shortname, auth.uid(), org_settings)
  RETURNING id INTO new_org_id;
  
  RETURN new_org_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;