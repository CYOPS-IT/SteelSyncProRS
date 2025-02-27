export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: string
        }
        Insert: {
          id: string
          created_at?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: string
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      projects: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string | null
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description?: string | null
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      roles: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_at?: string
        }
        Relationships: []
      }
      organizations: {
        Row: {
          id: string
          name: string
          shortname: string
          created_at: string
          owner_id: string | null
          settings: Json
        }
        Insert: {
          id?: string
          name: string
          shortname: string
          created_at?: string
          owner_id?: string | null
          settings?: Json
        }
        Update: {
          id?: string
          name?: string
          shortname?: string
          created_at?: string
          owner_id?: string | null
          settings?: Json
        }
        Relationships: [
          {
            foreignKeyName: "organizations_owner_id_fkey"
            columns: ["owner_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      organization_members: {
        Row: {
          id: string
          organization_id: string
          profile_id: string
          role_id: string
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          profile_id: string
          role_id: string
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          profile_id?: string
          role_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_members_organization_id_fkey"
            columns: ["organization_id"]
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_members_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_members_role_id_fkey"
            columns: ["role_id"]
            referencedRelation: "roles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_super_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_organization_admin: {
        Args: {
          org_id: string
        }
        Returns: boolean
      }
      is_organization_member: {
        Args: {
          org_id: string
        }
        Returns: boolean
      }
      create_user_profile: {
        Args: {
          user_id: string
          user_email: string
          user_full_name: string
          user_role?: string
        }
        Returns: void
      }
      create_organization: {
        Args: {
          org_name: string
          org_shortname: string
          org_settings?: Json
        }
        Returns: string
      }
      validate_organization_data: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}