import React from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { FeedItem } from '../../stores/socialFeedStore';
import SocialFeedItem from '../SocialFeedItem';

interface FollowingFeedItemProps {
  item: FeedItem;
  onLike: (itemId: string) => void;
  onComment: (itemId: string) => void;
  onShare: (itemId: string) => void;
}

const FollowingFeedItem = observer(({ 
  item,
  onLike,
  onComment,
  onShare
}: FollowingFeedItemProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ mb: 3 }}>
      <Paper
        elevation={0}
        sx={{
          border: `1px solid ${theme.palette.brand.lightGray}`,
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <Box sx={{ p: 2, bgcolor: 'primary.50' }}>
          <Typography variant="subtitle2" color="primary">
            From someone you follow
          </Typography>
        </Box>
        <SocialFeedItem
          item={item}
          onLike={onLike}
          onComment={onComment}
          onShare={onShare}
        />
      </Paper>
    </Box>
  );
});

export default FollowingFeedItem; 