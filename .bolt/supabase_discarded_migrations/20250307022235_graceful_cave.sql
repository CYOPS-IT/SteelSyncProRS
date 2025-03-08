/*
  # Initial Database Schema

  1. Tables
    - Organizations: Company/tenant management
    - Users: User accounts with role-based access
    - Roles: Role definitions with organization scoping
    - Permissions: Permission definitions
    - Role Permissions: Role-permission mappings
    - App Settings: Organization-specific settings
    - System Settings: Global system settings
    - Profiles: User profile information
    - Job Queues: Background job queue definitions
    - Jobs: Background job entries
    - Job Logs: Job execution logs
    - External Sync Log: External system sync logging

  2. Security
    - Row Level Security (RLS) enabled on all tables
    - Organization-based access control
    - Role-based permissions
*/

-- Create trigger functions
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE FUNCTION notify_job_runner()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify('jobs', NEW.id::text);
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, company)
  VALUES (
    NEW.id,
    NEW.first_name || ' ' || NEW.last_name,
    NULL
  );
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE FUNCTION update_super_admin_cache()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO system_settings (key, value)
  VALUES ('super_admin_exists', json_build_object('exists', EXISTS (
    SELECT 1 FROM users WHERE role = 'super_admin'
  )))
  ON CONFLICT (key) DO UPDATE
  SET value = json_build_object('exists', EXISTS (
    SELECT 1 FROM users WHERE role = 'super_admin'
  ));
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create tables
CREATE TABLE organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  shortname text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text NOT NULL UNIQUE,
  first_name text,
  last_name text,
  role text NOT NULL,
  organization_id uuid REFERENCES organizations(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  organization_id uuid REFERENCES organizations(id),
  is_system_role boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(name, organization_id)
);

CREATE TABLE permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE role_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id uuid NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  permission_id uuid NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(role_id, permission_id)
);

CREATE TABLE app_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL,
  value text NOT NULL,
  organization_id uuid REFERENCES organizations(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(key, organization_id)
);

CREATE TABLE system_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text,
  company text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE external_sync_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sync_type text NOT NULL,
  status text NOT NULL,
  details jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE job_queues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  max_attempts integer NOT NULL DEFAULT 3,
  retry_delay_seconds integer NOT NULL DEFAULT 60,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  queue_id uuid NOT NULL REFERENCES job_queues(id) ON DELETE CASCADE,
  payload jsonb NOT NULL DEFAULT '{}',
  status job_status NOT NULL DEFAULT 'pending',
  priority integer NOT NULL DEFAULT 0,
  attempts integer NOT NULL DEFAULT 0,
  max_attempts integer NOT NULL DEFAULT 3,
  scheduled_for timestamptz DEFAULT now(),
  processed_at timestamptz,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE job_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  status job_status NOT NULL,
  log_message text,
  execution_time_ms integer,
  error_details jsonb,
  processed_by text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create indexes
CREATE INDEX idx_jobs_queue_id ON jobs(queue_id);
CREATE INDEX idx_jobs_created_by ON jobs(created_by);
CREATE INDEX idx_jobs_status_scheduled_for ON jobs(status, scheduled_for) 
  WHERE status IN ('pending', 'scheduled');
CREATE INDEX idx_job_logs_job_id ON job_logs(job_id);

-- Create triggers
CREATE TRIGGER update_organizations_timestamp
  BEFORE UPDATE ON organizations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_timestamp
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_roles_timestamp
  BEFORE UPDATE ON roles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_app_settings_timestamp
  BEFORE UPDATE ON app_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_queues_updated_at
  BEFORE UPDATE ON job_queues
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER jobs_notification
  AFTER INSERT ON jobs
  FOR EACH ROW
  WHEN (NEW.status = 'pending')
  EXECUTE FUNCTION notify_job_runner();

CREATE TRIGGER on_user_created_or_updated
  AFTER INSERT OR UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

