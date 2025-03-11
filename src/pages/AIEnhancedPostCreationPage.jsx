import React, { useState, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  MenuItem,
  InputAdornment,
  IconButton,
  Chip,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  useTheme
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import LinkIcon from '@mui/icons-material/Link';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import TagIcon from '@mui/icons-material/Tag';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../stores/storeContext';
import Header from '../components/Header';

// TabPanel component for the AI tabs
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`ai-tabpanel-${index}`} {...other}>
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
}

const categories = ['Fashion', 'Electronics', 'Home Decor', 'Beauty', 'Fitness', 'Kitchen', 'Books', 'Toys', 'Outdoor', 'Pets'];
const stores = ['Amazon', 'Target', 'Walmart', 'Best Buy', 'Etsy', 'eBay', 'Nordstrom', 'Sephora', 'Home Depot', 'Other'];

const AIEnhancedPostCreationPage = observer(({ isAuthenticated = true }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { aiRecommendationStore } = useContext(StoreContext);
  
  // Form state
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
  
  // AI features state
  const [aiTabValue, setAiTabValue] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [contentSuggestions, setContentSuggestions] = useState(null);
  const [productInsights, setProductInsights] = useState(null);
  const [trendingTopics, setTrendingTopics] = useState([]);
  
  useEffect(() => {
    // Load trending topics from the store
    setTrendingTopics(aiRecommendationStore.trendingTopics);
  }, [aiRecommendationStore]);
  
  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.store) newErrors.store = 'Store is required';
    if (images.length === 0) newErrors.images = 'At least one image is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit form logic would go here
    console.log('Form submitted:', formData);
    console.log('Images:', images);
    
    // Navigate to home page after successful submission
    navigate('/');
  };
  
  // AI feature handlers
  const handleAITabChange = (event, newValue) => {
    setAiTabValue(newValue);
  };
  
  const analyzeProduct = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      // Generate content suggestions based on the product
      const mockProduct = {
        title: formData.title || 'Product',
        category: formData.category || 'General'
      };
      
      setContentSuggestions(aiRecommendationStore.getContentSuggestionsForProduct(mockProduct));
      setProductInsights(aiRecommendationStore.getProductInsights('mock-id'));
      setIsAnalyzing(false);
    }, 1500);
  };
  
  const applyTitleSuggestion = (suggestion) => {
    setFormData({ ...formData, title: suggestion });
  };
  
  const applyDescriptionSuggestion = (suggestion) => {
    setFormData({ ...formData, description: suggestion });
  };
  
  const applyTagSuggestion = (tag) => {
    if (!formData.tags.includes(tag.replace('#', ''))) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag.replace('#', '')]
      });
    }
  };
  
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Share a Product
        </Typography>
        
        <Grid container spacing={4}>
          {/* Main Form */}
          <Grid item xs={12} md={8}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                border: `1px solid ${theme.palette.brand.lightGray}`,
                borderRadius: 2
              }}
            >
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      Product Details
                    </Typography>
                  </Grid>
                  
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
                      error={!!errors.description}
                      helperText={errors.description}
                      required
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
                    <TextField
                      fullWidth
                      select
                      label="Category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      error={!!errors.category}
                      helperText={errors.category}
                      required
                    >
                      {categories.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      select
                      label="Store"
                      name="store"
                      value={formData.store}
                      onChange={handleChange}
                      error={!!errors.store}
                      helperText={errors.store}
                      required
                    >
                      {stores.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
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
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      Product Images
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1 }}>
                      {images.map((image, index) => (
                        <Box 
                          key={index}
                          sx={{ 
                            position: 'relative',
                            width: 100,
                            height: 100
                          }}
                        >
                          <img 
                            src={image.preview} 
                            alt={`Preview ${index}`}
                            style={{ 
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              borderRadius: theme.shape.borderRadius
                            }}
                          />
                          <IconButton
                            size="small"
                            sx={{ 
                              position: 'absolute',
                              top: -10,
                              right: -10,
                              bgcolor: 'background.paper',
                              boxShadow: 1
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
          </Grid>
          
          {/* AI Assistant Sidebar */}
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                border: `1px solid ${theme.palette.brand.lightGray}`,
                borderRadius: 2,
                position: { md: 'sticky' },
                top: { md: 24 }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AutoAwesomeIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                <Typography variant="h6">
                  AI Content Assistant
                </Typography>
              </Box>
              
              <Typography variant="body2" paragraph>
                Let our AI help you create engaging content for your product post.
              </Typography>
              
              <Button
                variant="contained"
                color="primary"
                fullWidth
                startIcon={isAnalyzing ? <CircularProgress size={20} color="inherit" /> : <LightbulbIcon />}
                onClick={analyzeProduct}
                disabled={isAnalyzing || (!formData.title && !formData.category)}
                sx={{ mb: 3 }}
              >
                {isAnalyzing ? 'Analyzing...' : 'Generate Content Ideas'}
              </Button>
              
              {(contentSuggestions || productInsights) && (
                <>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs 
                      value={aiTabValue} 
                      onChange={handleAITabChange}
                      variant="fullWidth"
                    >
                      <Tab icon={<FormatQuoteIcon />} label="Content" />
                      <Tab icon={<LocalOfferIcon />} label="Insights" />
                      <Tab icon={<TrendingUpIcon />} label="Trends" />
                    </Tabs>
                  </Box>
                  
                  <TabPanel value={aiTabValue} index={0}>
                    {contentSuggestions && (
                      <>
                        <Accordion defaultExpanded>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">Title Suggestions</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <List dense>
                              {contentSuggestions.titleSuggestions.map((suggestion, index) => (
                                <ListItem 
                                  key={index}
                                  secondaryAction={
                                    <IconButton 
                                      edge="end" 
                                      onClick={() => applyTitleSuggestion(suggestion)}
                                      size="small"
                                    >
                                      <CheckCircleIcon fontSize="small" />
                                    </IconButton>
                                  }
                                >
                                  <ListItemText primary={suggestion} />
                                </ListItem>
                              ))}
                            </List>
                          </AccordionDetails>
                        </Accordion>
                        
                        <Accordion>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">Description Ideas</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <List dense>
                              {contentSuggestions.descriptionSuggestions.map((suggestion, index) => (
                                <ListItem 
                                  key={index}
                                  secondaryAction={
                                    <IconButton 
                                      edge="end" 
                                      onClick={() => applyDescriptionSuggestion(suggestion)}
                                      size="small"
                                    >
                                      <CheckCircleIcon fontSize="small" />
                                    </IconButton>
                                  }
                                >
                                  <ListItemText 
                                    primary={suggestion.length > 60 ? suggestion.substring(0, 60) + '...' : suggestion} 
                                    secondary={suggestion.length > 60 ? 'Click to apply' : null}
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </AccordionDetails>
                        </Accordion>
                        
                        <Accordion>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">Suggested Tags</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                              {contentSuggestions.tagSuggestions.map((tag, index) => (
                                <Chip
                                  key={index}
                                  label={tag}
                                  icon={<TagIcon />}
                                  onClick={() => applyTagSuggestion(tag)}
                                  clickable
                                  color="primary"
                                  variant="outlined"
                                />
                              ))}
                            </Box>
                          </AccordionDetails>
                        </Accordion>
                      </>
                    )}
                  </TabPanel>
                  
                  <TabPanel value={aiTabValue} index={1}>
                    {productInsights && (
                      <Typography>
                        Product insights would be displayed here, including price analysis, 
                        quality predictions, and audience match information.
                      </Typography>
                    )}
                  </TabPanel>
                  
                  <TabPanel value={aiTabValue} index={2}>
                    <Typography variant="subtitle1" gutterBottom>
                      Trending Topics
                    </Typography>
                    <List dense>
                      {trendingTopics.map((topic, index) => (
                        <ListItem key={index}>
                          <ListItemText 
                            primary={topic.topic} 
                            secondary={`Relevance: ${topic.relevance * 100}% | Growth: ${topic.growth}`} 
                          />
                        </ListItem>
                      ))}
                    </List>
                  </TabPanel>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
});

export default AIEnhancedPostCreationPage; 