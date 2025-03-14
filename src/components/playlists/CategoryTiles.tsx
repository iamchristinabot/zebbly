import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  alpha,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    onCategorySelect(categoryId);
    navigate(`/categories/${categoryId}`);
  };

  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      {categories.map((category) => (
        <Grid item xs={6} sm={4} md={3} key={category.id}>
          <Paper
            onClick={() => handleCategoryClick(category.id)}
            sx={{
              p: 2.5,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              height: '100%',
              transition: 'all 0.2s ease-in-out',
              backgroundColor: selectedCategory === category.id 
                ? alpha(category.color, 0.12)
                : 'background.paper',
              borderRadius: 2,
              border: 1,
              borderColor: selectedCategory === category.id 
                ? category.color 
                : theme.palette.divider,
              '&:hover': {
                backgroundColor: alpha(category.color, 0.08),
                transform: 'translateY(-2px)',
                boxShadow: `0 4px 12px ${alpha(category.color, 0.12)}`,
                borderColor: alpha(category.color, 0.4),
                '& .category-icon': {
                  transform: 'scale(1.1)',
                  color: category.color,
                }
              }
            }}
          >
            <Box
              className="category-icon"
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: alpha(category.color, 0.12),
                color: alpha(category.color, 0.8),
                transition: 'all 0.2s ease-in-out',
                '& > svg': {
                  fontSize: 24
                }
              }}
            >
              <category.icon />
            </Box>

            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 500,
                color: 'text.primary',
                flex: 1,
              }}
            >
              {category.name}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoryTiles; 