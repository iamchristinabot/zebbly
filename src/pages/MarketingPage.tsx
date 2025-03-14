import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid,
  Paper,
  useTheme
} from '@mui/material';
import Header from '../components/header/Header';

const MarketingPage = () => {
  const theme = useTheme();
  
  return (
    <>
      <Header isAuthenticated={false} />
      
      <Box 
        sx={{ 
          background: `linear-gradient(120deg, ${theme.palette.brand.pink} 0%, ${theme.palette.brand.mint} 100%)`,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom>
                Save and organize your shopping lists
              </Typography>
              <Typography variant="h5" paragraph>
                Zebbly helps you keep track of everything you want to buy across all your favorite stores.
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                sx={{ 
                  mt: 2,
                  borderRadius: 20,
                  px: 4,
                  py: 1.5,
                  fontWeight: 600
                }}
              >
                Get Started - It's Free
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={0}
                sx={{ 
                  borderRadius: 4,
                  overflow: 'hidden',
                  border: `1px solid ${theme.palette.brand.lightGray}`
                }}
              >
                <Box 
                  component="img"
                  src="/hero-image.png"
                  alt="Zebbly App Screenshot"
                  sx={{ 
                    width: '100%',
                    height: 'auto'
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          How Zebbly Works
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                height: '100%',
                border: `1px solid ${theme.palette.brand.lightGray}`,
                borderRadius: 2
              }}
            >
              <Typography variant="h5" component="h3" gutterBottom>
                Save items from anywhere
              </Typography>
              <Typography>
                Use our browser extension to save products from any website with a single click.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                height: '100%',
                border: `1px solid ${theme.palette.brand.lightGray}`,
                borderRadius: 2
              }}
            >
              <Typography variant="h5" component="h3" gutterBottom>
                Organize into lists
              </Typography>
              <Typography>
                Create lists for different occasions, people, or categories to keep everything organized.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                height: '100%',
                border: `1px solid ${theme.palette.brand.lightGray}`,
                borderRadius: 2
              }}
            >
              <Typography variant="h5" component="h3" gutterBottom>
                Share with friends
              </Typography>
              <Typography>
                Easily share your lists with friends and family for birthdays, holidays, and special occasions.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MarketingPage; 