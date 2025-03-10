import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Chip,
  Avatar,
  useTheme
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';

const ProductCard = ({ product, onUserClick }) => {
  const theme = useTheme();
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
  
  const handleUserClick = (e) => {
    e.stopPropagation();
    if (onUserClick) {
      onUserClick();
    }
  };
  
  const handleShare = () => {
    // In a real app, this would open a share dialog
    alert(`Sharing ${product.title}`);
  };
  
  const handleComment = () => {
    // In a real app, this would open a comment dialog or navigate to comments
    alert(`Commenting on ${product.title}`);
  };
  
  return (
    <Card 
      elevation={0} 
      sx={{ 
        border: `1px solid ${theme.palette.brand.lightGray}`,
        borderRadius: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[2]
        }
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.title}
        sx={{ objectFit: 'cover' }}
      />
      
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Avatar 
            src={`https://randomuser.me/api/portraits/${product.userId % 2 === 0 ? 'men' : 'women'}/${product.userId}.jpg`} 
            alt={product.user}
            sx={{ width: 24, height: 24, mr: 1, cursor: 'pointer' }}
            onClick={handleUserClick}
          />
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ cursor: 'pointer' }}
            onClick={handleUserClick}
          >
            {product.user}
          </Typography>
        </Box>
        
        <Typography variant="subtitle1" component="div" gutterBottom>
          {product.title}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6" component="div">
            ${product.price}
          </Typography>
          <Chip 
            label={product.store} 
            size="small" 
            sx={{ 
              bgcolor: theme.palette.brand.lightTeal,
              color: theme.palette.common.black,
              fontWeight: 500
            }} 
          />
        </Box>
      </CardContent>
      
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton size="small" onClick={handleLike} color={liked ? 'primary' : 'default'}>
            {liked ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
          </IconButton>
          <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
            {liked ? product.likes + 1 : product.likes}
          </Typography>
          
          <IconButton size="small" onClick={handleComment}>
            <ChatBubbleOutlineIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
            {product.comments}
          </Typography>
        </Box>
        
        <Box>
          <IconButton 
            size="small" 
            onClick={handleSave}
            color={saved ? 'primary' : 'default'}
          >
            {saved ? <BookmarkIcon fontSize="small" /> : <BookmarkBorderIcon fontSize="small" />}
          </IconButton>
          <IconButton size="small" onClick={handleShare}>
            <ShareIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ProductCard; 