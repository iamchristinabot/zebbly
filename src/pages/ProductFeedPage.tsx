import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Avatar,
  Divider,
  CircularProgress,
  useTheme,
  IconButton
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import LinkIcon from '@mui/icons-material/Link';
import Header from '../components/header/Header';
import SocialFeedItem from '../components/SocialFeedItem';
import SuggestedPlaylists from '../components/SuggestedPlaylists';
import { useStores } from '../hooks/useStores';

interface ProductFeedPageProps {
  isAuthenticated?: boolean;
}

const ProductFeedPage = observer(({ isAuthenticated = true }: ProductFeedPageProps) => {
  const theme = useTheme();
  const { socialFeedStore, userStore } = useStores();
  const [postContent, setPostContent] = useState('');
  
  const handlePostSubmit = () => {
    if (!postContent.trim()) return;
    // TODO: Implement post creation
    console.log('Creating post:', postContent);
    setPostContent('');
  };

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
  
  useEffect(() => {
    socialFeedStore.fetchFeed();
    socialFeedStore.fetchSuggestedPlaylists();
  }, [socialFeedStore]);
  
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Main Feed */}
          <Grid item xs={12} md={8}>
            {/* Post Creation */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                mb: 3,
                border: `1px solid ${theme.palette.brand.lightGray}`,
                borderRadius: 2
              }}
            >
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Avatar 
                  src={userStore.currentUser?.avatar} 
                  alt={userStore.currentUser?.name}
                  sx={{ width: 40, height: 40 }}
                />
                <Box sx={{ flex: 1 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    placeholder="Share a product or create a playlist..."
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <IconButton size="small" color="primary">
                        <ImageIcon />
                      </IconButton>
                      <IconButton size="small" color="primary">
                        <LinkIcon />
                      </IconButton>
                    </Box>
                    <Button 
                      variant="contained" 
                      disabled={!postContent.trim()}
                      onClick={handlePostSubmit}
                    >
                      Post
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Paper>

            {/* Feed Items */}
            {socialFeedStore.isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Box>
                {socialFeedStore.feedItems.map(item => (
                  <SocialFeedItem
                    key={item.id}
                    item={item}
                    onLike={handleLike}
                    onComment={handleComment}
                    onShare={handleShare}
                  />
                ))}
              </Box>
            )}
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            {/* Suggested Playlists */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3,
                mb: 3,
                border: `1px solid ${theme.palette.brand.lightGray}`,
                borderRadius: 2,
                position: { md: 'sticky' },
                top: { md: 24 }
              }}
            >
              <Typography variant="h6" gutterBottom>
                Suggested Playlists
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              {socialFeedStore.isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress size={24} />
                </Box>
              ) : (
                <SuggestedPlaylists playlists={socialFeedStore.suggestedPlaylists} />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
});

export default ProductFeedPage; 