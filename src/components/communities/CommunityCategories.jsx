import React from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CommunityCategories = () => {
  const navigate = useNavigate();
  
  const categories = [
    { name: 'Parenting', count: 42 },
    { name: 'Technology', count: 78 },
    { name: 'Home & Garden', count: 56 },
    { name: 'Fashion', count: 63 },
    { name: 'Beauty', count: 49 },
    { name: 'Sports & Fitness', count: 37 },
    { name: 'Health & Wellness', count: 45 },
    { name: 'Food & Cooking', count: 52 },
    { name: 'Travel', count: 31 },
    { name: 'Pets', count: 28 },
    { name: 'Automotive', count: 23 },
    { name: 'Books & Reading', count: 19 }
  ];

  const handleCategoryClick = (category) => {
    // In a real app, this would navigate to a filtered view
    navigate(`/communities?category=${encodeURIComponent(category)}`);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
        Browse by Category
      </Typography>
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
        {categories.map(category => (
          <Chip 
            key={category.name}
            label={`${category.name} (${category.count})`}
            onClick={() => handleCategoryClick(category.name)}
            sx={{ mb: 1 }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default CommunityCategories; 