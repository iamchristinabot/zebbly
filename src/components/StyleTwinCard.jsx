import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  Chip,
  Button,
  Divider,
  Grid,
  IconButton,
  useTheme
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import FavoriteIcon from '@mui/icons-material/Favorite';

const StyleTwinCard = ({ twin, onCompare, onFollow }) => {
  const theme = useTheme();
  
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header with avatar and match score */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <Avatar src={twin.avatar} sx={{ width: 56, height: 56, mr: 2 }} />
        <Box>
          <Typography variant="h6">{twin.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {twin.location}
          </Typography>
        </Box>
        <Box sx={{ ml: 'auto' }}>
          <Chip 
            label={`${Math.round(twin.matchScore * 100)}% Match`}
            color="primary"
            size="small"
          />
        </Box>
      </Box>
      
      <Divider />
      
      {/* Content */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="body2" paragraph>
          {twin.bio}
        </Typography>
        
        {/* Style traits */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Style Traits
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {twin.styleTraits.map((trait, index) => (
              <Chip key={index} label={trait} size="small" variant="outlined" />
            ))}
          </Box>
        </Box>
        
        {/* Common interests */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Common Interests
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {twin.commonInterests.map((interest, index) => (
              <Chip 
                key={index} 
                label={interest} 
                size="small" 
                variant="outlined"
                icon={<FavoriteIcon fontSize="small" />}
                sx={{ 
                  '& .MuiChip-icon': { 
                    color: theme.palette.error.light,
                    fontSize: '0.8rem'
                  } 
                }}
              />
            ))}
          </Box>
        </Box>
        
        {/* Recent products */}
        <Typography variant="subtitle2" gutterBottom>
          Recent Purchases
        </Typography>
        <Grid container spacing={1}>
          {twin.recentProducts.map((product) => (
            <Grid item xs={4} key={product.id}>
              <Box
                sx={{
                  borderRadius: 1,
                  overflow: 'hidden',
                  height: 80,
                  position: 'relative',
                  backgroundImage: `url(${product.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '50%',
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                  }
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 0.5,
                    zIndex: 1,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'white',
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      display: 'block',
                      lineHeight: 1.1,
                    }}
                    noWrap
                  >
                    {product.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: 'white', fontSize: '0.7rem' }}
                  >
                    ${product.price}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
      
      <Divider />
      
      {/* Actions */}
      <CardActions sx={{ justifyContent: 'space-between', p: 1 }}>
        <Button
          size="small"
          startIcon={twin.isFollowing ? <PersonAddDisabledIcon /> : <PersonAddIcon />}
          onClick={onFollow}
          color={twin.isFollowing ? "error" : "primary"}
        >
          {twin.isFollowing ? "Unfollow" : "Follow"}
        </Button>
        <Button
          size="small"
          startIcon={<CompareArrowsIcon />}
          onClick={onCompare}
        >
          Compare Style
        </Button>
      </CardActions>
    </Card>
  );
};

export default StyleTwinCard; 