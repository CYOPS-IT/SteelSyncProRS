// Basic types for the application
export interface ProductionItem {
  id: string;
  name: string;
  progress: number;
  status: string;
  due_date: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  status: string;
}

export interface ActivityItem {
  id: string;
  action: string;
  timestamp: string;
  type: string;
  message: string;
  time: string;
}

export interface DashboardStats {
  efficiency: number;
  efficiencyChange: number;
  downtime: number;
  downtimeUnit: string;
  lowStockItems: number;
  qualityIssues: number;
  activeProjects: number;
  dailyProduction: number;
  dailyTarget: number;
  totalStock: number;
}

export interface FavoriteModule {
  id: string;
  title: string;
  path: string;
  icon: React.ReactNode;
  description: string;
}