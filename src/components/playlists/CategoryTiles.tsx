import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  alpha,
  useTheme
} from '@mui/material';
import { PlaylistCategory } from '../../config/categories';

interface CategoryTilesProps {
  categories: PlaylistCategory[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string) => void;
}

const CategoryTiles: React.FC<CategoryTilesProps> = ({
  categories,
  selectedCategory,
  onCategorySelect
}) => {
  const theme = useTheme();

  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      {categories.map((category) => (
        <Grid item xs={6} sm={4} md={3} key={category.id}>
          <Paper
            onClick={() => onCategorySelect(category.id)}
            sx={{
              p: 2,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              height: '100%',
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              backgroundColor: selectedCategory === category.id 
                ? alpha(category.color, 0.1)
                : 'background.paper',
              borderColor: selectedCategory === category.id 
                ? category.color 
                : theme.palette.divider,
              borderWidth: 1,
              borderStyle: 'solid',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: theme.shadows[4],
                borderColor: category.color,
              }
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: alpha(category.color, 0.1),
                color: category.color,
                mb: 1
              }}
            >
              <category.icon />
            </Box>
            <Typography
              variant="subtitle1"
              component="h3"
              gutterBottom
              sx={{
                fontWeight: selectedCategory === category.id ? 600 : 400,
                color: selectedCategory === category.id ? category.color : 'text.primary'
              }}
            >
              {category.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                flex: 1
              }}
            >
              {category.description}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoryTiles; 