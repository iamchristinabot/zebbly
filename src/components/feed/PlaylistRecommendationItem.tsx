import React from 'react';
import { Box, Paper, Typography, Button, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { FeedItem } from '../../stores/socialFeedStore';
import SocialFeedItem from '../SocialFeedItem';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

interface PlaylistRecommendationItemProps {
  item: FeedItem;
  onLike: (itemId: string) => void;
  onComment: (itemId: string) => void;
  onShare: (itemId: string) => void;
  onFollowPlaylist: (playlistId: string) => void;
}

const PlaylistRecommendationItem = observer(({ 
  item,
  onLike,
  onComment,
  onShare,
  onFollowPlaylist
}: PlaylistRecommendationItemProps) => {
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
        <Box 
          sx={{ 
            p: 2, 
            bgcolor: 'secondary.50',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography variant="subtitle2" color="secondary">
            From a playlist you might like
          </Typography>
          <Button
            startIcon={<PlaylistAddIcon />}
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => onFollowPlaylist(item.id)}
          >
            Follow Playlist
          </Button>
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

export default PlaylistRecommendationItem; 