import React, { useState, useRef, useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Avatar,
  Chip,
  IconButton,
  CircularProgress,
  Divider,
  Tooltip,
  useTheme
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../stores/storeContext';
import Header from '../components/Header';

// Message types
const MESSAGE_TYPE = {
  USER: 'user',
  AI: 'ai',
  RECOMMENDATIONS: 'recommendations'
};

const ShoppingAssistantPage = observer(({ isAuthenticated = true }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { userStore, aiRecommendationStore } = useContext(StoreContext);
  const messagesEndRef = useRef(null);
  
  // Chat state
  const [messages, setMessages] = useState([
    {
      type: MESSAGE_TYPE.AI,
      content: "Hi there! I'm your AI shopping assistant. Tell me what you're looking for, and I'll help you find the perfect products. You can describe the item, your preferences, or even your needs, and I'll suggest products that match.",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Scroll to bottom of chat when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message to chat
    const userMessage = {
      type: MESSAGE_TYPE.USER,
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI thinking
    setTimeout(() => {
      processUserMessage(userMessage.content);
    }, 1000);
  };
  
  const processUserMessage = (userInput) => {
    // Analyze user input to determine intent
    const userInputLower = userInput.toLowerCase();
    
    // Check if user is looking for specific product categories
    const categories = ['tech', 'electronics', 'fashion', 'clothing', 'home', 'decor', 'fitness', 'beauty'];
    const mentionedCategories = categories.filter(category => userInputLower.includes(category));
    
    // Check for price mentions
    const priceRegex = /(\$\d+|\d+ dollars|\d+\$|\d+ bucks)/g;
    const priceMentions = userInputLower.match(priceRegex);
    
    // Check for style/preference mentions
    const styles = ['modern', 'vintage', 'minimalist', 'luxury', 'casual', 'formal', 'sporty'];
    const mentionedStyles = styles.filter(style => userInputLower.includes(style));
    
    // Generate AI response
    let aiResponse = "";
    
    if (mentionedCategories.length > 0) {
      aiResponse = `I found some great ${mentionedCategories.join(', ')} products that might interest you.`;
      if (mentionedStyles.length > 0) {
        aiResponse += ` I've focused on ${mentionedStyles.join(', ')} styles as you mentioned.`;
      }
      if (priceMentions) {
        aiResponse += ` I've considered your budget preferences as well.`;
      }
    } else if (userInputLower.includes('recommend') || userInputLower.includes('suggest')) {
      aiResponse = "Based on your request, here are some personalized recommendations I think you'll love:";
    } else {
      aiResponse = "I found some products that match what you're looking for:";
    }
    
    // Add AI response to chat
    setMessages(prevMessages => [
      ...prevMessages, 
      {
        type: MESSAGE_TYPE.AI,
        content: aiResponse,
        timestamp: new Date()
      }
    ]);
    
    // Add product recommendations
    setTimeout(() => {
      // Get recommendations from store (in a real app, this would be filtered based on user input)
      const recommendations = aiRecommendationStore.personalizedRecommendations.slice(0, 3);
      
      setMessages(prevMessages => [
        ...prevMessages,
        {
          type: MESSAGE_TYPE.RECOMMENDATIONS,
          content: recommendations,
          timestamp: new Date()
        }
      ]);
      
      setIsTyping(false);
    }, 1000);
  };
  
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            <AutoAwesomeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            AI Shopping Assistant
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Chat with our AI to discover products tailored to your needs and preferences.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {/* Chat interface */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                border: `1px solid ${theme.palette.brand.lightGray}`,
                borderRadius: 2,
                height: 'calc(100vh - 240px)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Chat messages */}
              <Box 
                sx={{ 
                  flexGrow: 1, 
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  mb: 2
                }}
              >
                {messages.map((message, index) => (
                  <React.Fragment key={index}>
                    {message.type === MESSAGE_TYPE.USER && (
                      <Box 
                        sx={{ 
                          alignSelf: 'flex-end',
                          display: 'flex',
                          alignItems: 'flex-start',
                          maxWidth: '80%'
                        }}
                      >
                        <Box 
                          sx={{ 
                            bgcolor: theme.palette.primary.main,
                            color: 'white',
                            p: 2,
                            borderRadius: 2,
                            borderBottomRightRadius: 0,
                            mr: 1
                          }}
                        >
                          <Typography variant="body1">{message.content}</Typography>
                        </Box>
                        <Avatar sx={{ bgcolor: theme.palette.primary.dark }}>
                          <PersonIcon />
                        </Avatar>
                      </Box>
                    )}
                    
                    {message.type === MESSAGE_TYPE.AI && (
                      <Box 
                        sx={{ 
                          alignSelf: 'flex-start',
                          display: 'flex',
                          alignItems: 'flex-start',
                          maxWidth: '80%'
                        }}
                      >
                        <Avatar sx={{ bgcolor: theme.palette.secondary.main, mr: 1 }}>
                          <SmartToyIcon />
                        </Avatar>
                        <Box 
                          sx={{ 
                            bgcolor: theme.palette.brand.lightTeal,
                            p: 2,
                            borderRadius: 2,
                            borderBottomLeftRadius: 0
                          }}
                        >
                          <Typography variant="body1">{message.content}</Typography>
                        </Box>
                      </Box>
                    )}
                    
                    {message.type === MESSAGE_TYPE.RECOMMENDATIONS && (
                      <Box 
                        sx={{ 
                          alignSelf: 'flex-start',
                          ml: 5,
                          width: 'calc(100% - 40px)'
                        }}
                      >
                        <Grid container spacing={2}>
                          {message.content.map((recommendation, recIndex) => (
                            <Grid item xs={12} sm={6} md={4} key={recIndex}>
                              <ProductCard recommendation={recommendation} />
                            </Grid>
                          ))}
                        </Grid>
                        
                        <Button 
                          variant="outlined" 
                          color="primary"
                          sx={{ mt: 2 }}
                          onClick={() => navigate('/ai-discover')}
                        >
                          See More Recommendations
                        </Button>
                      </Box>
                    )}
                  </React.Fragment>
                ))}
                
                {isTyping && (
                  <Box 
                    sx={{ 
                      alignSelf: 'flex-start',
                      display: 'flex',
                      alignItems: 'flex-start',
                      maxWidth: '80%'
                    }}
                  >
                    <Avatar sx={{ bgcolor: theme.palette.secondary.main, mr: 1 }}>
                      <SmartToyIcon />
                    </Avatar>
                    <Box 
                      sx={{ 
                        bgcolor: theme.palette.brand.lightTeal,
                        p: 2,
                        borderRadius: 2,
                        borderBottomLeftRadius: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}
                    >
                      <CircularProgress size={16} />
                      <Typography variant="body2">Thinking...</Typography>
                    </Box>
                  </Box>
                )}
                
                <div ref={messagesEndRef} />
              </Box>
              
              {/* Chat input */}
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  placeholder="Ask me about products you're looking for..."
                  variant="outlined"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  multiline
                  maxRows={3}
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2
                    }
                  }}
                />
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={handleSendMessage}
                  disabled={inputValue.trim() === '' || isTyping}
                  sx={{ borderRadius: 2 }}
                >
                  <SendIcon />
                </Button>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            {/* Shopping preferences */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                border: `1px solid ${theme.palette.brand.lightGray}`,
                borderRadius: 2,
                mb: 3
              }}
            >
              <Typography variant="h6" gutterBottom>
                Your Shopping Preferences
              </Typography>
              
              <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                Favorite Categories
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {aiRecommendationStore.userPreferences.interests.map((interest, index) => (
                  <Chip key={index} label={interest} size="small" />
                ))}
              </Box>
              
              <Typography variant="subtitle2" gutterBottom>
                Style Preferences
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {aiRecommendationStore.userPreferences.styles.map((style, index) => (
                  <Chip key={index} label={style} size="small" />
                ))}
              </Box>
              
              <Typography variant="subtitle2" gutterBottom>
                Favorite Brands
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {aiRecommendationStore.userPreferences.brands.slice(0, 3).map((brand, index) => (
                  <Chip key={index} label={brand} size="small" />
                ))}
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Button 
                variant="text" 
                color="primary"
                fullWidth
                component={Link}
                to="/settings"
              >
                Edit Preferences
              </Button>
            </Paper>
            
            {/* Suggested prompts */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                border: `1px solid ${theme.palette.brand.lightGray}`,
                borderRadius: 2
              }}
            >
              <Typography variant="h6" gutterBottom>
                Try asking about:
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {[
                  "I need a new laptop for work under $1000",
                  "Show me minimalist home decor items",
                  "I'm looking for workout clothes for summer",
                  "What are the trending tech gadgets right now?",
                  "I need a gift for my mom who loves cooking"
                ].map((prompt, index) => (
                  <Button 
                    key={index}
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => {
                      setInputValue(prompt);
                    }}
                    sx={{ 
                      justifyContent: 'flex-start',
                      textTransform: 'none',
                      borderRadius: 2
                    }}
                  >
                    {prompt}
                  </Button>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
});

// Product card component
const ProductCard = ({ recommendation }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const handleLike = (e) => {
    e.stopPropagation();
    setLiked(!liked);
  };
  
  const handleSave = (e) => {
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
          height="140"
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
      
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="subtitle1" component="div" gutterBottom noWrap>
          {recommendation.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {recommendation.description.length > 60 
            ? recommendation.description.substring(0, 60) + '...' 
            : recommendation.description}
        </Typography>
        
        <Typography variant="h6" color="primary">
          ${recommendation.price.toFixed(2)}
        </Typography>
      </CardContent>
      
      <CardActions sx={{ borderTop: `1px solid ${theme.palette.brand.lightGray}`, p: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Box>
            <Tooltip title={liked ? "Unlike" : "Like"}>
              <IconButton onClick={handleLike} color={liked ? "primary" : "default"} size="small">
                {liked ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
              </IconButton>
            </Tooltip>
            <Tooltip title={saved ? "Unsave" : "Save"}>
              <IconButton onClick={handleSave} color={saved ? "primary" : "default"} size="small">
                {saved ? <BookmarkIcon fontSize="small" /> : <BookmarkBorderIcon fontSize="small" />}
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

export default ShoppingAssistantPage; 