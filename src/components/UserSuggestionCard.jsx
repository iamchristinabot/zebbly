import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Box,
  Typography,
  Avatar,
  Button,
  Chip,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../stores/storeContext';

const UserSuggestionCard = observer(({ user }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { userStore } = useContext(StoreContext);
  const following = userStore.isFollowing(user.id);
  
  const handleFollow = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking follow button
    userStore.toggleFollow(user.id);
  };
  
  const handleUserClick = () => {
    navigate(`/profile/${user.id}`);
  };
  
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        mb: 2,
        pb: 2,
        borderBottom: `1px solid ${theme.palette.brand.lightGray}`,
        '&:last-child': {
          borderBottom: 'none',
          mb: 0,
          pb: 0
        },
        cursor: 'pointer',
        '&:hover': {
          bgcolor: theme.palette.action.hover
        },
        borderRadius: 1,
        p: 1
      }}
      onClick={handleUserClick}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar 
          src={user.avatar} 
          alt={user.name}
          sx={{ width: 50, height: 50, mr: 2 }}
        />
        <Box>
          <Typography variant="subtitle1">
            {user.name}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
            {user.mutualInterests && user.mutualInterests.map((interest, index) => (
              <Chip 
                key={index} 
                label={interest} 
                size="small" 
                variant="outlined"
                sx={{ 
                  height: 20, 
                  fontSize: '0.7rem',
                  '& .MuiChip-label': {
                    px: 1
                  }
                }}
              />
            ))}
          </Box>
          <Typography variant="caption" color="text.secondary">
            {user.productsShared} products shared
          </Typography>
        </Box>
      </Box>
      
      <Button 
        variant={following ? "outlined" : "contained"}
        color="primary"
        size="small"
        onClick={handleFollow}
        sx={{ 
          minWidth: 'auto',
          px: 2
        }}
      >
        {following ? "Following" : "Follow"}
      </Button>
    </Box>
  );
});

export default UserSuggestionCard; 