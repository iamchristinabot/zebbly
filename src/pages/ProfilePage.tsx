import BlockIcon from '@mui/icons-material/Block';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CollectionsIcon from '@mui/icons-material/Collections';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ReportIcon from '@mui/icons-material/Report';
import ShareIcon from '@mui/icons-material/Share';
import VerifiedIcon from '@mui/icons-material/Verified';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Tab,
  Tabs,
  Typography,
  useTheme
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import ProductCard from '../components/ProductCard';
import { useStores } from '../hooks/useStores';

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

interface List {
  id: string;
  name: string;
  itemCount: number;
  previewImages: string[];
}

interface Activity {
  id: string;
  type: 'like' | 'comment' | 'save';
  timestamp: string;
  targetUser: string;
  targetTitle: string;
  targetImage: string;
  time?: string;
}

interface Post {
  id: string;
  type: string;
  title: string;
  image: string;
  price: string;
  store: string;
  user: string;
  likes: number;
  comments: number;
}

interface Interest {
  name: string;
  id: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// List Card Component
const ListCard = ({ list }: { list: List }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  return (
    <Card 
      elevation={0} 
      sx={{ 
        border: `1px solid ${theme.palette.brand.lightGray}`,
        borderRadius: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <CardActionArea onClick={() => navigate(`/lists/${list.id}`)}>
        <CardMedia
          component="div"
          sx={{ 
            height: 140,
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)',
            gap: 1,
            p: 1
          }}
        >
          {list.previewImages.map((image, index) => (
            <Box 
              key={index}
              sx={{ 
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100%',
                borderRadius: 1
              }}
            />
          ))}
        </CardMedia>
        <CardContent>
          <Typography variant="h6" component="div">
            {list.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {list.itemCount} items
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

// Activity Item Component
const ActivityItem = ({ activity }: { activity: Activity }) => {
  const theme = useTheme();
  
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'like':
        return <FavoriteIcon color="error" fontSize="small" />;
      case 'comment':
        return <CommentIcon color="primary" fontSize="small" />;
      case 'save':
        return <BookmarkIcon color="primary" fontSize="small" />;
      default:
        return null;
    }
  };
  
  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case 'like':
        return `You liked ${activity.targetUser}'s post: "${activity.targetTitle}"`;
      case 'comment':
        return `You commented on ${activity.targetUser}'s post: "${activity.targetTitle}"`;
      case 'save':
        return `You saved ${activity.targetUser}'s post: "${activity.targetTitle}" to your collection`;
      default:
        return '';
    }
  };
  
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        py: 2,
        borderBottom: `1px solid ${theme.palette.brand.lightGray}`,
        '&:last-child': {
          borderBottom: 'none'
        }
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: 40,
          height: 40,
          borderRadius: '50%',
          bgcolor: 'background.paper',
          mr: 2
        }}
      >
        {getActivityIcon(activity.type)}
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body2">
          {getActivityText(activity)}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {activity.time}
        </Typography>
      </Box>
    </Box>
  );
};

export interface ProfilePageProps {
  isAuthenticated: boolean;
  userId: string;
}

