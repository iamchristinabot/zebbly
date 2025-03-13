import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Divider,
  IconButton,
  Grid,
  Paper,
  Menu,
  MenuItem
} from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SortIcon from '@mui/icons-material/Sort';
import { Link } from 'react-router-dom';

const CommunityPosts = ({ communityId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postContent, setPostContent] = useState('');
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [sortOption, setSortOption] = useState('recent');

  useEffect(() => {
    // Fetch posts data
    setLoading(true);
    // This would be an API call in a real app
    setTimeout(() => {
      // Mock posts data
      const mockPosts = [
        {
          id: 'p1',
          author: {
            id: 'u1',
            name: 'Sarah Johnson',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
          },
          content: "Just got the new Graco 4Ever DLX car seat and I'm really impressed with the quality. It's easy to install and my baby seems comfortable in it. Has anyone else tried this model?",
          images: ['https://images.unsplash.com/photo-1591088398332-8a7791972843'],
          createdAt: '2023-06-15T14:30:00Z',
          likes: 24,
          comments: 8,
          isLiked: false,
          isSaved: true
        },
        {
          id: 'p2',
          author: {
            id: 'u2',
            name: 'Michael Chen',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
          },
          content: "Looking for recommendations on baby monitors with good night vision and long battery life. We have a large house, so range is important too. Budget is around $150-200.",
          images: [],
          createdAt: '2023-06-14T09:15:00Z',
          likes: 12,
          comments: 15,
          isLiked: true,
          isSaved: false
        },
        {
          id: 'p3',
          author: {
            id: 'u3',
            name: 'Emily Rodriguez',
            avatar: 'https://randomuser.me/api/portraits/women/67.jpg'
          },
          content: "I've been using the Hatch Rest sound machine and night light for a month now, and it's been a game-changer for our bedtime routine. The app control is super convenient. Highly recommend!",
          images: ['https://images.unsplash.com/photo-1555252333-9f8e92e65df9'],
          createdAt: '2023-06-13T18:45:00Z',
          likes: 36,
          comments: 5,
          isLiked: false,
          isSaved: false
        }
      ];
      
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, [communityId]);

  const handlePostSubmit = () => {
    if (!postContent.trim()) return;
    
    // In a real app, this would send the post to the server
    const newPost = {
      id: `p${Date.now()}`,
      author: {
        id: 'me',
        name: 'You',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      content: postContent,
      images: [],
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      isLiked: false,
      isSaved: false
    };
    
    setPosts([newPost, ...posts]);
    setPostContent('');
  };

  const handleSortClick = (event) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    handleSortClose();
    
    // Sort posts based on selected option
    const sortedPosts = [...posts];
    if (option === 'recent') {
      sortedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (option === 'popular') {
      sortedPosts.sort((a, b) => b.likes - a.likes);
    } else if (option === 'comments') {
      sortedPosts.sort((a, b) => b.comments - a.comments);
    }
    setPosts(sortedPosts);
  };

  const handleLikePost = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleSavePost = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isSaved: !post.isSaved
        };
      }
      return post;
    }));
  };

  return (
    <Box>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
          Create Post
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="Share something with the community..."
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="contained" 
            disabled={!postContent.trim()}
            onClick={handlePostSubmit}
          >
            Post
          </Button>
        </Box>
      </Paper>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="h3">
          Community Posts
        </Typography>
        <Button 
          startIcon={<SortIcon />}
          onClick={handleSortClick}
        >
          Sort by: {sortOption === 'recent' ? 'Most Recent' : sortOption === 'popular' ? 'Most Popular' : 'Most Comments'}
        </Button>
        <Menu
          anchorEl={sortAnchorEl}
          open={Boolean(sortAnchorEl)}
          onClose={handleSortClose}
        >
          <MenuItem onClick={() => handleSortChange('recent')}>Most Recent</MenuItem>
          <MenuItem onClick={() => handleSortChange('popular')}>Most Popular</MenuItem>
          <MenuItem onClick={() => handleSortChange('comments')}>Most Comments</MenuItem>
        </Menu>
      </Box>
      
      {loading ? (
        <Typography>Loading posts...</Typography>
      ) : (
        <Box>
          {posts.length === 0 ? (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body1">No posts yet. Be the first to post in this community!</Typography>
            </Paper>
          ) : (
            posts.map(post => (
              <Paper key={post.id} sx={{ mb: 3, overflow: 'hidden' }}>
                <Box sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar src={post.author.avatar} sx={{ mr: 1 }} />
                    <Box>
                      <Typography variant="subtitle2" component={Link} to={`/profile/${post.author.id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                        {post.author.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {new Date(post.createdAt).toLocaleDateString(undefined, { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Typography variant="body1" paragraph>
                    {post.content}
                  </Typography>
                  
                  {post.images && post.images.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <img 
                        src={post.images[0]} 
                        alt="Post attachment" 
                        style={{ 
                          width: '100%', 
                          maxHeight: 400, 
                          objectFit: 'cover',
                          borderRadius: 8
                        }} 
                      />
                    </Box>
                  )}
                  
                  <Divider sx={{ my: 1 }} />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                      <IconButton onClick={() => handleLikePost(post.id)}>
                        {post.isLiked ? <ThumbUpIcon color="primary" /> : <ThumbUpOutlinedIcon />}
                      </IconButton>
                      <Typography variant="body2" component="span">
                        {post.likes}
                      </Typography>
                      
                      <IconButton component={Link} to={`/communities/${communityId}/posts/${post.id}`}>
                        <ChatBubbleOutlineIcon />
                      </IconButton>
                      <Typography variant="body2" component="span">
                        {post.comments}
                      </Typography>
                    </Box>
                    
                    <Box>
                      <IconButton>
                        <ShareIcon />
                      </IconButton>
                      <IconButton onClick={() => handleSavePost(post.id)}>
                        {post.isSaved ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            ))
          )}
        </Box>
      )}
    </Box>
  );
};

export default CommunityPosts; 