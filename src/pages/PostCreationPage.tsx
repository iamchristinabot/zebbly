import React, { useState } from 'react';
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
  useTheme
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import Header from '../components/header/Header';

const PostCreationPage = ({ isAuthenticated = true }) => {
  const theme = useTheme();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [store, setStore] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [inputTag, setInputTag] = useState('');
  
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  
  const handleStoreChange = (event) => {
    setStore(event.target.value);
  };
  
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  
  const handleAddTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setInputTag('');
  };
  
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRemoveImage = () => {
    setImagePreview(null);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // In a real app, this would send the data to your backend
    console.log({
      title,
      description,
      price,
      store,
      category,
      tags,
      image: imagePreview
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setPrice('');
    setStore('');
    setCategory('');
    setTags([]);
    setImagePreview(null);
    
    // Show success message or redirect
    alert('Post created successfully!');
  };
  
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create a Post
        </Typography>
        
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            border: `1px solid ${theme.palette.brand.lightGray}`,
            borderRadius: 2
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box 
                  sx={{ 
                    border: `2px dashed ${theme.palette.brand.lightGray}`,
                    borderRadius: 2,
                    p: 3,
                    textAlign: 'center',
                    mb: 2,
                    position: 'relative'
                  }}
                >
                  {imagePreview ? (
                    <>
                      <Box 
                        component="img"
                        src={imagePreview}
                        alt="Product preview"
                        sx={{ 
                          maxWidth: '100%',
                          maxHeight: '300px',
                          objectFit: 'contain'
                        }}
                      />
                      <IconButton 
                        sx={{ 
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          bgcolor: 'rgba(255, 255, 255, 0.8)'
                        }}
                        onClick={handleRemoveImage}
                      >
                        <CloseIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <input
                        accept="image/*"
                        id="upload-product-image"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleImageUpload}
                      />
                      <label htmlFor="upload-product-image">
                        <Button
                          variant="outlined"
                          component="span"
                          startIcon={<AddPhotoAlternateIcon />}
                        >
                          Upload Product Image
                        </Button>
                      </label>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Drag and drop an image or click to browse
                      </Typography>
                    </>
                  )}
                </Box>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Product Title"
                  value={title}
                  onChange={handleTitleChange}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={4}
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  InputProps={{
                    startAdornment: <Box component="span" sx={{ mr: 1 }}>$</Box>,
                  }}
                  value={price}
                  onChange={handlePriceChange}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="store-label">Store</InputLabel>
                  <Select
                    labelId="store-label"
                    id="store"
                    value={store}
                    label="Store"
                    onChange={handleStoreChange}
                  >
                    <MenuItem value="amazon">Amazon</MenuItem>
                    <MenuItem value="target">Target</MenuItem>
                    <MenuItem value="walmart">Walmart</MenuItem>
                    <MenuItem value="bestbuy">Best Buy</MenuItem>
                    <MenuItem value="nordstrom">Nordstrom</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category"
                    value={category}
                    label="Category"
                    onChange={handleCategoryChange}
                  >
                    <MenuItem value="electronics">Electronics</MenuItem>
                    <MenuItem value="home">Home & Furniture</MenuItem>
                    <MenuItem value="fashion">Fashion</MenuItem>
                    <MenuItem value="sports">Sports & Fitness</MenuItem>
                    <MenuItem value="beauty">Beauty & Personal Care</MenuItem>
                    <MenuItem value="kids">Baby & Kids</MenuItem>
                    <MenuItem value="food">Food & Drink</MenuItem>
                    <MenuItem value="accessories">Accessories</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  freeSolo
                  options={[]}
                  value={tags}
                  inputValue={inputTag}
                  onInputChange={(event, newValue) => {
                    setInputTag(newValue);
                  }}
                  onChange={(event, newValue) => {
                    setTags(newValue);
                  }}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        label={option}
                        {...getTagProps({ index })}
                        onDelete={() => handleRemoveTag(option)}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tags"
                      placeholder="Add tags"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag(inputTag);
                        }
                      }}
                    />
                  )}
                />
                <Typography variant="caption" color="text.secondary">
                  Press Enter to add a tag
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button variant="outlined">
                    Save as Draft
                  </Button>
                  <Box>
                    <Button 
                      variant="outlined" 
                      sx={{ mr: 2 }}
                      onClick={() => {
                        // Preview functionality would go here
                        alert('Preview functionality would open in a modal or new tab');
                      }}
                    >
                      Preview
                    </Button>
                    <Button 
                      type="submit" 
                      variant="contained" 
                      color="primary"
                    >
                      Publish
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default PostCreationPage; 