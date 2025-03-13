import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Stack,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ProductCard from '../ProductCard';

const CommunityProductRecommendations = ({ communityId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Fetch products data
    setLoading(true);
    // This would be an API call in a real app
    setTimeout(() => {
      // Mock products data
      const mockProducts = [
        {
          id: 'p1',
          title: 'Graco 4Ever DLX 4-in-1 Car Seat',
          description: 'The Graco 4Ever DLX 4-in-1 Car Seat gives you 10 years of use with one car seat.',
          price: 299.99,
          rating: 4.8,
          reviewCount: 1245,
          images: ['https://images.unsplash.com/photo-1591088398332-8a7791972843'],
          category: 'Baby Gear',
          user: {
            id: 'u1',
            name: 'Sarah Johnson',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
          }
        },
        {
          id: 'p2',
          title: 'Hatch Rest Sound Machine & Night Light',
          description: 'Sound machine, night light, and time-to-rise alert in one easy-to-use device.',
          price: 69.99,
          rating: 4.7,
          reviewCount: 987,
          images: ['https://images.unsplash.com/photo-1555252333-9f8e92e65df9'],
          category: 'Baby Sleep',
          user: {
            id: 'u3',
            name: 'Emily Rodriguez',
            avatar: 'https://randomuser.me/api/portraits/women/67.jpg'
          }
        },
        {
          id: 'p3',
          title: 'Nanit Pro Smart Baby Monitor',
          description: 'Complete monitoring system that tracks sleep, breathing motion, and allows you to see and hear your baby.',
          price: 299.99,
          rating: 4.5,
          reviewCount: 756,
          images: ['https://images.unsplash.com/photo-1556009340-8d3e16f77a2d'],
          category: 'Baby Monitors',
          user: {
            id: 'u2',
            name: 'Michael Chen',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
          }
        },
        {
          id: 'p4',
          title: 'Ergobaby Omni 360 Baby Carrier',
          description: 'All-in-one, newborn ready baby carrier with lumbar support for parents.',
          price: 179.99,
          rating: 4.6,
          reviewCount: 823,
          images: ['https://images.unsplash.com/photo-1561339429-d5da4e6e9105'],
          category: 'Baby Gear',
          user: {
            id: 'u4',
            name: 'David Kim',
            avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
          }
        },
        {
          id: 'p5',
          title: 'Philips Avent Natural Baby Bottle',
          description: 'Natural latch on due to the wide breast-shaped nipple, making it easy to combine with breastfeeding.',
          price: 29.99,
          rating: 4.4,
          reviewCount: 1102,
          images: ['https://images.unsplash.com/photo-1546015720-b8b30df5aa27'],
          category: 'Feeding',
          user: {
            id: 'u5',
            name: 'Jessica Taylor',
            avatar: 'https://randomuser.me/api/portraits/women/22.jpg'
          }
        }
      ];
      
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, [communityId]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const categories = ['All', ...new Set(products.map(product => product.category))];

  const filteredProducts = products.filter(product => 
    (selectedCategory === 'All' || product.category === selectedCategory) &&
    (product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     product.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Box>
      <TextField
        fullWidth
        placeholder="Search products..."
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      
      <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
        {categories.map(category => (
          <Chip 
            key={category}
            label={category}
            onClick={() => handleCategoryChange(category)}
            color={selectedCategory === category ? 'primary' : 'default'}
            variant={selectedCategory === category ? 'filled' : 'outlined'}
            sx={{ mb: 1 }}
          />
        ))}
      </Stack>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant="h6" component="h3" gutterBottom>
            Community Recommended Products
          </Typography>
          
          {filteredProducts.length === 0 ? (
            <Typography variant="body1" sx={{ py: 4, textAlign: 'center' }}>
              No products found matching your criteria.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {filteredProducts.map(product => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </Box>
  );
};

export default CommunityProductRecommendations; 