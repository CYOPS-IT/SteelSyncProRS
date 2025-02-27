import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface AdminRouteProps {
  children: React.ReactNode;
  requiredRole?: 'super_admin' | 'organization_admin';
}

const AdminRoute: React.FC<AdminRouteProps> = ({ 
  children, 
  requiredRole = 'organization_admin' 
}) => {
  const { userProfile, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  // Check if user has the required role
  const hasAccess = userProfile?.role === 'super_admin' || 
    (requiredRole === 'organization_admin' && userProfile?.role === 'organization_admin');
  
  if (!userProfile || !hasAccess) {
    return <Navigate to="/dashboard" />;
  }
  
  return <>{children}</>;
};

export default AdminRoute;