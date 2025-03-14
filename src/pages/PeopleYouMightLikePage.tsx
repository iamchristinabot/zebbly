import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  InputAdornment,
  Chip,
  Divider,
  CircularProgress,
  Button,
  Card,
  CardContent,
  CardActions,
  Avatar,
  useTheme
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { AuthenticatedProps } from '../types/common';
import { useStores } from '../hooks/useStores';

interface Person {
  id: string;
  name: string;
  avatar: string;
  productsShared: number;
  interests: string[];
  mutualInterests: string[];
}

interface PeopleCardProps {
  person: Person;
  onFollow: (userId: string, isFollowing: boolean) => void;
}

const PeopleCard = observer(({ person, onFollow }: PeopleCardProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { userStore } = useStores();
  const following = userStore.isFollowing(person.id);
  
  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking follow button
    userStore.toggleFollow(person.id);
    if (onFollow) {
      onFollow(person.id, !following);
    }
  };
  
  const handleProfileClick = () => {
    navigate(`/profile/${person.id}`);
  };
  
  return (
    <Card 
      elevation={0} 
      sx={{ 
        border: `1px solid ${theme.palette.brand.lightGray}`,
        borderRadius: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: theme.shadows[2]
        }
      }}
      onClick={handleProfileClick}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Avatar 
            src={person.avatar} 
            alt={person.name}
            sx={{ width: 80, height: 80, mb: 2 }}
          />
          <Typography variant="h6" component="div" align="center">
            {person.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            {person.productsShared} products shared
          </Typography>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="subtitle2" gutterBottom>
          Interests
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
          {person.interests.map((interest: string, index: number) => (
            <Chip 
              key={index} 
              label={interest} 
              size="small" 
              variant="outlined"
            />
          ))}
        </Box>
        
        <Typography variant="subtitle2" gutterBottom>
          Common Interests
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {person.mutualInterests.map((interest: string, index: number) => (
            <Chip 
              key={index} 
              label={interest} 
              size="small"
              color="primary"
              sx={{ 
                bgcolor: theme.palette.brand.lightTeal,
                color: theme.palette.common.black
              }}
            />
          ))}
        </Box>
      </CardContent>
      
      <CardActions sx={{ justifyContent: 'center', p: 2 }}>
        <Button 
          variant={following ? "outlined" : "contained"}
          color="primary"
          fullWidth
          onClick={handleFollow}
        >
          {following ? "Following" : "Follow"}
        </Button>
      </CardActions>
    </Card>
  );
});

export interface PeopleYouMightLikePageProps extends AuthenticatedProps {}

const PeopleYouMightLikePage = observer(({ isAuthenticated = true }: PeopleYouMightLikePageProps) => {
  const theme = useTheme();
  const { userStore } = useStores();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  
  // Get all available interests from all users
  const availableInterests = [...new Set(
    userStore.getAllUsers().flatMap((user: Person) => user.interests)
  )];
  
  // Get filtered people based on search and interests
  const filteredPeople = userStore.getFilteredUsers(searchQuery, selectedInterests);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleInterestToggle = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };
  
  const handleFollowToggle = (userId: string, isFollowing: boolean) => {
    // This is now handled by the userStore
    console.log(`User ${userId} is now ${isFollowing ? 'followed' : 'unfollowed'}`);
  };
  
  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          People You Might Like
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Discover people with similar interests and follow them to see their product recommendations.
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                position: { md: 'sticky' },
                top: { md: 24 },
                border: `1px solid ${theme.palette.brand.lightGray}`,
                borderRadius: 2
              }}
            >
              <Typography variant="h6" gutterBottom>
                Filters
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <TextField
                fullWidth
                placeholder="Search people"
                value={searchQuery}
                onChange={handleSearchChange}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />
              
              <Typography variant="subtitle2" gutterBottom>
                Filter by Interests
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {availableInterests.map((interest: string, index: number) => (
                  <Chip 
                    key={index} 
                    label={interest} 
                    onClick={() => handleInterestToggle(interest)}
                    color={selectedInterests.includes(interest) ? "primary" : "default"}
                    variant={selectedInterests.includes(interest) ? "filled" : "outlined"}
                  />
                ))}
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={9}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6">
                    {filteredPeople.length} people found
                  </Typography>
                  <Button 
                    startIcon={<FilterListIcon />}
                    sx={{ display: { xs: 'flex', md: 'none' } }}
                  >
                    Filters
                  </Button>
                </Box>
                
                <Grid container spacing={3}>
                  {filteredPeople.map((person: Person) => (
                    <Grid item xs={12} sm={6} md={4} key={person.id}>
                      <PeopleCard 
                        person={person} 
                        onFollow={handleFollowToggle}
                      />
                    </Grid>
                  ))}
                </Grid>
                
                {filteredPeople.length === 0 && (
                  <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary">
                      No people match your filters
                    </Typography>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      sx={{ mt: 2 }}
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedInterests([]);
                      }}
                    >
                      Clear Filters
                    </Button>
                  </Box>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
});

export default PeopleYouMightLikePage;