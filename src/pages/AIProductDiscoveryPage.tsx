import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TuneIcon from '@mui/icons-material/Tune';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  Chip,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Slider,
  TextField,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import { useStores } from '../hooks/useStores';
import { AuthenticatedProps } from '../types/common';

export interface AIProductDiscoveryPageProps extends AuthenticatedProps {}

// Add interfaces at the top after imports
interface Recommendation {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  matchScore: number;
  reasons: string[];
}

const AIProductDiscoveryPage = observer(({ isAuthenticated = true }: AIProductDiscoveryPageProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { userStore, aiRecommendationStore } = useStores();
  
  // State for recommendations and UI
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // AI personalization state
  const [personalizationLevel, setPersonalizationLevel] = useState(75);
  const [discoveryMode, setDiscoveryMode] = useState('balanced');
  
  // Load recommendations on component mount
  useEffect(() => {
    // Simulate API call to get AI recommendations
    setLoading(true);
    setTimeout(() => {
      const recommendations = aiRecommendationStore.sortedRecommendations as unknown as Recommendation[];
      setRecommendations(recommendations);
      setLoading(false);
    }, 1500);
  }, [aiRecommendationStore]);
  
  // Handle filter changes
  const handlePriceRangeChange = (_event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as [number, number]);
  };
  
  const handleCategoryToggle = (category: string) => {
    const currentIndex = selectedCategories.findIndex(c => c === category);
    const newSelectedCategories = [...selectedCategories];
    
    if (currentIndex === -1) {
      newSelectedCategories.push(category);
    } else {
      newSelectedCategories.splice(currentIndex, 1);
    }
    
    setSelectedCategories(newSelectedCategories);
  };
  
  const handlePersonalizationChange = (_event: Event, newValue: number | number[]) => {
    setPersonalizationLevel(newValue as number);
  };
  
  const handleDiscoveryModeChange = (mode: string) => {
    setDiscoveryMode(mode);
  };
  
  const handleRefreshRecommendations = () => {
    setLoading(true);
    // In a real app, this would call an API with the new parameters
    setTimeout(() => {
      // Simulate getting new recommendations
      const newRecommendations = [...aiRecommendationStore.sortedRecommendations];
      // Shuffle the array to simulate new recommendations
      for (let i = newRecommendations.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newRecommendations[i], newRecommendations[j]] = [newRecommendations[j], newRecommendations[i]];
      }
      setRecommendations(newRecommendations as any); // Type assertion added
      setLoading(false);
    }, 1500);
  };
  // Filter recommendations based on user selections
  const filteredRecommendations = recommendations.filter((rec: any) => {
    const matchesSearch = searchQuery === '' || 
      rec.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = rec.price >= priceRange[0] && rec.price <= priceRange[1];
    const matchesCategory = selectedCategories.length === 0 || 
      (rec.category && selectedCategories.includes(rec.category));
    
    return matchesSearch && matchesPrice && matchesCategory;
  });
  
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            AI-Powered Product Discovery
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Discover products tailored to your preferences and interests, powered by our AI recommendation engine.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {/* Sidebar with filters */}
          <Grid item xs={12} md={3}>
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
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Filters</Typography>
                <IconButton size="small" onClick={() => setShowFilters(!showFilters)}>
                  <TuneIcon />
                </IconButton>
              </Box>
              
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ display: showFilters ? 'block' : { xs: 'none', md: 'block' } }}>
                <Typography variant="subtitle2" gutterBottom>
                  Price Range
                </Typography>
                <Box sx={{ px: 1, mb: 3 }}>
                  <Slider
                    value={priceRange}
                    onChange={handlePriceRangeChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={1000}
                    step={10}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      ${priceRange[0]}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${priceRange[1]}
                    </Typography>
                  </Box>
                </Box>
                
                <Typography variant="subtitle2" gutterBottom>
                  Categories
                </Typography>
                <FormControl component="fieldset" sx={{ mb: 3 }}>
                  <FormGroup>
                    {['Tech', 'Home Decor', 'Fashion', 'Fitness', 'Beauty'].map((category) => (
                      <FormControlLabel
                        key={category}
                        control={
                          <Checkbox 
                            checked={selectedCategories.includes(category)} 
                            onChange={() => handleCategoryToggle(category)}
                            size="small"
                          />
                        }
                        label={category}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
                
                <Divider sx={{ mb: 2 }} />
                
                <Typography variant="subtitle2" gutterBottom>
                  AI Personalization
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" gutterBottom>
                    Personalization Level: {personalizationLevel}%
                  </Typography>
                  <Slider
                    value={personalizationLevel}
                    onChange={handlePersonalizationChange}
                    aria-labelledby="personalization-slider"
                    valueLabelDisplay="auto"
                    min={0}
                    max={100}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Higher values prioritize your preferences, lower values increase discovery of new items.
                  </Typography>
                </Box>
                
                <Typography variant="subtitle2" gutterBottom>
                  Discovery Mode
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                  {['balanced', 'trending', 'similar', 'diverse'].map((mode) => (
                    <Chip
                      key={mode}
                      label={mode.charAt(0).toUpperCase() + mode.slice(1)}
                      onClick={() => handleDiscoveryModeChange(mode)}
                      color={discoveryMode === mode ? 'primary' : 'default'}
                      variant={discoveryMode === mode ? 'filled' : 'outlined'}
                    />
                  ))}
                </Box>
                
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AutoAwesomeIcon />}
                  onClick={handleRefreshRecommendations}
                  disabled={loading}
                >
                  {loading ? 'Refreshing...' : 'Refresh Recommendations'}
                </Button>
              </Box>
            </Paper>
          </Grid>
          
          {/* Main content with recommendations */}
          <Grid item xs={12} md={9}>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                placeholder="Search recommendations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
            </Box>
            
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                {filteredRecommendations.length > 0 ? (
                  <Grid container spacing={3}>
                    {filteredRecommendations.map((recommendation) => (
                      <Grid item xs={12} sm={6} md={4} key={recommendation.id}>
                        <ProductRecommendationCard recommendation={recommendation} />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      No recommendations match your filters
                    </Typography>
                    <Button 
                      variant="outlined" 
                      onClick={() => {
                        setSearchQuery('');
                        setPriceRange([0, 500]);
                        setSelectedCategories([]);
                      }}
                    >
                      Clear Filters
                    </Button>
                  </Box>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
});

// Product recommendation card component
const ProductRecommendationCard = ({ recommendation }: { recommendation: Recommendation }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
  };
  
  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved(!saved);
  };
  
  return (
    <Card 
      elevation={0} 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: `1px solid ${theme.palette.brand.lightGray}`,
        borderRadius: 2,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          cursor: 'pointer'
        }
      }}
      onClick={() => navigate(`/product/${recommendation.id}`)}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={recommendation.image}
          alt={recommendation.title}
        />
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 8, 
            right: 8, 
            bgcolor: 'rgba(0,0,0,0.6)', 
            color: 'white',
            borderRadius: 1,
            px: 1,
            py: 0.5
          }}
        >
          <Typography variant="body2" fontWeight="bold">
            {Math.round(recommendation.matchScore * 100)}% Match
          </Typography>
        </Box>
      </Box>
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="div" gutterBottom>
          {recommendation.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" paragraph>
          {recommendation.description}
        </Typography>
        
        <Typography variant="h6" color="primary" gutterBottom>
          ${recommendation.price.toFixed(2)}
        </Typography>
        
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Why we recommend this:
          </Typography>
          <Box component="ul" sx={{ pl: 2, mt: 0 }}>
            {recommendation.reasons.map((reason: string, index: number) => (
              <Typography component="li" variant="body2" key={index} sx={{ mb: 0.5 }}>
                {reason}
              </Typography>
            ))}
          </Box>
        </Box>
      </CardContent>
      
      <CardActions sx={{ borderTop: `1px solid ${theme.palette.brand.lightGray}`, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Box>
            <Tooltip title={liked ? "Unlike" : "Like"}>
              <IconButton onClick={handleLike} color={liked ? "primary" : "default"} size="small">
                {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title={saved ? "Unsave" : "Save"}>
              <IconButton onClick={handleSave} color={saved ? "primary" : "default"} size="small">
                {saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              </IconButton>
            </Tooltip>
          </Box>
          <Button 
            variant="contained" 
            size="small" 
            startIcon={<ShoppingCartIcon />}
            onClick={(e) => {
              e.stopPropagation();
              window.open('#', '_blank');
            }}
          >
            View
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default AIProductDiscoveryPage; 