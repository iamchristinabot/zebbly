import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  InputAdornment,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageTitle from 'src/components/elements/PageTitle';
import Header from '../components/header/Header';
import CategoryTiles from '../components/playlists/CategoryTiles';
import PlaylistCard from '../components/playlists/PlaylistCard';
import { playlistCategories } from '../config/categories';
import { ProductPlaylistStore } from '../stores/productPlaylistStore';
import type { Playlist, PlaylistItem, Product, User } from '../types';
import { AuthenticatedProps } from '../types/common';

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
  coverImage?: string;
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
  coverImage: storePlaylist.coverImage || storePlaylist.products[0]?.imageUrl || 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop&q=60',
  creator: {
    id: storePlaylist.userId,
    name: 'User',
    avatar: 'https://i.pravatar.cc/150?u=' + storePlaylist.userId
  } as User,
  itemCount: storePlaylist.products.length,
  likes: 0,
  isPublic: storePlaylist.isPublic,
  items: storePlaylist.products.map(convertStoreProductToPlaylistItem),
  profileTypes: []
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
  const convertedPlaylists = (productPlaylistStore.filteredPlaylists as unknown as StorePlaylist[]).map(convertStorePlaylistToUIPlaylist);
  
  // Handle category selection
  const handleCategorySelect = (categoryId: string) => {
    if (productPlaylistStore.selectedCategory === categoryId) {
      productPlaylistStore.setSelectedCategory(null);
    } else {
      productPlaylistStore.setSelectedCategory(categoryId);
    }
  };
  
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
      navigate(`/style-playlists/edit/${selectedPlaylistId}`);
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
    playlist => {
      const storePlaylist = productPlaylistStore.playlists.find(p => p.id === playlist.id) as unknown as StorePlaylist;
      return storePlaylist?.featured || false;
    }
  );
  
  const popularPlaylists = convertedPlaylists.filter(
    playlist => {
      const storePlaylist = productPlaylistStore.playlists.find(p => p.id === playlist.id) as unknown as StorePlaylist;
      return storePlaylist?.popular || false;
    }
  );
  
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <PageTitle title="Style Playlists" />
            
            <Box>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                component={Link}
                to="/style-playlists/create"
              >
                Create Playlist
              </Button>
            </Box>
          </Box>
          
          <Typography variant="body1" color="text.secondary" paragraph>
            Discover curated collections of products, from specific recommendations to themed lists. Create your own playlists to share with others.
          </Typography>
        </Box>

        {/* Category tiles */}
        <CategoryTiles
          categories={playlistCategories}
          selectedCategory={productPlaylistStore.selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
        
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
                  to="/style-playlists/user/me"
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
                    Create your first style playlist to organize and share your favorite items.
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="primary"
                    startIcon={<AddIcon />}
                    component={Link}
                    to="/style-playlists/create"
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