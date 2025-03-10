import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Box, 
  Button,
  useTheme,
  Container
} from '@mui/material';
import ZebblyLogo from './ZebblyLogo';

const MarketingHeader = () => {
  const theme = useTheme();
  
  return (
    <AppBar position="static" color="default" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Box sx={{ mr: 2 }}>
            <ZebblyLogo width={120} height={40} sx={{ color: theme.palette.text.primary }} />
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button 
              color="inherit" 
              sx={{ 
                mr: 2, 
                fontWeight: 500,
                fontSize: '1rem'
              }}
            >
              Features
            </Button>
            <Button 
              color="inherit" 
              sx={{ 
                mr: 2, 
                fontWeight: 500,
                fontSize: '1rem'
              }}
            >
              How It Works
            </Button>
            <Button 
              color="inherit" 
              sx={{ 
                mr: 2, 
                fontWeight: 500,
                fontSize: '1rem'
              }}
            >
              Pricing
            </Button>
            <Button 
              color="inherit" 
              sx={{ 
                mr: 2, 
                fontWeight: 500,
                fontSize: '1rem'
              }}
            >
              Log In
            </Button>
            <Button 
              variant="contained"
              color="primary"
              sx={{ 
                borderRadius: 20,
                px: 3,
                py: 1,
                fontWeight: 600
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MarketingHeader; 