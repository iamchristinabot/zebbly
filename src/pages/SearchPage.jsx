import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  InputAdornment,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  CircularProgress,
  Pagination,
  useTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';

const SearchPage = ({ isAuthenticated = true }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [page, setPage] = useState(1);
  const [suggestions, setSuggestions] = useState([]);
  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    
    // Simulate auto-suggestions
    if (event.target.value) {
      setSuggestions([
        `${event.target.value} headphones`,
        `${event.target.value} wireless`,
        `${event.target.value} bluetooth`,
        `${event.target.value} earbuds`,
        `${event.target.value} noise cancelling`
      ]);
    } else {
      setSuggestions([]);
    }
  };
  
  const handleSearch = () => {
    if (!searchQuery) return;
    
    setLoading(true);
    
    // Simulate API call for search results
    setTimeout(() => {
      setSearchResults([
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
          title: 'Bluetooth Earbuds with Charging Case',
          image: 'https://via.placeholder.com/300x200',
          price: 129.99,
          store: 'Best Buy',
          user: 'Michael',
          likes: 28,
          comments: 3
        },
        {
          id: 3,
          type: 'product',
          title: 'Wireless Gaming Headset',
          image: 'https://via.placeholder.com/300x200',
          price: 179.99,
          store: 'Target',
          user: 'Emma',
          likes: 56,
          comments: 12
        },
        {
          id: 4,
          type: 'product',
          title: 'Portable Bluetooth Speaker',
          image: 'https://via.placeholder.com/300x200',
          price: 89.99,
          store: 'Amazon',
          user: 'Jessica',
          likes: 12,
          comments: 3
        }
      ]);
      
      setLoading(false);
    }, 1500);
  };
  
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };
  
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  
  const handlePriceRangeChange = (event) => {
    setPriceRange(event.target.value);
  };
  
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  
  useEffect(() => {
    if (searchQuery) {
      handleSearch();
    }
  }, [sortBy, category, priceRange, page]);
  
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Search Products
        </Typography>
        
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            mb: 4, 
            border: `1px solid ${theme.palette.brand.lightGray}`,
            borderRadius: 2
          }}
        >
          <Autocomplete
            freeSolo
            options={suggestions}
            inputValue={searchQuery}
            onInputChange={(event, newValue) => {
              setSearchQuery(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                placeholder="Search for products, brands, or categories..."
                onChange={handleSearchChange}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
            <Chip label="Headphones" onClick={() => setSearchQuery('Headphones')} />
            <Chip label="Bluetooth" onClick={() => setSearchQuery('Bluetooth')} />
            <Chip label="Wireless" onClick={() => setSearchQuery('Wireless')} />
            <Chip label="Noise Cancelling" onClick={() => setSearchQuery('Noise Cancelling')} />
            <Chip label="Earbuds" onClick={() => setSearchQuery('Earbuds')} />
          </Box>
        </Paper>
        
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
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <FormControl fullWidth margin="normal">
                <InputLabel id="sort-by-label">Sort By</InputLabel>
                <Select
                  labelId="sort-by-label"
                  id="sort-by"
                  value={sortBy}
                  label="Sort By"
                  onChange={handleSortChange}
                >
                  <MenuItem value="relevance">Relevance</MenuItem>
                  <MenuItem value="newest">Newest</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                  <MenuItem value="popular">Most Popular</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl fullWidth margin="normal">
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  value={category}
                  label="Category"
                  onChange={handleCategoryChange}
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  <MenuItem value="electronics">Electronics</MenuItem>
                  <MenuItem value="audio">Audio</MenuItem>
                  <MenuItem value="headphones">Headphones</MenuItem>
                  <MenuItem value="speakers">Speakers</MenuItem>
                  <MenuItem value="accessories">Accessories</MenuItem>
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
                  <MenuItem value="under-50">Under $50</MenuItem>
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
                <Chip label="Best Buy" onClick={() => {}} />
                <Chip label="Target" onClick={() => {}} />
                <Chip label="Walmart" onClick={() => {}} />
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={9}>
            {searchQuery ? (
              loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  <Typography variant="h6" gutterBottom>
                    {searchResults.length} results for "{searchQuery}"
                  </Typography>
                  
                  <Grid container spacing={3}>
                    {searchResults.map(product => (
                      <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <ProductCard product={product} />
                      </Grid>
                    ))}
                  </Grid>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination 
                      count={3} 
                      page={page} 
                      onChange={handlePageChange} 
                      color="primary" 
                    />
                  </Box>
                </>
              )
            ) : (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                  Enter a search term to find products
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default SearchPage; 