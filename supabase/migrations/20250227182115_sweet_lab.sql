/*
  # Create secure profile creation function

  1. New Functions
    - `create_user_profile`: Allows creating a user profile bypassing RLS
  
  2. Security
    - Function uses SECURITY DEFINER to run with elevated privileges
    - Ensures proper profile creation during registration
*/

-- Create a function to securely create user profiles
CREATE OR REPLACE FUNCTION create_user_profile(
  user_id UUID,
  user_email TEXT,
  user_full_name TEXT,
  user_role TEXT DEFAULT 'standard_user'
) RETURNS VOID AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, role)
  VALUES (user_id, user_email, user_full_name, user_role)
  ON CONFLICT (id) DO UPDATE
  SET 
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;