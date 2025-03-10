import React, { useState, useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
  CircularProgress,
  useTheme
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../stores/storeContext';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import UserSuggestionCard from '../components/UserSuggestionCard';

const HomePage = observer(({ isAuthenticated }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { userStore } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  
  // Get current user data
  const currentUser = userStore.getUserById('me');
  
  // Get suggested users (users the current user is not following)
  const suggestedUsers = userStore.getSuggestedUsers(3);
  
  useEffect(() => {
    // Simulate API call to fetch data
    setTimeout(() => {
      // Generate sample trending products
      const sampleTrending = Array(8).fill().map((_, index) => ({
        id: `trending-${index + 1}`,
        type: 'product',
        title: `Trending Product ${index + 1}`,
        image: `https://picsum.photos/seed/trending-${index + 1}/300/200`,
        price: (19.99 + index * 5).toFixed(2),
        store: ['Amazon', 'Target', 'Walmart', 'Best Buy'][index % 4],
        user: ['Jessica Anderson', 'Michael Chen', 'Sophia Rodriguez', 'David Johnson'][index % 4],
        userId: [(index % 4) + 1].toString(),
        likes: Math.floor(Math.random() * 100) + 10,
        comments: Math.floor(Math.random() * 20)
      }));
      
      // Generate sample recently viewed products
      const sampleRecent = Array(4).fill().map((_, index) => ({
        id: `recent-${index + 1}`,
        type: 'product',
        title: `Recently Viewed ${index + 1}`,
        image: `https://picsum.photos/seed/recent-${index + 1}/300/200`,
        price: (29.99 + index * 10).toFixed(2),
        store: ['Amazon', 'Target', 'Walmart', 'Best Buy'][index % 4],
        user: ['Jessica Anderson', 'Michael Chen', 'Sophia Rodriguez', 'David Johnson'][index % 4],
        userId: [(index % 4) + 1].toString(),
        likes: Math.floor(Math.random() * 50) + 5,
        comments: Math.floor(Math.random() * 10)
      }));
      
      setTrendingProducts(sampleTrending);
      setRecentlyViewed(sampleRecent);
      setLoading(false);
    }, 1500);
  }, []);
  
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" component="h2">
                  Welcome back, {currentUser.name.split(' ')[0]}
                </Typography>
                <Button 
                  variant="outlined" 
                  component={Link} 
                  to="/create"
                >
                  Share a Product
                </Button>
              </Box>
              
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  border: `1px solid ${theme.palette.brand.lightGray}`,
                  borderRadius: 2,
                  bgcolor: theme.palette.brand.lightTeal,
                  mb: 4
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Complete Your Profile
                </Typography>
                <Typography variant="body2" paragraph>
                  Add your interests and bio to get personalized product recommendations.
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary"
                  component={Link}
                  to="/profile"
                >
                  Update Profile
                </Button>
              </Paper>
            </Box>
            
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h5" component="h2">
                      Trending Products
                    </Typography>
                    <Button 
                      variant="text" 
                      component={Link} 
                      to="/feed"
                    >
                      See All
                    </Button>
                  </Box>
                  
                  <Grid container spacing={3}>
                    {trendingProducts.slice(0, 4).map(product => (
                      <Grid item xs={12} sm={6} key={product.id}>
                        <ProductCard 
                          product={product} 
                          onUserClick={() => navigate(`/profile/${product.userId}`)}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
                
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h5" component="h2">
                      Recently Viewed
                    </Typography>
                    <Button variant="text">
                      See All
                    </Button>
                  </Box>
                  
                  <Grid container spacing={3}>
                    {recentlyViewed.map(product => (
                      <Grid item xs={12} sm={6} key={product.id}>
                        <ProductCard 
                          product={product} 
                          onUserClick={() => navigate(`/profile/${product.userId}`)}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </>
            )}
          </Grid>
          
          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                border: `1px solid ${theme.palette.brand.lightGray}`,
                borderRadius: 2,
                position: { md: 'sticky' },
                top: { md: 24 }
              }}
            >
              <Typography variant="h6" gutterBottom>
                People You Might Like
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress size={30} />
                </Box>
              ) : (
                <>
                  {suggestedUsers.map(user => (
                    <UserSuggestionCard key={user.id} user={user} />
                  ))}
                  
                  <Button 
                    fullWidth 
                    variant="text" 
                    sx={{ mt: 2 }}
                    component={Link}
                    to="/people"
                  >
                    See More People
                  </Button>
                </>
              )}
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h6" gutterBottom>
                Categories
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
                {['Fashion', 'Electronics', 'Home Decor', 'Beauty', 'Fitness'].map((category, index) => (
                  <Button 
                    key={index} 
                    variant="outlined" 
                    color="inherit"
                    sx={{ 
                      justifyContent: 'flex-start',
                      borderColor: theme.palette.brand.lightGray,
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        bgcolor: 'transparent'
                      }
                    }}
                    component={Link}
                    to={`/categories?category=${category.toLowerCase()}`}
                  >
                    {category}
                  </Button>
                ))}
                
                <Button 
                  variant="text" 
                  sx={{ alignSelf: 'flex-start', mt: 1 }}
                  component={Link}
                  to="/categories"
                >
                  See All Categories
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
});

export default HomePage; 