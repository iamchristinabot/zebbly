import React, { useState } from 'react';
import {
  Card,
  Box,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Button,
  useTheme
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const PlaylistItemCard = ({ item }) => {
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
  
  return (
    <Card 
      elevation={0}
      sx={{ 
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        border: `1px solid ${theme.palette.brand.lightGray}`,
        borderRadius: 2,
        overflow: 'hidden',
        height: '100%',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[2]
        }
      }}
    >
      <Box sx={{ position: 'relative', width: { xs: '100%', sm: 150 }, minWidth: { sm: 150 } }}>
        <CardMedia
          component="img"
          sx={{ height: { xs: 200, sm: '100%' }, objectFit: 'cover' }}
          image={item.image}
          alt={item.title}
        />
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 8, 
            left: 8, 
            bgcolor: theme.palette.primary.main, 
            color: 'white',
            width: 32,
            height: 32,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold'
          }}
        >
          {item.rank}
        </Box>
      </Box>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div" gutterBottom>
            {item.title}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" paragraph>
            {item.description}
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="h6" color="primary">
              ${item.price.toFixed(2)}
            </Typography>
            <Chip label={item.store} size="small" />
          </Box>
        </CardContent>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderTop: `1px solid ${theme.palette.brand.lightGray}` }}>
          <Box>
            <IconButton size="small" onClick={handleLike} color={liked ? "primary" : "default"}>
              {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <IconButton size="small" onClick={handleSave} color={saved ? "primary" : "default"}>
              {saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
          </Box>
          <Button 
            variant="contained" 
            size="small" 
            startIcon={<ShoppingCartIcon />}
            onClick={() => window.open(item.link, '_blank')}
          >
            View
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default PlaylistItemCard; 