const ProfilePage = observer(({ isAuthenticated = true, userId }: ProfilePageProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { userStore } = useStores();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [savedItems, setSavedItems] = useState<Post[]>([]);
  const [userLists, setUserLists] = useState<List[]>([]);
  const [userActivity, setUserActivity] = useState<Activity[]>([]);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  
  // Determine if this is the current user's profile
  const isOwnProfile = userId === 'me' || !userId;
  
  // Get user data from the store
  const profileData = userStore.getUserById(userId);
  
  // Check if the current user is following this profile
  const following = !isOwnProfile && userStore.isFollowing(userId);
  
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  
  const handleFollow = () => {
    userStore.toggleFollow(userId);
  };
  
  const handleShare = () => {
    alert('Share profile functionality would be implemented here');
    handleMenuClose();
  };
  
  const handleReport = () => {
    alert('Report profile functionality would be implemented here');
    handleMenuClose();
  };
  
  const handleBlock = () => {
    alert('Block user functionality would be implemented here');
    handleMenuClose();
  };
  
  const handleUserClick = (userId: string) => {
    navigate(`/profile/${userId}`);
  };
  
  useEffect(() => {
    // Simulate API call to fetch user data
    setTimeout(() => {
      // Generate sample posts based on user ID
      const samplePosts = Array(4).fill(null).map((_, index) => ({
        id: `${userId || 'me'}-post-${index + 1}`,
        type: 'product',
        title: `Sample Product ${index + 1}`,
        image: `https://picsum.photos/seed/${userId || 'me'}-${index + 1}/300/200`,
        price: (19.99 + index * 10).toFixed(2),
        store: ['Amazon', 'Target', 'Walmart', 'Best Buy'][index % 4],
        user: profileData?.name || '',
        likes: Math.floor(Math.random() * 50) + 5,
        comments: Math.floor(Math.random() * 10)
      }));
      
      setUserPosts(samplePosts);
      setSavedItems(samplePosts.slice(0, 2));
      
      // Generate sample lists
      setUserLists([
        {
          id: `${userId || 'me'}-list-1`,
          name: 'Favorites',
          itemCount: 12,
          previewImages: [
            `https://picsum.photos/seed/${userId || 'me'}-list-1-1/100/100`,
            `https://picsum.photos/seed/${userId || 'me'}-list-1-2/100/100`,
            `https://picsum.photos/seed/${userId || 'me'}-list-1-3/100/100`,
            `https://picsum.photos/seed/${userId || 'me'}-list-1-4/100/100`
          ]
        },
        {
          id: `${userId || 'me'}-list-2`,
          name: 'Wishlist',
          itemCount: 8,
          previewImages: [
            `https://picsum.photos/seed/${userId || 'me'}-list-2-1/100/100`,
            `https://picsum.photos/seed/${userId || 'me'}-list-2-2/100/100`,
            `https://picsum.photos/seed/${userId || 'me'}-list-2-3/100/100`,
            `https://picsum.photos/seed/${userId || 'me'}-list-2-4/100/100`
          ]
        }
      ]);
      
      // Generate sample activity
      setUserActivity([
        {
          id: `${userId || 'me'}-activity-1`,
          type: 'like',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          targetUser: 'Jane Doe',
          targetTitle: 'Minimalist Desk Lamp',
          targetImage: `https://picsum.photos/seed/${userId || 'me'}-activity-1/100/100`
        },
        {
          id: `${userId || 'me'}-activity-2`,
          type: 'comment',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          targetUser: 'John Smith',
          targetTitle: 'Wireless Headphones',
          targetImage: `https://picsum.photos/seed/${userId || 'me'}-activity-2/100/100`
        },
        {
          id: `${userId || 'me'}-activity-3`,
          type: 'save',
          timestamp: new Date(Date.now() - 172800000).toISOString(),
          targetUser: 'Alex Johnson',
          targetTitle: 'Smart Watch',
          targetImage: `https://picsum.photos/seed/${userId || 'me'}-activity-3/100/100`
        }
      ]);
      
      setLoading(false);
    }, 1000);
  }, [userId, profileData]);
  
  // If profile data is not found, show a message
  if (!profileData) {
    return (
      <>
        <Header isAuthenticated={isAuthenticated} />
        <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            User Not Found
          </Typography>
          <Typography variant="body1" paragraph>
            The user profile you're looking for doesn't exist.
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            component={Link}
            to="/"
          >
            Go Home
          </Button>
        </Container>
      </>
    );
  }
  
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            border: `1px solid ${theme.palette.brand.lightGray}`,
            borderRadius: 2,
            mb: 4
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar 
                src={profileData.avatar} 
                alt={profileData.name}
                sx={{ width: 120, height: 120, mb: 2 }}
              />
              
              {isOwnProfile ? (
                <Button 
                  variant="outlined" 
                  startIcon={<EditIcon />}
                  component={Link}
                  to="/settings"
                  sx={{ mb: 2 }}
                >
                  Edit Profile
                </Button>
              ) : (
                <Button 
                  variant={following ? "outlined" : "contained"}
                  color="primary"
                  startIcon={following ? <PersonRemoveIcon /> : <PersonAddIcon />}
                  onClick={handleFollow}
                  sx={{ mb: 2 }}
                >
                  {following ? "Following" : "Follow"}
                </Button>
              )}
            </Grid>
            
            <Grid item xs={12} md={9}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                      {profileData.name}
                    </Typography>
                    {profileData.isVerified && (
                      <VerifiedIcon 
                        color="primary" 
                        sx={{ ml: 1 }}
                      />
                    )}
                  </Box>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {profileData.username}
                  </Typography>
                </Box>
                
                {!isOwnProfile && (
                  <IconButton onClick={handleMenuOpen}>
                    <MoreHorizIcon />
                  </IconButton>
                )}
                
                <Menu
                  anchorEl={menuAnchorEl}
                  open={Boolean(menuAnchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleShare}>
                    <ListItemIcon>
                      <ShareIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Share Profile</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleReport}>
                    <ListItemIcon>
                      <ReportIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Report User</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleBlock}>
                    <ListItemIcon>
                      <BlockIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Block User</ListItemText>
                  </MenuItem>
                </Menu>
              </Box>
              
              <Typography variant="body1" paragraph>
                {profileData.bio}
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {profileData.interests.map((interest: string, index: number) => (
                  <Chip 
                    key={index} 
                    label={interest} 
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
              
              <Box sx={{ display: 'flex', gap: 4, mb: 2 }}>
                <Box>
                  <Typography variant="h6" component="span">
                    {profileData.followers}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" component="span" sx={{ ml: 0.5 }}>
                    Followers
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6" component="span">
                    {profileData.following}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" component="span" sx={{ ml: 0.5 }}>
                    Following
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6" component="span">
                    {profileData.productsShared}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" component="span" sx={{ ml: 0.5 }}>
                    Products
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Posts" />
            <Tab label="Saved" />
            <Tab label="Lists" />
            <Tab label="Activity" />
          </Tabs>
        </Box>
        
        <TabPanel value={tabValue} index={0}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={3}>
              {userPosts.length > 0 ? (
                userPosts.map(post => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={post.id}>
                    <ProductCard product={post} onUserClick={handleUserClick} />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Box sx={{ textAlign: 'center', py: 8 }}>
                    <CollectionsIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      No posts yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Share products you love with your followers.
                    </Typography>
                    {isOwnProfile && (
                      <Button 
                        variant="contained" 
                        color="primary"
                        component={Link}
                        to="/create"
                      >
                        Create Post
                      </Button>
                    )}
                  </Box>
                </Grid>
              )}
            </Grid>
          )}
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={3}>
              {savedItems.length > 0 ? (
                savedItems.map(item => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                    <ProductCard product={item} onUserClick={handleUserClick} />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Box sx={{ textAlign: 'center', py: 8 }}>
                    <BookmarkIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      No saved items yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Items you save will appear here.
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          )}
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={3}>
              {userLists.length > 0 ? (
                userLists.map(list => (
                  <Grid item xs={12} sm={6} md={4} key={list.id}>
                    <ListCard list={list} />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Box sx={{ textAlign: 'center', py: 8 }}>
                    <CollectionsIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      No lists yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Create lists to organize products by theme or occasion.
                    </Typography>
                    {isOwnProfile && (
                      <Button 
                        variant="contained" 
                        color="primary"
                      >
                        Create List
                      </Button>
                    )}
                  </Box>
                </Grid>
              )}
            </Grid>
          )}
        </TabPanel>
        
        <TabPanel value={tabValue} index={3}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                border: `1px solid ${theme.palette.brand.lightGray}`,
                borderRadius: 2
              }}
            >
              {userActivity.length > 0 ? (
                userActivity.map(activity => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    No recent activity
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Recent interactions will appear here.
                  </Typography>
                </Box>
              )}
            </Paper>
          )}
        </TabPanel>
      </Container>
    </>
  );
});

export default ProfilePage; 