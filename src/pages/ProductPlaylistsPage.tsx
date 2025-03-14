import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
  Menu,
  MenuItem,
  ListItemIcon,
  useTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import PlaylistCard from '../components/playlists/PlaylistCard';
import { AuthenticatedProps } from '../types/common';
import { ProductPlaylistStore } from '../stores/productPlaylistStore';
import type { Playlist, Product, PlaylistItem, User } from '../types';

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
  featured?: boolean;
  popular?: boolean;
}

const convertStoreProductToUIProduct = (storeProduct: StoreProduct): Product => ({
  id: storeProduct.id,
  name: storeProduct.name,
  description: storeProduct.description,
  price: storeProduct.price,
  images: [storeProduct.imageUrl], // Convert single image to array
  category: storeProduct.category
});

const convertStoreProductToPlaylistItem = (storeProduct: StoreProduct): PlaylistItem => ({
  id: storeProduct.id,
  productId: storeProduct.id,
  product: convertStoreProductToUIProduct(storeProduct),
  addedAt: new Date().toISOString() // Using current date as fallback
});

const convertStorePlaylistToUIPlaylist = (storePlaylist: StorePlaylist): Playlist => ({
  id: storePlaylist.id,
  title: storePlaylist.name,
  description: storePlaylist.description,
  coverImage: '', // Add default or get from store
  creator: {
    id: storePlaylist.userId,
    name: 'User', // Add default or get from store
    avatar: '' // Add default or get from store
  } as User,
  itemCount: storePlaylist.products.length,
  likes: 0, // Add default or get from store
  isPublic: storePlaylist.isPublic,
  items: storePlaylist.products.map(convertStoreProductToPlaylistItem)
});

export interface ProductPlaylistsPageProps extends AuthenticatedProps {
  productPlaylistStore: ProductPlaylistStore;
}

const ProductPlaylistsPage = observer(({ 
  isAuthenticated = true,
  productPlaylistStore
}: ProductPlaylistsPageProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  // State for UI
  const [searchQuery, setSearchQuery] = useState('');
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);
  
  // Convert store playlists to UI playlists
  const convertedPlaylists = productPlaylistStore.playlists.map(convertStorePlaylistToUIPlaylist);
  
  // Handle menu open
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, playlistId: string) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
    setSelectedPlaylistId(playlistId);
  };
  
  // Handle menu close
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedPlaylistId(null);
  };
  
  // Handle edit playlist
  const handleEditPlaylist = () => {
    if (selectedPlaylistId) {
      navigate(`/product-playlists/edit/${selectedPlaylistId}`);
      handleMenuClose();
    }
  };
  
  // Handle delete playlist
  const handleDeletePlaylist = () => {
    if (selectedPlaylistId) {
      // TODO: Implement delete functionality in store
      // productPlaylistStore.deletePlaylist(selectedPlaylistId);
      handleMenuClose();
    }
  };
  
  // Handle search change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  
  // Filter playlists based on search query
  const filterPlaylists = (playlists: Playlist[]) => {
    if (!searchQuery) return playlists;
    
    return playlists.filter(playlist => 
      playlist.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      playlist.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Get featured and popular playlists
  const featuredPlaylists = convertedPlaylists.filter(
    playlist => (productPlaylistStore.playlists.find(p => p.id === playlist.id) as StorePlaylist).featured
  );
  
  const popularPlaylists = convertedPlaylists.filter(
    playlist => (productPlaylistStore.playlists.find(p => p.id === playlist.id) as StorePlaylist).popular
  );
  
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Product Playlists
            </Typography>
            
            <Box>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                component={Link}
                to="/product-playlists/create"
              >
                Create Playlist
              </Button>
            </Box>
          </Box>
          
          <Typography variant="body1" color="text.secondary" paragraph>
            Discover curated collections of products, from specific recommendations to themed lists. Create your own playlists to share with others.
          </Typography>
          
          <TextField
            fullWidth
            placeholder="Search playlists..."
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ mb: 4 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        
        {productPlaylistStore.isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Your Playlists Section */}
            <Box sx={{ mb: 6 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" component="h2">
                  Your Playlists
                </Typography>
                <Button 
                  variant="text" 
                  component={Link} 
                  to="/product-playlists/user/me"
                >
                  See All
                </Button>
              </Box>
              
              {filterPlaylists(convertedPlaylists).length > 0 ? (
                <Grid container spacing={3}>
                  {filterPlaylists(convertedPlaylists).map((playlist) => (
                    <Grid item xs={12} sm={6} md={3} key={playlist.id}>
                      <PlaylistCard 
                        playlist={playlist} 
                        isUserPlaylist={true}
                        onMenuOpen={(event: React.MouseEvent<HTMLElement>) => handleMenuOpen(event, playlist.id)}
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 3, 
                    textAlign: 'center',
                    border: `1px solid ${theme.palette.brand.lightGray}`,
                    borderRadius: 2
                  }}
                >
                  <PlaylistAddIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    No playlists yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Create your first product playlist to organize and share your favorite items.
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="primary"
                    startIcon={<AddIcon />}
                    component={Link}
                    to="/product-playlists/create"
                  >
                    Create Playlist
                  </Button>
                </Paper>
              )}
            </Box>
            
            {/* Featured Playlists Section */}
            {featuredPlaylists.length > 0 && (
              <Box sx={{ mb: 6 }}>
                <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                  Featured Playlists
                </Typography>
                
                <Grid container spacing={3}>
                  {filterPlaylists(featuredPlaylists).map((playlist) => (
                    <Grid item xs={12} sm={6} md={3} key={playlist.id}>
                      <PlaylistCard 
                        playlist={playlist}
                        onMenuOpen={(event: React.MouseEvent<HTMLElement>) => handleMenuOpen(event, playlist.id)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
            
            {/* Popular Playlists Section */}
            {popularPlaylists.length > 0 && (
              <Box sx={{ mb: 6 }}>
                <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                  Popular Playlists
                </Typography>
                
                <Grid container spacing={3}>
                  {filterPlaylists(popularPlaylists).map((playlist) => (
                    <Grid item xs={12} sm={6} md={3} key={playlist.id}>
                      <PlaylistCard 
                        playlist={playlist}
                        onMenuOpen={(event: React.MouseEvent<HTMLElement>) => handleMenuOpen(event, playlist.id)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </>
        )}
        
        {/* Playlist menu */}
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEditPlaylist}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            Edit Playlist
          </MenuItem>
          <MenuItem onClick={handleDeletePlaylist}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            Delete Playlist
          </MenuItem>
        </Menu>
      </Container>
    </>
  );
});

export default ProductPlaylistsPage; 