CREATE TRIGGER update_super_admin_cache_trigger
  AFTER INSERT OR DELETE OR UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_super_admin_cache();

-- Enable Row Level Security
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE external_sync_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_queues ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_logs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "orgs_anon_setup_insert" ON organizations
  FOR INSERT TO anon
  WITH CHECK (NOT EXISTS (SELECT 1 FROM users WHERE users.role = 'super_admin'));

CREATE POLICY "orgs_anon_setup_view" ON organizations
  FOR SELECT TO anon
  USING (NOT EXISTS (SELECT 1 FROM users WHERE users.role = 'super_admin'));

CREATE POLICY "orgs_super_admin_all" ON organizations
  FOR ALL TO authenticated
  USING (current_user = 'authenticated')
  WITH CHECK (current_user = 'authenticated');

CREATE POLICY "orgs_user_view" ON organizations
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "users_anon_setup_insert" ON users
  FOR INSERT TO anon
  WITH CHECK (NOT EXISTS (SELECT 1 FROM users users_1 WHERE users_1.role = 'super_admin'));

CREATE POLICY "users_anon_setup_view" ON users
  FOR SELECT TO anon
  USING ((NOT EXISTS (SELECT 1 FROM users users_1 WHERE users_1.role = 'super_admin')) OR (role = 'super_admin'));

CREATE POLICY "users_org_admin_manage" ON users
  FOR ALL TO public
  USING ((auth.jwt() ->> 'role'::text) = 'org_admin' AND organization_id = (auth.jwt() ->> 'org_id')::uuid)
  WITH CHECK ((auth.jwt() ->> 'role'::text) = 'org_admin' AND organization_id = (auth.jwt() ->> 'org_id')::uuid);

CREATE POLICY "users_org_members_view" ON users
  FOR SELECT TO public
  USING ((auth.jwt() ->> 'org_id')::uuid = organization_id);

CREATE POLICY "users_self_view" ON users
  FOR SELECT TO authenticated
  USING (id = auth.uid());

CREATE POLICY "users_super_admin_all" ON users
  FOR ALL TO public
  USING ((auth.jwt() ->> 'role'::text) = 'super_admin')
  WITH CHECK ((auth.jwt() ->> 'role'::text) = 'super_admin');

CREATE POLICY "roles_org_admin_manage" ON roles
  FOR ALL TO public
  USING ((auth.jwt() ->> 'role'::text) = 'org_admin' AND organization_id = (auth.jwt() ->> 'org_id')::uuid)
  WITH CHECK ((auth.jwt() ->> 'role'::text) = 'org_admin' AND organization_id = (auth.jwt() ->> 'org_id')::uuid);

CREATE POLICY "roles_super_admin_all" ON roles
  FOR ALL TO public
  USING ((auth.jwt() ->> 'role'::text) = 'super_admin')
  WITH CHECK ((auth.jwt() ->> 'role'::text) = 'super_admin');

CREATE POLICY "roles_user_view" ON roles
  FOR SELECT TO public
  USING (organization_id IS NULL OR organization_id = (auth.jwt() ->> 'org_id')::uuid);

CREATE POLICY "permissions_super_admin_all" ON permissions
  FOR ALL TO public
  USING ((auth.jwt() ->> 'role'::text) = 'super_admin')
  WITH CHECK ((auth.jwt() ->> 'role'::text) = 'super_admin');

CREATE POLICY "permissions_user_view" ON permissions
  FOR SELECT TO public
  USING (true);

CREATE POLICY "role_permissions_org_admin_manage" ON role_permissions
  FOR ALL TO public
  USING ((auth.jwt() ->> 'role'::text) = 'org_admin' AND EXISTS (
    SELECT 1 FROM roles WHERE roles.id = role_permissions.role_id 
    AND roles.organization_id = (auth.jwt() ->> 'org_id')::uuid
  ))
  WITH CHECK ((auth.jwt() ->> 'role'::text) = 'org_admin' AND EXISTS (
    SELECT 1 FROM roles WHERE roles.id = role_permissions.role_id 
    AND roles.organization_id = (auth.jwt() ->> 'org_id')::uuid
  ));

