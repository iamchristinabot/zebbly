import React, { useState, useContext } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Autocomplete,
  useTheme,
  InputAdornment
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import LinkIcon from '@mui/icons-material/Link';
import CloseIcon from '@mui/icons-material/Close';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../stores/storeContext';
import Header from '../components/Header';

const categories = [
  'Fashion',
  'Electronics',
  'Home Decor',
  'Beauty',
  'Fitness',
  'Kitchen',
  'Books',
  'Toys',
  'Outdoor',
  'Pets'
];

const stores = [
  'Amazon',
  'Target',
  'Walmart',
  'Best Buy',
  'Etsy',
  'eBay',
  'Nordstrom',
  'Sephora',
  'Home Depot',
  'Other'
];

const PostCreationPage = observer(({ isAuthenticated = true }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { rewardsStore } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    store: '',
    productUrl: '',
    tags: []
  });
  const [images, setImages] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 0) {
      const newImages = files.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      
      setImages([...images, ...newImages]);
    }
  };
  
  const handleRemoveImage = (index) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    setImages(newImages);
  };
  
  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, currentTag.trim()]
      });
      setCurrentTag('');
    }
  };
  
  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    } else if (isNaN(parseFloat(formData.price))) {
      newErrors.price = 'Price must be a number';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.store) {
      newErrors.store = 'Store is required';
    }
    
    if (images.length === 0) {
      newErrors.images = 'At least one image is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, this would send the data to an API
      console.log('Form submitted:', formData);
      console.log('Images:', images);
      
      // Add points for sharing a product
      rewardsStore.addPoints(25, 'Shared a product');
      
      // Check if this is the first product shared to award badge
      if (!rewardsStore.userBadges.find(b => b.id === 'first_share').earned) {
        rewardsStore.earnBadge('first_share');
      }
      
      // Navigate to the home page after submission
      navigate('/');
    }
  };
  
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            border: `1px solid ${theme.palette.brand.lightGray}`,
            borderRadius: 2
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Share a Product
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Share your favorite products with the community. Add details, images, and links to help others find and purchase them.
          </Typography>
          
          <Divider sx={{ my: 3 }} />
          
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Product Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  error={!!errors.title}
                  helperText={errors.title}
                  required
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  placeholder="What do you like about this product? Why are you recommending it?"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  error={!!errors.price}
                  helperText={errors.price}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category"
                    value={formData.category}
                    label="Category"
                    onChange={handleChange}
                    error={!!errors.category}
                  >
                    {categories.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="store-label">Store</InputLabel>
                  <Select
                    labelId="store-label"
                    id="store"
                    value={formData.store}
                    label="Store"
                    onChange={handleChange}
                    error={!!errors.store}
                  >
                    {stores.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Product URL"
                  name="productUrl"
                  value={formData.productUrl}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LinkIcon />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="https://"
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Product Images
                </Typography>
                
                <Box 
                  sx={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: 2,
                    mb: 2
                  }}
                >
                  {images.map((image, index) => (
                    <Box 
                      key={index}
                      sx={{ 
                        position: 'relative',
                        width: 100,
                        height: 100,
                        borderRadius: 1,
                        overflow: 'hidden'
                      }}
                    >
                      <img 
                        src={image.preview} 
                        alt={`Preview ${index}`} 
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover' 
                        }}
                      />
                      <IconButton
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 4,
                          right: 4,
                          bgcolor: 'rgba(0, 0, 0, 0.5)',
                          color: 'white',
                          '&:hover': {
                            bgcolor: 'rgba(0, 0, 0, 0.7)',
                          },
                          p: 0.5
                        }}
                        onClick={() => handleRemoveImage(index)}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                  
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<AddPhotoAlternateIcon />}
                    sx={{ 
                      width: 100,
                      height: 100,
                      display: 'flex',
                      flexDirection: 'column',
                      borderStyle: 'dashed'
                    }}
                  >
                    Add Image
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                    />
                  </Button>
                </Box>
                
                {errors.images && (
                  <Typography variant="caption" color="error">
                    {errors.images}
                  </Typography>
                )}
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Tags
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TextField
                    fullWidth
                    placeholder="Add tags (e.g., summer, gift idea)"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={handleKeyDown}
                    sx={{ mr: 1 }}
                  />
                  <Button 
                    variant="outlined" 
                    onClick={handleAddTag}
                    disabled={!currentTag.trim()}
                  >
                    Add
                  </Button>
                </Box>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {formData.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      onDelete={() => handleRemoveTag(tag)}
                    />
                  ))}
                </Box>
              </Grid>
              
              <Grid item xs={12}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    p: 2, 
                    bgcolor: theme.palette.brand.lightTeal,
                    borderRadius: 2,
                    mb: 3
                  }}
                >
                  <EmojiEventsIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="body2">
                    Earn <strong>25 points</strong> by sharing this product!
                  </Typography>
                </Box>
                
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                >
                  Share Product
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
});

export default PostCreationPage; 