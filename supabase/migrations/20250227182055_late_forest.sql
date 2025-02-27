/*
  # Fix profiles RLS policies

  1. Changes
    - Add policy to allow users to insert their own profile
    - Modify existing policies to be more permissive for new users
  
  2. Security
    - Maintain security while allowing proper user registration
    - Ensure users can only access their own data
*/

-- Add policy to allow users to create their own profile
CREATE POLICY "Users can create their own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Update the select policy to be more permissive
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
CREATE POLICY "Users can view their own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Update the update policy to be more permissive
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);