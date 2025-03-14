import React, { useState, useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Avatar,
  Chip,
  Divider,
  CircularProgress,
  IconButton,
  useTheme
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { StoreContext } from '../stores/storeContext';
import Header from '../components/Header';
import PlaylistItemCard from '../components/playlists/PlaylistItemCard';
import { AuthenticatedProps } from '../types/common';

export interface ProductPlaylistDetailPageProps extends AuthenticatedProps {}

const ProductPlaylistDetailPage = observer(({ isAuthenticated = true }: ProductPlaylistDetailPageProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { playlistId } = useParams();
  const { productPlaylistStore } = useContext(StoreContext);
  
  // State for playlist and UI
  const [loading, setLoading] = useState(true);
  const [playlist, setPlaylist] = useState(null);
  const [playlistItems, setPlaylistItems] = useState([]);
  const [liked, setLiked] = useState(false);
  
  // Load playlist data on component mount
  useEffect(() => {
    const fetchPlaylistData = async () => {
      setLoading(true);
      
      // Get playlist details
      const playlistData = productPlaylistStore.getPlaylistById(playlistId);
      
      if (playlistData) {
        setPlaylist(playlistData);
        
        // Get playlist items
        try {
          const items = await productPlaylistStore.getPlaylistItems(playlistId);
          setPlaylistItems(items);
        } catch (error) {
          console.error("Error fetching playlist items:", error);
          setPlaylistItems([]);
        }
      } else {
        // Handle playlist not found
        console.error("Playlist not found");
      }
      
      setLoading(false);
    };
    
    fetchPlaylistData();
  }, [playlistId, productPlaylistStore]);
  
  // Handle like button click
  const handleLike = () => {
    setLiked(!liked);
    // In a real app, this would call an API to update the like count
  };
  
  // Handle share button click
  const handleShare = () => {
    // In a real app, this would open a share dialog
    alert(`Sharing playlist: ${playlist?.title}`);
  };
  
  // Check if the playlist belongs to the current user
  const isUserPlaylist = playlist?.creator.id === 'me';
  
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : playlist ? (
          <>
            {/* Back button */}
            <Button
              startIcon={<ArrowBackIcon />}
              component={Link}
              to="/product-playlists"
              sx={{ mb: 2 }}
            >
              Back to Playlists
            </Button>
            
            {/* Playlist header */}
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' },
                mb: 4,
                gap: 3
              }}
            >
              {/* Playlist cover image */}
              <Box 
                sx={{ 
                  width: { xs: '100%', md: 300 },
                  height: { xs: 200, md: 300 },
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: theme.shadows[2]
                }}
              >
                <img 
                  src={playlist.coverImage} 
                  alt={playlist.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
              
              {/* Playlist info */}
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Chip 
                    label="PLAYLIST" 
                    size="small" 
                    sx={{ 
                      bgcolor: theme.palette.primary.main, 
                      color: 'white',
                      fontWeight: 'bold',
                      mr: 1
                    }} 
                  />
                  {playlist.isPublic ? (
                    <Chip label="Public" size="small" />
                  ) : (
                    <Chip label="Private" size="small" />
                  )}
                </Box>
                
                <Typography variant="h3" component="h1" gutterBottom>
                  {playlist.title}
                </Typography>
                
                <Typography variant="body1" paragraph>
                  {playlist.description}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    src={playlist.creator.avatar} 
                    alt={playlist.creator.name}
                    sx={{ mr: 1 }}
                  />
                  <Typography variant="subtitle1">
                    {playlist.creator.name}
                  </Typography>
                </Box>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {playlist.itemCount} items • {playlist.likes} likes
                </Typography>
                
                <Box sx={{ display: 'flex', mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    onClick={handleLike}
                    sx={{ mr: 1 }}
                  >
                    {liked ? 'Liked' : 'Like'}
                  </Button>
                  
                  <Button
                    variant="outlined"
                    startIcon={<ShareIcon />}
                    onClick={handleShare}
                    sx={{ mr: 1 }}
                  >
                    Share
                  </Button>
                  
                  {isUserPlaylist && (
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      component={Link}
                      to={`/product-playlists/edit/${playlist.id}`}
                    >
                      Edit
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
            
            <Divider sx={{ mb: 4 }} />
            
            {/* Playlist items */}
            <Typography variant="h5" component="h2" gutterBottom>
              Playlist Items
            </Typography>
            
            {playlistItems.length > 0 ? (
              <Grid container spacing={3}>
                {playlistItems.map(item => (
                  <Grid item xs={12} key={item.id}>
                    <PlaylistItemCard item={item} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body1" color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
                This playlist doesn't have any items yet.
              </Typography>
            )}
          </>
        ) : (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Playlist not found
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/product-playlists"
              sx={{ mt: 2 }}
            >
              Back to Playlists
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
});

export default ProductPlaylistDetailPage; 