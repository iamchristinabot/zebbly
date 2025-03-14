import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Chip,
  Divider,
  CircularProgress,
  Pagination,
  useTheme,
  SelectChangeEvent
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import CategoryChips from '../components/CategoryChips';
import { Product } from '../types/product';

interface ProductFeedPageProps {
  isAuthenticated?: boolean;
}

const ProductFeedPage = ({ isAuthenticated = true }: ProductFeedPageProps) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState('recommended');
  const [priceRange, setPriceRange] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  
  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };
  
  const handlePriceRangeChange = (event: SelectChangeEvent) => {
    setPriceRange(event.target.value);
  };
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  
  useEffect(() => {
    // Simulate API call to fetch products
    setLoading(true);
    
    setTimeout(() => {
      setProducts([
        {
          id: 1,
          type: 'product',
          title: 'Wireless Noise Cancelling Headphones',
          image: 'https://via.placeholder.com/300x200',
          price: 249.99,
          store: 'Amazon',
          user: 'Sarah',
          likes: 42,
          comments: 7
        },
        {
          id: 2,
          type: 'product',
          title: 'Smart Watch Series 7',
          image: 'https://via.placeholder.com/300x200',
          price: 399.99,
          store: 'Best Buy',
          user: 'Michael',
          likes: 28,
          comments: 3
        },
        {
          id: 3,
          type: 'product',
          title: 'Organic Cotton Bedding Set',
          image: 'https://via.placeholder.com/300x200',
          price: 129.99,
          store: 'Target',
          user: 'Emma',
          likes: 56,
          comments: 12
        },
        {
          id: 4,
          type: 'product',
          title: 'Ceramic Plant Pot Set',
          image: 'https://via.placeholder.com/300x200',
          price: 34.99,
          store: 'Target',
          user: 'Jessica',
          likes: 12,
          comments: 3
        },
        {
          id: 5,
          type: 'product',
          title: 'Wireless Charging Pad',
          image: 'https://via.placeholder.com/300x200',
          price: 29.99,
          store: 'Amazon',
          user: 'David',
          likes: 8,
          comments: 1
        },
        {
          id: 6,
          type: 'product',
          title: 'Leather Crossbody Bag',
          image: 'https://via.placeholder.com/300x200',
          price: 79.99,
          store: 'Nordstrom',
          user: 'Emma',
          likes: 34,
          comments: 5
        }
      ]);
      
      setLoading(false);
    }, 1500);
  }, [sortBy, priceRange, page]); // Re-fetch when these change
  
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Discover Products
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <CategoryChips />
        </Box>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                border: `1px solid ${theme.palette.brand.lightGray}`,
                borderRadius: 2
              }}
            >
              <Typography variant="h6" gutterBottom>
                Filters
                <TuneIcon sx={{ ml: 1, verticalAlign: 'middle', fontSize: '1rem' }} />
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <TextField
                fullWidth
                placeholder="Search products"
                value={searchQuery}
                onChange={handleSearchChange}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
              
              <FormControl fullWidth margin="normal">
                <InputLabel id="sort-by-label">Sort By</InputLabel>
                <Select
                  labelId="sort-by-label"
                  id="sort-by"
                  value={sortBy}
                  label="Sort By"
                  onChange={handleSortChange}
                >
                  <MenuItem value="recommended">Recommended</MenuItem>
                  <MenuItem value="newest">Newest</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                  <MenuItem value="popular">Most Popular</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl fullWidth margin="normal">
                <InputLabel id="price-range-label">Price Range</InputLabel>
                <Select
                  labelId="price-range-label"
                  id="price-range"
                  value={priceRange}
                  label="Price Range"
                  onChange={handlePriceRangeChange}
                >
                  <MenuItem value="all">All Prices</MenuItem>
                  <MenuItem value="under-25">Under $25</MenuItem>
                  <MenuItem value="25-50">$25 to $50</MenuItem>
                  <MenuItem value="50-100">$50 to $100</MenuItem>
                  <MenuItem value="100-200">$100 to $200</MenuItem>
                  <MenuItem value="over-200">Over $200</MenuItem>
                </Select>
              </FormControl>
              
              <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
                Stores
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Chip label="Amazon" onClick={() => {}} />
                <Chip label="Target" onClick={() => {}} />
                <Chip label="Walmart" onClick={() => {}} />
                <Chip label="Best Buy" onClick={() => {}} />
                <Chip label="Nordstrom" onClick={() => {}} />
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={9}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Grid container spacing={3}>
                  {products.map(product => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                      <ProductCard product={product} onUserClick={() => {}} />
                    </Grid>
                  ))}
                </Grid>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Pagination 
                    count={10} 
                    page={page} 
                    onChange={handlePageChange} 
                    color="primary" 
                  />
                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProductFeedPage; 