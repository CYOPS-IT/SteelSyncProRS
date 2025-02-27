// Mock data service that replaces Supabase
// This provides mock implementations of common database operations

export const supabase = {
  auth: {
    signInWithPassword: async () => ({ data: { user: null, session: null }, error: null }),
    signUp: async () => ({ data: { user: null, session: null }, error: null }),
    signOut: async () => ({ error: null }),
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    updateUser: async () => ({ data: { user: null }, error: null })
  },
  from: (table: string) => ({
    select: (columns: string = '*') => ({
      eq: (column: string, value: any) => ({
        single: async () => ({ data: null, error: null }),
        limit: (limit: number) => ({ data: [], error: null }),
        order: (column: string, { ascending = true } = {}) => ({ data: [], error: null })
      }),
      order: (column: string, { ascending = true } = {}) => ({ data: [], error: null }),
      in: (column: string, values: any[]) => ({ data: [], error: null })
    }),
    insert: (values: any) => ({ 
      select: (columns: string = '*') => ({ data: null, error: null }) 
    }),
    update: (values: any) => ({ 
      eq: (column: string, value: any) => ({ data: null, error: null }) 
    }),
    delete: () => ({ 
      eq: (column: string, value: any) => ({ data: null, error: null }) 
    })
  }),
  rpc: (func: string, params: any = {}) => ({ data: null, error: null })
};

// Local storage based data service
export const localDataService = {
  // Store data in localStorage with a prefix to avoid conflicts
  storeData: (key: string, data: any) => {
    localStorage.setItem(`steelsync_${key}`, JSON.stringify(data));
    return { data, error: null };
  },
  
  // Retrieve data from localStorage
  getData: (key: string) => {
    try {
      const data = localStorage.getItem(`steelsync_${key}`);
      return { data: data ? JSON.parse(data) : null, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
  
  // Remove data from localStorage
  removeData: (key: string) => {
    localStorage.removeItem(`steelsync_${key}`);
    return { error: null };
  },
  
  // Clear all app data from localStorage
  clearAllData: () => {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('steelsync_')) {
        localStorage.removeItem(key);
      }
    });
    return { error: null };
  }
};