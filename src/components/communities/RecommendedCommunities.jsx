import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import CommunityCard from './CommunityCard';

const RecommendedCommunities = () => {
  const recommendedCommunities = [
    {
      id: 'rec1',
      name: 'Minimalist Living',
      description: 'Simplify your life with minimalist products and lifestyle tips.',
      memberCount: 3245,
      postCount: 1876,
      category: 'Lifestyle',
      tags: ['Minimalism', 'Simple Living', 'Organization'],
      image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85',
      isJoined: false
    },
    {
      id: 'rec2',
      name: 'Smart Home Enthusiasts',
      description: 'Discuss smart home products, automation, and connected living.',
      memberCount: 6721,
      postCount: 4532,
      category: 'Technology',
      tags: ['Smart Home', 'IoT', 'Automation'],
      image: 'https://images.unsplash.com/photo-1558002038-1055e2dae2d7',
      isJoined: false
    },
    {
      id: 'rec3',
      name: 'Outdoor Gear Reviews',
      description: 'Reviews and discussions about the best outdoor and camping gear.',
      memberCount: 4532,
      postCount: 2987,
      category: 'Outdoors',
      tags: ['Camping', 'Hiking', 'Gear'],
      image: 'https://images.unsplash.com/photo-1414016642750-7fdd78dc33d9',
      isJoined: false
    }
  ];

  return (
    <Box>
      <Typography variant="h6" component="h3" sx={{ mb: 3 }}>
        Recommended Based on Your Interests
      </Typography>
      <Grid container spacing={3}>
        {recommendedCommunities.map(community => (
          <Grid item xs={12} sm={6} md={4} key={community.id}>
            <CommunityCard community={community} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RecommendedCommunities; 