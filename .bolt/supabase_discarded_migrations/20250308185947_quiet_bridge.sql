/*
  # Company Management Schema

  1. New Tables
    - `companies`
      - Core company information including name, subscription tier, and settings
      - Owner reference to auth.users
    - `company_members`
      - Manages company membership and roles
      - References both companies and auth.users

  2. Security
    - RLS enabled on both tables
    - Granular policies for company owners and members
    - Cascade deletes for memberships

  3. Functions
    - Helper function to create company and set up initial ownership
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can create companies" ON companies;
  DROP POLICY IF EXISTS "Users can view their own companies" ON companies;
  DROP POLICY IF EXISTS "Only owners can update their companies" ON companies;
  DROP POLICY IF EXISTS "Only owners can delete their companies" ON companies;
  DROP POLICY IF EXISTS "Company owners can manage members" ON company_members;
  DROP POLICY IF EXISTS "Members can view their memberships" ON company_members;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

-- Create companies table
CREATE TABLE IF NOT EXISTS companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  owner_id uuid NOT NULL REFERENCES auth.users(id),
  subscription_tier text DEFAULT 'free',
  active boolean DEFAULT true,
  settings jsonb DEFAULT '{}'::jsonb
);

-- Create company_members table
CREATE TABLE IF NOT EXISTS company_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'member',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, user_id)
);

-- Enable RLS
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_members ENABLE ROW LEVEL SECURITY;

-- Companies policies
CREATE POLICY "Users can create companies" ON companies
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can view their own companies" ON companies
  FOR SELECT TO authenticated
  USING ((auth.uid() = owner_id) OR (EXISTS (
    SELECT 1 FROM company_members
    WHERE company_members.company_id = companies.id
    AND company_members.user_id = auth.uid()
  )));

CREATE POLICY "Only owners can update their companies" ON companies
  FOR UPDATE TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Only owners can delete their companies" ON companies
  FOR DELETE TO authenticated
  USING (auth.uid() = owner_id);

-- Company members policies
CREATE POLICY "Company owners can manage members" ON company_members
  FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM companies
    WHERE companies.id = company_members.company_id
    AND companies.owner_id = auth.uid()
  ));

CREATE POLICY "Members can view their memberships" ON company_members
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Function to create a company and add the creator as owner
CREATE OR REPLACE FUNCTION create_company(
  company_name text,
  subscription_tier text DEFAULT 'free'
)
RETURNS companies
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_company companies;
BEGIN
  -- Insert the company
  INSERT INTO companies (name, owner_id, subscription_tier)
  VALUES (company_name, auth.uid(), subscription_tier)
  RETURNING * INTO new_company;

  -- Add the creator as an owner in company_members
  INSERT INTO company_members (company_id, user_id, role)
  VALUES (new_company.id, auth.uid(), 'owner');

  RETURN new_company;
END;
$$;