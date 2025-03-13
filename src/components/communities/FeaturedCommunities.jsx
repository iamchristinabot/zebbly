import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const FeaturedCommunities = () => {
  const featuredCommunities = [
    {
      id: 'featured1',
      name: 'Sustainable Living',
      description: 'Discover eco-friendly products and share sustainable living tips',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
      memberCount: 12453
    },
    {
      id: 'featured2',
      name: 'Budget Home Makeovers',
      description: 'Transform your space without breaking the bank',
      image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858',
      memberCount: 8976
    },
    {
      id: 'featured3',
      name: 'Tech Deals & Reviews',
      description: 'Find the best tech deals and honest product reviews',
      image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03',
      memberCount: 15321
    }
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" component="h2" fontWeight="bold" sx={{ mb: 3 }}>
        Featured Communities
      </Typography>
      <Grid container spacing={3}>
        {featuredCommunities.map(community => (
          <Grid item xs={12} md={4} key={community.id}>
            <Card sx={{ position: 'relative', height: 200 }}>
              <CardMedia
                component="img"
                height="200"
                image={community.image}
                alt={community.name}
                sx={{ position: 'absolute' }}
              />
              <Box sx={{ 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))',
                p: 2
              }}>
                <Typography variant="h6" component="div" sx={{ color: 'white' }}>
                  {community.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  {community.memberCount.toLocaleString()} members
                </Typography>
                <Button 
                  variant="contained" 
                  size="small" 
                  component={Link}
                  to={`/communities/${community.id}`}
                  sx={{ mt: 1 }}
                >
                  Explore
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeaturedCommunities; 