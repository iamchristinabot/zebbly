import React, { useState } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Chip,
  useTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import type { Product } from '../../types';

interface ProductSearchProps {
  onProductSelect: (product: Product) => void;
  selectedProducts: Set<string>;
}

const ProductSearch = ({ onProductSelect, selectedProducts }: ProductSearchProps) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  // Mock search function - replace with actual API call
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Simulate API call with mock data
    const mockResults: Product[] = [
      {
        id: 'p1',
        name: 'Wireless Noise Cancelling Headphones',
        description: 'Premium sound quality with adaptive noise cancellation.',
        price: 249.99,
        images: ['https://picsum.photos/seed/headphones/300/200'],
        category: 'Electronics'
      },
      {
        id: 'p2',
        name: 'Smart Home Hub',
        description: 'Control all your smart devices from one central hub.',
        price: 129.99,
        images: ['https://picsum.photos/seed/smarthub/300/200'],
        category: 'Electronics'
      },
      {
        id: 'p3',
        name: 'Fitness Tracker Watch',
        description: 'Track your workouts, heart rate, and sleep patterns.',
        price: 179.99,
        images: ['https://picsum.photos/seed/fitwatch/300/200'],
        category: 'Fitness'
      }
    ];

    setSearchResults(mockResults.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    ));
  };

  return (
    <Box>
      <TextField
        fullWidth
        placeholder="Search for products to add..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Grid container spacing={3}>
        {searchResults.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)'
                }
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={product.images[0]}
                alt={product.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div" gutterBottom noWrap>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {product.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" component="div">
                    ${product.price}
                  </Typography>
                  <Chip label={product.category} size="small" />
                </Box>
                <Button
                  fullWidth
                  variant={selectedProducts.has(product.id) ? "contained" : "outlined"}
                  color={selectedProducts.has(product.id) ? "success" : "primary"}
                  onClick={() => onProductSelect(product)}
                  startIcon={selectedProducts.has(product.id) ? <CheckIcon /> : <AddIcon />}
                >
                  {selectedProducts.has(product.id) ? 'Added' : 'Add to Playlist'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductSearch; 