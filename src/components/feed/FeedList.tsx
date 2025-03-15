import React from 'react';
import { Box, Paper, Typography, CircularProgress, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../hooks/useStores';
import { ShoppingProfileType } from '../../stores/socialFeedStore';
import FollowingFeedItem from './FollowingFeedItem';
import PlaylistRecommendationItem from './PlaylistRecommendationItem';
import StyleTwinSuggestionFeedItem from './StyleTwinSuggestionFeedItem';

interface FeedListProps {
  activeProfile: ShoppingProfileType;
}

const FeedList = observer(({ activeProfile }: FeedListProps) => {
  const theme = useTheme();
  const { socialFeedStore, userStore } = useStores();

  const followingFeed = socialFeedStore.followingFeed.filter(item => 
    item.profileTypes.includes(activeProfile)
  );
  const styleTwinsFeed = socialFeedStore.styleTwinsFeedByProfile.get(activeProfile) || [];
  const styleTwins = socialFeedStore.styleTwinsByProfile.get(activeProfile) || [];
  const playlistRecommendations = socialFeedStore.suggestedPlaylists
    .filter(playlist => playlist.profileTypes?.includes(activeProfile))
    .slice(0, 3); // Show only top 3 recommendations

  const handleLike = (itemId: string) => {
    socialFeedStore.toggleLike(itemId);
  };

  const handleComment = (itemId: string) => {
    // TODO: Implement comment functionality
    console.log('Comment on item:', itemId);
  };

  const handleShare = (itemId: string) => {
    // TODO: Implement share functionality
    console.log('Share item:', itemId);
  };

  const handleFollowPlaylist = (playlistId: string) => {
    // TODO: Implement playlist follow functionality
    console.log('Follow playlist:', playlistId);
  };

  if (socialFeedStore.isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (followingFeed.length === 0 && styleTwinsFeed.length === 0 && playlistRecommendations.length === 0) {
    return (
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          textAlign: 'center',
          border: `1px solid ${theme.palette.brand.lightGray}`,
          borderRadius: 2
        }}
      >
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No {activeProfile} style content yet
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Follow more people or switch to a different style profile to see more content
        </Typography>
      </Paper>
    );
  }

  // Interleave different types of content
  const feedItems = [];
  let followingIndex = 0;
  let styleTwinIndex = 0;
  let playlistIndex = 0;

  // Add items to feed in a pattern
  while (
    followingIndex < followingFeed.length || 
    styleTwinIndex < styleTwinsFeed.length || 
    playlistIndex < playlistRecommendations.length
  ) {
    // Add following item
    if (followingIndex < followingFeed.length) {
      feedItems.push(
        <FollowingFeedItem
          key={`following-${followingFeed[followingIndex].id}`}
          item={followingFeed[followingIndex]}
          onLike={handleLike}
          onComment={handleComment}
          onShare={handleShare}
        />
      );
      followingIndex++;
    }

    // Add style twin item
    if (styleTwinIndex < styleTwinsFeed.length) {
      feedItems.push(
        <Box key={`twin-${styleTwinsFeed[styleTwinIndex].id}`}>
          <StyleTwinSuggestionFeedItem
            creator={styleTwinsFeed[styleTwinIndex].creator}
            profileType={activeProfile}
            onFollow={(creatorId) => {
              userStore.toggleFollow(creatorId);
            }}
            isFollowing={userStore.isFollowing(styleTwinsFeed[styleTwinIndex].creator.id)}
          />
        </Box>
      );
      styleTwinIndex++;
    }

    // Add playlist recommendation
    if (playlistIndex < playlistRecommendations.length) {
      const playlist = playlistRecommendations[playlistIndex];
      feedItems.push(
        <PlaylistRecommendationItem
          key={`playlist-${playlist.id}`}
          item={{
            id: playlist.id,
            type: 'playlist',
            content: {
              title: playlist.title,
              description: playlist.description,
              coverImage: playlist.coverImage,
              itemCount: playlist.itemCount,
              likes: playlist.likes,
              profileTypes: playlist.profileTypes || []
            },
            likes: playlist.likes,
            comments: 0,
            isLiked: false,
            createdAt: new Date(),
            creator: playlist.creator,
            profileTypes: playlist.profileTypes || []
          }}
          onLike={handleLike}
          onComment={handleComment}
          onShare={handleShare}
          onFollowPlaylist={handleFollowPlaylist}
        />
      );
      playlistIndex++;
    }
  }

  return <Box>{feedItems}</Box>;
});

export default FeedList; 