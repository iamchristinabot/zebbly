import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  Divider,
  Avatar,
  Chip,
  Paper
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import Header from '../components/header/Header';
import CommunityPosts from '../components/communities/CommunityPosts';
import CommunityMembers from '../components/communities/CommunityMembers';
import CommunityAbout from '../components/communities/CommunityAbout';
import CommunityProductRecommendations from '../components/communities/CommunityProductRecommendations';

const CommunityDetailPage = ({ isAuthenticated = true }) => {
  const { communityId } = useParams();
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [isJoined, setIsJoined] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    // Fetch community data
    setLoading(true);
    // This would be an API call in a real app
    setTimeout(() => {
      // Mock community data
      const mockCommunity = {
        id: communityId,
        name: 'New Parents Hub',
        description: 'A community for new parents to discuss baby products, share experiences, and support each other.',
        longDescription: `Welcome to the New Parents Hub! This is a supportive community where new parents can connect, share experiences, and discuss all things related to baby products and parenting.

Whether you're looking for recommendations on the best strollers, car seats, cribs, or baby monitors, or you need advice on sleep training, feeding, or developmental milestones, our community is here to help.

We encourage respectful discussions and sharing of personal experiences. Remember that every baby is different, and what works for one family might not work for another.`,
        memberCount: 2453,
        postCount: 1287,
        category: 'Parenting',
        tags: ['Baby', 'Newborn', 'Parenting', 'Products', 'Advice'],
        image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba',
        coverImage: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9',
        createdAt: '2022-05-15T10:30:00Z',
        rules: [
          'Be respectful and supportive of other parents',
          'No spam or self-promotion',
          'Share personal experiences, not medical advice',
          'Keep discussions focused on products and parenting',
          'Respect privacy - don\'t share others\' personal information'
        ]
      };
      
      setCommunity(mockCommunity);
      setLoading(false);
    }, 1000);
  }, [communityId]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleJoinCommunity = () => {
    setIsJoined(!isJoined);
    if (!isJoined) {
      setNotificationsEnabled(true);
    }
  };

  const handleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  if (loading || !community) {
    return (
      <>
        <Header isAuthenticated={isAuthenticated} />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
          <Typography>Loading community...</Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <Box 
        sx={{ 
          height: 200, 
          width: '100%', 
          backgroundImage: `url(${community.coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}
      >
        <Box 
          sx={{ 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            right: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))',
            p: 2
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h4" component="h1" sx={{ color: 'white', fontWeight: 'bold' }}>
              {community.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'white' }}>
              <PeopleIcon fontSize="small" />
              <Typography variant="body2">
                {community.memberCount.toLocaleString()} members
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
      
      <Container maxWidth="lg" sx={{ mt: 3, mb: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {community.tags.map(tag => (
              <Chip key={tag} label={tag} size="small" />
            ))}
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant={isJoined ? "outlined" : "contained"}
              color="primary"
              onClick={handleJoinCommunity}
            >
              {isJoined ? "Leave Community" : "Join Community"}
            </Button>
            {isJoined && (
              <Button
                variant="outlined"
                color="primary"
                startIcon={notificationsEnabled ? <NotificationsIcon /> : <NotificationsOffIcon />}
                onClick={handleNotifications}
              >
                {notificationsEnabled ? "Notifications On" : "Notifications Off"}
              </Button>
            )}
          </Box>
        </Box>
        
        <Paper sx={{ mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="community tabs">
            <Tab label="Posts" />
            <Tab label="About" />
            <Tab label="Members" />
            <Tab label="Product Recommendations" />
          </Tabs>
        </Paper>
        
        {tabValue === 0 && <CommunityPosts communityId={communityId} />}
        {tabValue === 1 && <CommunityAbout community={community} />}
        {tabValue === 2 && <CommunityMembers communityId={communityId} />}
        {tabValue === 3 && <CommunityProductRecommendations communityId={communityId} />}
      </Container>
    </>
  );
};

export default CommunityDetailPage; 