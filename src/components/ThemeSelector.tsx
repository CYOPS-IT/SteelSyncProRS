import React from 'react';
import { Box, Typography, Grid, Paper, IconButton, Tooltip } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Theme, ThemeStyle, ThemeVariant, useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { themeColors } from '../contexts/ThemeContext';

interface ThemePreviewProps {
  style: ThemeStyle;
  variant: ThemeVariant;
  selected: boolean;
  onClick: () => void;
}

const ThemePreview: React.FC<ThemePreviewProps> = ({ style, variant, selected, onClick }) => {
  const colors = themeColors[style];
  
  return (
    <Paper
      onClick={onClick}
      elevation={selected ? 3 : 1}
      sx={{
        p: 3,
        cursor: 'pointer',
        bgcolor: variant === 'dark' ? colors.paperDark : colors.paper,
        border: '2px solid',
        borderColor: selected ? 'primary.main' : 'divider',
        borderRadius: 3,
        transition: 'all 0.2s ease-in-out',
        minHeight: '180px',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 12px 28px rgba(0,0,0,0.15)'
        }
      }}
    >
      <Box 
        sx={{ 
          mb: 2,
          height: '80px',
          background: colors.gradient,
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
        }} 
      />
      <Box sx={{ mb: 2, height: '16px', width: '100%', bgcolor: colors.primary, borderRadius: 1, opacity: 0.2 }} />
      <Box sx={{ height: '12px', width: '70%', bgcolor: colors.secondary, borderRadius: 0.5, opacity: 0.15 }} />
      <Typography
        variant="body1"
        align="center"
        sx={{
          mt: 3,
          textTransform: 'capitalize',
          fontWeight: selected ? 600 : 500,
          color: selected ? 'primary.main' : 'text.primary',
          fontSize: '1rem'
        }}
      >
        {style}
        {selected && (
          <Box
            component="span"
            sx={{
              display: 'inline-block',
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: 'primary.main',
              ml: 1,
              verticalAlign: 'middle'
            }}
          />
        )}
      </Typography>
    </Paper>
  );
};

const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated } = useAuth();
  
  const handleThemeChange = (style: ThemeStyle, variant: ThemeVariant) => {
    if (!isAuthenticated) return;
    setTheme({ style, variant });
    localStorage.setItem('themeVariant', variant);
  };

  const handleVariantToggle = () => {
    const newVariant = theme.variant === 'light' ? 'dark' : 'light';
    handleThemeChange(theme.style, newVariant);
  };
  const themeStyles: ThemeStyle[] = [
    'industrial',
    'forge',
    'steel',
    'carbon',
    'titanium',
    'copper',
    'chrome',
    'alloy',
    'iron',
    'platinum'
  ];
  
  if (!isAuthenticated) {
    return (
      <Box>
        <Typography variant="body1" color="text.secondary" align="center">
          Theme customization is only available for authenticated users.
        </Typography>
      </Box>
    );
  }
  
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4,
          gap: 2 
        }}>
          <Box>
            <Typography variant="h6" gutterBottom>Theme Style</Typography>
            <Typography variant="body2" color="text.secondary">
              Choose your preferred color scheme and toggle between light and dark modes
            </Typography>
          </Box>
          <Tooltip title={theme.variant === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
            <IconButton 
              onClick={handleVariantToggle}
              sx={{ 
                width: 56,
                height: 56,
                bgcolor: theme => theme.variant === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                '&:hover': {
                  bgcolor: theme => theme.variant === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
                }
              }}
            >
              {theme.variant === 'dark' ? (
                <DarkModeIcon sx={{ fontSize: 28 }} />
              ) : (
                <LightModeIcon sx={{ fontSize: 28 }} />
              )}
            </IconButton>
          </Tooltip>
        </Box>
        <Grid container spacing={2}>
          {themeStyles.map((style) => (
            <Grid item xs={12} sm={6} md={4} key={style}>
              <ThemePreview
                style={style}
                variant={theme.variant}
                selected={theme.style === style}
                onClick={() => handleThemeChange(style, theme.variant)}
              />
              <Typography
                variant="body2"
                align="center"
                sx={{
                  mt: 2,
                  textTransform: 'capitalize',
                  fontWeight: theme.style === style ? 600 : 400,
                  color: theme.style === style ? 'primary.main' : 'text.secondary'
                }}
              >
                {style}
                {theme.style === style && (
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-block',
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      ml: 1
                    }}
                  />
                )}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ThemeSelector;