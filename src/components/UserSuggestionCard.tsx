import React from 'react';
import {
  Box,
  Avatar,
  Typography,
  Button,
  useTheme
} from '@mui/material';
import { Link } from 'react-router-dom';
import { User } from '../types/store';
import { Theme } from '../types/theme';

interface UserSuggestionCardProps {
  user: User;
}

const UserSuggestionCard: React.FC<UserSuggestionCardProps> = ({ user }) => {
  const theme = useTheme<Theme>();
  
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        mb: 2 
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar 
          src={user.avatar} 
          alt={user.name}
          sx={{ width: 40, height: 40, mr: 2 }}
        />
        <Box>
          <Typography 
            variant="subtitle2" 
            component={Link} 
            to={`/profile/${user.id}`}
            sx={{ 
              textDecoration: 'none', 
              color: 'inherit',
              '&:hover': {
                color: theme.palette.primary.main
              }
            }}
          >
            {user.name}
          </Typography>
          {user.bio && (
            <Typography variant="body2" color="text.secondary" noWrap>
              {user.bio}
            </Typography>
          )}
        </Box>
      </Box>
      <Button 
        variant="outlined" 
        size="small"
        sx={{ 
          minWidth: 'auto',
          borderColor: theme.palette.brand.lightGray,
          color: theme.palette.text.primary,
          '&:hover': {
            borderColor: theme.palette.primary.main,
            bgcolor: 'transparent'
          }
        }}
      >
        Follow
      </Button>
    </Box>
  );
};

export default UserSuggestionCard; 