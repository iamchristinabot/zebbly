import React from 'react';
import { Box, Chip, useTheme } from '@mui/material';
import LaptopIcon from '@mui/icons-material/Laptop';
import ChairIcon from '@mui/icons-material/Chair';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import SpaIcon from '@mui/icons-material/Spa';
import LocalMallIcon from '@mui/icons-material/LocalMall';

const categories = [
  { name: 'Electronics', icon: <LaptopIcon fontSize="small" /> },
  { name: 'Home', icon: <ChairIcon fontSize="small" /> },
  { name: 'Fashion', icon: <CheckroomIcon fontSize="small" /> },
  { name: 'Fitness', icon: <FitnessCenterIcon fontSize="small" /> },
  { name: 'Food', icon: <RestaurantIcon fontSize="small" /> },
  { name: 'Kids', icon: <ChildCareIcon fontSize="small" /> },
  { name: 'Beauty', icon: <SpaIcon fontSize="small" /> },
  { name: 'Accessories', icon: <LocalMallIcon fontSize="small" /> }
];

const CategoryChips = () => {
  const theme = useTheme();
  
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
      {categories.map((category, index) => (
        <Chip
          key={index}
          icon={category.icon}
          label={category.name}
          clickable
          sx={{
            bgcolor: theme.palette.common.white,
            '&:hover': {
              bgcolor: theme.palette.brand.lightTeal,
            },
            px: 1
          }}
        />
      ))}
    </Box>
  );
};

export default CategoryChips; 