import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Typography, Button, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import rootStore from '../stores/rootStore';
import type { SampleUser } from '../stores/userStore';

interface UserSuggestionCardProps {
  user: SampleUser;
}

const UserSuggestionCard = observer(({ user }: UserSuggestionCardProps) => {
  const { userStore } = rootStore;
  const isFollowing = userStore.isFollowing(user.id);

  const handleFollowClick = () => {
    userStore.toggleFollow(user.id);
  };

  return (
    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
      <Avatar
        component={Link}
        to={`/profile/${user.id}`}
        src={user.avatar}
        sx={{ width: 48, height: 48 }}
      />
      <Box sx={{ flex: 1 }}>
        <Typography
          component={Link}
          to={`/profile/${user.id}`}
          variant="subtitle2"
          sx={{ textDecoration: 'none', color: 'inherit' }}
        >
          {user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.mutualInterests.join(', ')}
        </Typography>
      </Box>
      <Button
        variant={isFollowing ? "outlined" : "contained"}
        size="small"
        onClick={handleFollowClick}
      >
        {isFollowing ? 'Following' : 'Follow'}
      </Button>
    </Box>
  );
});

export default UserSuggestionCard; 