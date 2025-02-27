// Static data for the application
export const features = [
  {
    id: '1',
    title: 'Inventory Management',
    description: 'Track raw materials, work-in-progress, and finished goods with real-time updates and alerts.',
    icon: 'StorageIcon'
  },
  {
    id: '2',
    title: 'Production Analytics',
    description: 'Gain insights into production efficiency, bottlenecks, and opportunities for improvement.',
    icon: 'BarChartIcon'
  },
  {
    id: '3',
    title: 'Team Collaboration',
    description: 'Enable seamless communication between departments with role-based access and notifications.',
    icon: 'GroupsIcon'
  },
  {
    id: '4',
    title: 'Quality Control',
    description: 'Implement quality checks at every stage of production to ensure consistent product quality.',
    icon: 'ShieldIcon'
  }
];

export const testimonials = [
  {
    id: '1',
    quote: 'Steel Sync Pro has transformed our manufacturing process. We\'ve seen a 30% increase in efficiency and significant reduction in waste.',
    author: 'John Doe',
    position: 'Operations Manager, Steel Industries Inc.',
    initials: 'JD'
  },
  {
    id: '2',
    quote: 'The analytics capabilities have given us insights we never had before. Our decision-making is now data-driven and more effective.',
    author: 'Jane Smith',
    position: 'CEO, MetalWorks Co.',
    initials: 'JS'
  }
];

export const capabilities = [
  {
    id: '1',
    title: 'Production Management',
    description: 'Comprehensive production planning, scheduling, and execution capabilities to optimize your manufacturing processes.',
    icon: 'FactoryIcon',
    features: [
      'Production scheduling',
      'Work order management',
      'Real-time monitoring',
      'Capacity planning'
    ]
  },
  {
    id: '2',
    title: 'Inventory Control',
    description: 'Advanced inventory management capabilities to track, optimize, and control your materials and finished goods.',
    icon: 'InventoryIcon',
    features: [
      'Real-time inventory tracking',
      'Automated reordering',
      'Barcode/RFID integration',
      'Inventory forecasting'
    ]
  },
  {
    id: '3',
    title: 'Maintenance Management',
    description: 'Proactive maintenance capabilities to maximize equipment uptime and extend asset lifecycles.',
    icon: 'BuildIcon',
    features: [
      'Preventive maintenance',
      'Predictive maintenance',
      'Work order management',
      'Spare parts inventory'
    ]
  }
];

export const techStack = [
  {
    id: '1',
    title: 'Frontend',
    description: 'Modern, responsive user interfaces built with React and TypeScript.',
    icon: 'CodeIcon',
    technologies: ['React', 'TypeScript', 'Material UI', 'Tailwind CSS']
  },
  {
    id: '2',
    title: 'Backend',
    description: 'Scalable, secure backend services built with Node.js and PostgreSQL.',
    icon: 'StorageOutlinedIcon',
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'Supabase']
  },
  {
    id: '3',
    title: 'Infrastructure',
    description: 'Cloud-native infrastructure for reliability, scalability, and security.',
    icon: 'CloudIcon',
    technologies: ['Docker', 'Kubernetes', 'AWS', 'Terraform']
  },
  {
    id: '4',
    title: 'Development',
    description: 'Modern development practices for code quality and developer productivity.',
    icon: 'DesignServicesIcon',
    technologies: ['Git', 'CI/CD', 'Jest', 'ESLint']
  }
];

// Mock functions to replace API calls
export const fetchProjects = async () => {
  return [];
};

export const fetchDashboardStats = async () => {
  return {
    efficiency: 85,
    efficiencyChange: 5,
    downtime: 45,
    downtimeUnit: 'minutes',
    lowStockItems: 3,
    qualityIssues: 2,
    activeProjects: 8,
    dailyProduction: 850,
    dailyTarget: 1000,
    totalStock: 12500
  };
};

export const fetchProductionItems = async () => {
  return [];
};

export const fetchInventoryItems = async () => {
  return [];
};

export const fetchActivityItems = async () => {
  return [];
};