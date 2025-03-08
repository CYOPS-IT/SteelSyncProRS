export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  department: string;
  joinDate: string;
  profileImage?: string;
  company?: string;
}

export const DEFAULT_PROFILE_IMAGES = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=200&h=200',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=200&h=200',
  'https://images.unsplash.com/photo-1599566150163-29194dcaad36?fit=crop&w=200&h=200',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=200&h=200',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=200&h=200'
];