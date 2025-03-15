import React, { useState, useEffect } from 'react';
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
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import PlaylistItemCard from '../components/playlists/PlaylistItemCard';
import { AuthenticatedProps } from '../types/common';
import { ProductPlaylistStore } from '../stores/productPlaylistStore';
import type { Playlist, Product, PlaylistCreator } from '../types/index';

export interface ProductPlaylistDetailPageProps extends AuthenticatedProps {
  productPlaylistStore: ProductPlaylistStore;
}

// Store types
interface StoreProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

interface StorePlaylist {
  id: string;
  userId: string;
  name: string;
  description: string;
  products: StoreProduct[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  coverImage?: string;
}

const convertStoreProductToUIProduct = (storeProduct: StoreProduct): Product => ({
  id: storeProduct.id,
  title: storeProduct.name,
  description: storeProduct.description,
  price: storeProduct.price,
  image: storeProduct.imageUrl,
  store: '', // Add default or get from store
  link: '', // Add default or get from store
  category: storeProduct.category
});

const ProductPlaylistDetailPage = observer(({ 
  isAuthenticated = true,
  productPlaylistStore
}: ProductPlaylistDetailPageProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { playlistId } = useParams();
  
  // State for playlist and UI
  const [loading, setLoading] = useState(true);
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [playlistItems, setPlaylistItems] = useState<Product[]>([]);
  const [liked, setLiked] = useState(false);
  
  // Load playlist data on component mount
  useEffect(() => {
    const fetchPlaylistData = async () => {
      if (!playlistId) return;
      
      setLoading(true);
      
      try {
        // Get playlist details
        const foundPlaylist = productPlaylistStore.playlists.find(p => p.id === playlistId) as StorePlaylist | undefined;
        
        if (foundPlaylist) {
          // Convert store playlist to UI playlist type
          const uiPlaylist: Playlist = {
            id: foundPlaylist.id,
            title: foundPlaylist.name,
            description: foundPlaylist.description,
            coverImage: foundPlaylist.coverImage || foundPlaylist.products[0]?.imageUrl || 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop&q=60',
            creator: {
              id: foundPlaylist.userId,
              name: 'User',
              avatar: 'https://i.pravatar.cc/150?u=' + foundPlaylist.userId
            },
            itemCount: foundPlaylist.products.length,
            likes: 0,
            isPublic: foundPlaylist.isPublic,
            items: foundPlaylist.products.map(convertStoreProductToUIProduct)
          };
          
          setPlaylist(uiPlaylist);
          setPlaylistItems(foundPlaylist.products.map(convertStoreProductToUIProduct));
        } else {
          console.error("Playlist not found");
        }
      } catch (error) {
        console.error("Error fetching playlist:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlaylistData();
  }, [playlistId, productPlaylistStore]);
  
  // Handle like button click
  const handleLike = () => {
    setLiked(!liked);
  };
  
  // Handle share button click
  const handleShare = () => {
    // TODO: Implement share functionality
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton 
                  component={Link} 
                  to="/style-playlists"
                  sx={{ mr: 2 }}
                >
                  <ArrowBackIcon />
                </IconButton>
                
                <Typography variant="h4" component="h1">
                  {playlist?.title}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<PlaylistAddIcon />}
                  component={Link}
                  to={`/style-playlists/${playlistId}/add`}
                >
                  Add Items
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ShareIcon />}
                  onClick={handleShare}
                >
                  Share
                </Button>
                {playlist?.liked ? (
                  <IconButton color="primary" onClick={handleLike}>
                    <FavoriteIcon />
                  </IconButton>
                ) : (
                  <IconButton onClick={handleLike}>
                    <FavoriteBorderIcon />
                  </IconButton>
                )}
              </Box>
            </Box>
            
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
              to="/style-playlists"
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