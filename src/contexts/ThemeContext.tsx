import React, { createContext, useContext, useState } from 'react';
import { Theme as MuiTheme } from '@mui/material';

export type ThemeVariant = 'light' | 'dark';
export type ThemeStyle = 'industrial' | 'forge' | 'steel' | 'carbon' | 'titanium' | 'copper' | 'chrome' | 'alloy' | 'iron' | 'platinum';

export interface Theme {
  style: ThemeStyle;
  variant: ThemeVariant;
}

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  getMuiTheme: () => MuiTheme;
};

const defaultTheme: Theme = {
  style: 'industrial',
  variant: localStorage.getItem('themeVariant') as ThemeVariant || 'light'
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme color definitions
export const themeColors: Record<ThemeStyle, {
  primary: string;
  secondary: string;
  background: string;
  backgroundDark: string;
  paper: string;
  paperDark: string;
  text: string;
  textSecondary: string;
  textDark: string;
  textSecondaryDark: string;
  gradient: string;
}> = {
  industrial: {
    primary: '#FF4D00',
    secondary: '#FFB800',
    background: '#F4F7FE',
    backgroundDark: '#111827',
    paper: '#FFFFFF',
    paperDark: '#1F2937',
    text: '#111827',
    textSecondary: '#4B5563',
    textDark: '#F3F4F6',
    textSecondaryDark: '#9CA3AF',
    gradient: 'linear-gradient(135deg, #FF4D00 0%, #FFB800 50%, #FFF700 100%)'
  },
  forge: {
    primary: '#E53E3E',
    secondary: '#F6AD55',
    background: '#EDF6F9',
    backgroundDark: '#0A1D1F',
    paper: '#FFFFFF',
    paperDark: '#132B2E',
    text: '#132B2E',
    textSecondary: '#2C5559',
    textDark: '#E3F1F4',
    textSecondaryDark: '#83C5BE',
    gradient: 'linear-gradient(135deg, #E53E3E 0%, #F6AD55 50%, #FBD38D 100%)'
  },
  steel: {
    primary: '#2B6CB0',
    secondary: '#63B3ED',
    background: '#F0F7F4',
    backgroundDark: '#1B2D22',
    paper: '#FFFFFF',
    paperDark: '#2D3D35',
    text: '#1B2D22',
    textSecondary: '#40916C',
    textDark: '#D8F3DC',
    textSecondaryDark: '#95D5B2',
    gradient: 'linear-gradient(135deg, #2B6CB0 0%, #63B3ED 50%, #90CDF4 100%)'
  },
  carbon: {
    primary: '#1A202C',
    secondary: '#4A5568',
    background: '#FDF6F3',
    backgroundDark: '#2A1B17',
    paper: '#FFFFFF',
    paperDark: '#3D2B26',
    text: '#2A1B17',
    textSecondary: '#B85C41',
    textDark: '#FAE1D7',
    textSecondaryDark: '#F4A261',
    gradient: 'linear-gradient(135deg, #1A202C 0%, #4A5568 50%, #718096 100%)'
  },
  titanium: {
    primary: '#805AD5',
    secondary: '#B794F4',
    background: '#F3EBFA',
    backgroundDark: '#1D0934',
    paper: '#FFFFFF',
    paperDark: '#2D1B44',
    text: '#1D0934',
    textSecondary: '#7B2CBF',
    textDark: '#E9D8FD',
    textSecondaryDark: '#9D4EDD',
    gradient: 'linear-gradient(135deg, #805AD5 0%, #B794F4 50%, #D6BCFA 100%)'
  },
  copper: {
    primary: '#DD6B20',
    secondary: '#F6AD55',
    background: '#F0F1FE',
    backgroundDark: '#0F0A2A',
    paper: '#FFFFFF',
    paperDark: '#1F1B3D',
    text: '#0F0A2A',
    textSecondary: '#3A0CA3',
    textDark: '#E2E4FF',
    textSecondaryDark: '#4361EE',
    gradient: 'linear-gradient(135deg, #DD6B20 0%, #F6AD55 50%, #FBD38D 100%)'
  },
  chrome: {
    primary: '#718096',
    secondary: '#A0AEC0',
    background: '#F1F8F2',
    backgroundDark: '#0F1F13',
    paper: '#FFFFFF',
    paperDark: '#1F2F23',
    text: '#0F1F13',
    textSecondary: '#2B9348',
    textDark: '#E3F1E5',
    textSecondaryDark: '#55A630',
    gradient: 'linear-gradient(135deg, #718096 0%, #A0AEC0 50%, #CBD5E0 100%)'
  },
  alloy: {
    primary: '#4A5568',
    secondary: '#718096',
    background: '#FAF4EF',
    backgroundDark: '#231912',
    paper: '#FFFFFF',
    paperDark: '#332922',
    text: '#231912',
    textSecondary: '#BC6C25',
    textDark: '#F8E5D3',
    textSecondaryDark: '#DDA15E',
    gradient: 'linear-gradient(135deg, #4A5568 0%, #718096 50%, #A0AEC0 100%)'
  },
  iron: {
    primary: '#2D3748',
    secondary: '#4A5568',
    background: '#F6EDFB',
    backgroundDark: '#1A0B24',
    paper: '#FFFFFF',
    paperDark: '#2A1B34',
    text: '#1A0B24',
    textSecondary: '#7209B7',
    textDark: '#F0E0F9',
    textSecondaryDark: '#B5179E',
    gradient: 'linear-gradient(135deg, #2D3748 0%, #4A5568 50%, #718096 100%)'
  },
  platinum: {
    primary: '#A0AEC0',
    secondary: '#CBD5E0',
    background: '#F0F9FC',
    backgroundDark: '#0A1B24',
    paper: '#FFFFFF',
    paperDark: '#1A2B34',
    text: '#0A1B24',
    textSecondary: '#0077B6',
    textDark: '#E1F2F7',
    textSecondaryDark: '#00B4D8',
    gradient: 'linear-gradient(135deg, #A0AEC0 0%, #CBD5E0 50%, #E2E8F0 100%)'
  }
};

const createMuiTheme = (theme: Theme): MuiTheme => {
  const colors = themeColors[theme.style];
  
  // Default light theme for unauthenticated users
  const defaultColors = themeColors.industrial;
  
  return {
    palette: {
      mode: theme.variant,
      primary: {
        main: colors.primary,
        light: colors.secondary,
        dark: colors.text
      },
      secondary: {
        main: colors.secondary
      },
      background: {
        default: theme.variant === 'dark' ? colors.backgroundDark : colors.background,
        paper: theme.variant === 'dark' ? colors.paperDark : colors.paper
      },
      text: {
        primary: theme.variant === 'dark' ? colors.textDark : colors.text,
        secondary: theme.variant === 'dark' ? colors.textSecondaryDark : colors.textSecondary
      }
    },
    typography: {
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
      h1: { 
        fontSize: '2.5rem', 
        fontWeight: 800,
        letterSpacing: '-0.02em',
        lineHeight: 1.2
      },
      h2: { 
        fontSize: '2rem', 
        fontWeight: 700,
        letterSpacing: '-0.00833em',
        lineHeight: 1.3
      },
      h3: { 
        fontSize: '1.75rem', 
        fontWeight: 600,
        letterSpacing: '0em',
        lineHeight: 1.4
      },
      h4: { 
        fontSize: '1.5rem', 
        fontWeight: 600,
        letterSpacing: '0.00735em',
        lineHeight: 1.4
      },
      h5: { 
        fontSize: '1.25rem', 
        fontWeight: 600,
        letterSpacing: '0em',
        lineHeight: 1.5
      },
      h6: { 
        fontSize: '1rem', 
        fontWeight: 600,
        letterSpacing: '0.0075em',
        lineHeight: 1.5
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
        letterSpacing: '0.00938em'
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.6,
        letterSpacing: '0.01071em'
      },
      button: { 
        textTransform: 'none', 
        fontWeight: 500,
        letterSpacing: '0.02857em'
      },
      caption: {
        fontSize: '0.75rem',
        lineHeight: 1.66,
        letterSpacing: '0.03333em'
      },
      overline: {
        fontSize: '0.75rem',
        fontWeight: 500,
        letterSpacing: '0.08333em',
        textTransform: 'uppercase',
        lineHeight: 2.66
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 500,
            backgroundColor: 'primary.main',
            boxShadow: theme => theme.variant === 'dark' ? 
              '0 4px 15px rgba(0, 0, 0, 0.3)' :
              '0 4px 15px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'primary.dark',
              boxShadow: theme => theme.variant === 'dark' ? 
                '0 8px 25px rgba(0, 0, 0, 0.4)' :
                '0 8px 25px rgba(0, 0, 0, 0.15)',
              transform: 'translateY(-2px)',
            },
            '&:active': {
              transform: 'translateY(0)',
              boxShadow: theme => theme.variant === 'dark' ? 
                '0 4px 15px rgba(0, 0, 0, 0.3)' :
                '0 4px 15px rgba(0, 0, 0, 0.1)'
            }
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: theme => theme.variant === 'dark' ? 
              '0 8px 32px rgba(0, 0, 0, 0.3)' :
              '0 8px 32px rgba(0, 98, 230, 0.1)',
            backdropFilter: 'blur(10px)',
            background: theme => theme.variant === 'dark' ?
              `linear-gradient(135deg, ${colors.paperDark}F2, ${colors.backgroundDark}F2)` :
              `linear-gradient(135deg, ${colors.paper}F2, ${colors.background}F2)`,
            border: theme => `1px solid ${theme.variant === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 98, 230, 0.05)'}`
          }
        }
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: theme => theme.variant === 'dark' ?
              '0 4px 20px rgba(0, 0, 0, 0.2)' :
              '0 4px 20px rgba(0, 98, 230, 0.1)',
            backdropFilter: 'blur(12px)',
            background: theme => theme.variant === 'dark' ?
              `linear-gradient(180deg, ${colors.paperDark}F2, ${colors.backgroundDark}F2)` :
              `linear-gradient(180deg, ${colors.paper}F2, ${colors.background}F2)`,
            borderBottom: theme => `1px solid ${theme.variant === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 98, 230, 0.05)'}`
          }
        }
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            height: 8,
            backgroundColor: theme => theme.variant === 'dark' ? 
              `${colors.paperDark}33` : 
              `${colors.paper}33`
          },
          bar: {
            borderRadius: 8,
            background: colors.gradient
          }
        }
      }
    }
  };
};

export const ThemeProvider: React.FC<{ children: React.ReactNode; isAuthenticated?: boolean }> = ({ children, isAuthenticated = false }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (isAuthenticated) {
      const saved = localStorage.getItem('theme');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return defaultTheme;
        }
      }
      return defaultTheme;
    }
    return defaultTheme;
  });

  const handleThemeChange = (newTheme: Theme) => {
    if (isAuthenticated) {
      setTheme(newTheme);
      localStorage.setItem('theme', JSON.stringify(newTheme));
    }
  };

  const getMuiTheme = () => {
    // Only apply custom theme for authenticated users
    const themeToUse = isAuthenticated ? theme : defaultTheme;
    return createMuiTheme(themeToUse);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange, getMuiTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};