CREATE POLICY "role_permissions_super_admin_all" ON role_permissions
  FOR ALL TO public
  USING ((auth.jwt() ->> 'role'::text) = 'super_admin')
  WITH CHECK ((auth.jwt() ->> 'role'::text) = 'super_admin');

CREATE POLICY "role_permissions_user_view" ON role_permissions
  FOR SELECT TO public
  USING (true);

CREATE POLICY "org_admin_manage_org_settings" ON app_settings
  FOR ALL TO public
  USING ((auth.jwt() ->> 'role'::text) = 'org_admin' AND organization_id = (auth.jwt() ->> 'org_id')::uuid)
  WITH CHECK ((auth.jwt() ->> 'role'::text) = 'org_admin' AND organization_id = (auth.jwt() ->> 'org_id')::uuid);

CREATE POLICY "super_admin_manage_settings" ON app_settings
  FOR ALL TO public
  USING ((auth.jwt() ->> 'role'::text) = 'super_admin')
  WITH CHECK ((auth.jwt() ->> 'role'::text) = 'super_admin');

CREATE POLICY "users_read_settings" ON app_settings
  FOR SELECT TO public
  USING (organization_id IS NULL OR organization_id = (auth.jwt() ->> 'org_id')::uuid);

CREATE POLICY "system_settings_anyone_read" ON system_settings
  FOR SELECT TO public
  USING (true);

CREATE POLICY "system_settings_super_admin_all" ON system_settings
  FOR ALL TO public
  USING ((auth.jwt() ->> 'role'::text) = 'super_admin')
  WITH CHECK ((auth.jwt() ->> 'role'::text) = 'super_admin');

CREATE POLICY "Users can read their own profile" ON profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "external_sync_log_super_admin_all" ON external_sync_log
  FOR ALL TO public
  USING ((auth.jwt() ->> 'role'::text) = 'super_admin')
  WITH CHECK ((auth.jwt() ->> 'role'::text) = 'super_admin');

CREATE POLICY "external_sync_log_user_view" ON external_sync_log
  FOR SELECT TO public
  USING (true);

CREATE POLICY "Administrators can view all job queues" ON job_queues
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Only super admins can manage job queues" ON job_queues
  FOR ALL TO authenticated
  USING ((auth.jwt() ->> 'role'::text) = 'super_admin')
  WITH CHECK ((auth.jwt() ->> 'role'::text) = 'super_admin');

CREATE POLICY "Administrators can view all jobs" ON jobs
  FOR SELECT TO authenticated
  USING ((auth.jwt() ->> 'role'::text) = ANY (ARRAY['super_admin', 'org_admin']));

CREATE POLICY "Only super admins can manage all jobs" ON jobs
  FOR ALL TO authenticated
  USING ((auth.jwt() ->> 'role'::text) = 'super_admin')
  WITH CHECK ((auth.jwt() ->> 'role'::text) = 'super_admin');

CREATE POLICY "Users can create jobs" ON jobs
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view their own jobs" ON jobs
  FOR SELECT TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "Administrators can view all job logs" ON job_logs
  FOR SELECT TO authenticated
  USING ((auth.jwt() ->> 'role'::text) = ANY (ARRAY['super_admin', 'org_admin']));

CREATE POLICY "System role can manage job logs" ON job_logs
  FOR ALL TO authenticated
  USING ((auth.jwt() ->> 'role'::text) = 'service_role')
  WITH CHECK ((auth.jwt() ->> 'role'::text) = 'service_role');

CREATE POLICY "Users can view logs for their own jobs" ON job_logs
  FOR SELECT TO authenticated
  USING (job_id IN (SELECT id FROM jobs WHERE jobs.created_by = auth.uid()));

-- Grant necessary permissions to roles
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;