import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingPanelProps {
  message?: string;
  size?: number;
}

/**
 * A minimal loading indicator component that displays a spinner and optional message
 */
const LoadingPanel: React.FC<LoadingPanelProps> = ({
  message = 'Loading...',
  size = 40
}) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        flexDirection: 'column',
        py: 2
      }}
    >
      <CircularProgress size={size} />
      {message && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingPanel;