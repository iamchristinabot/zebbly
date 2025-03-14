import React, { useState, useEffect, useContext } from 'react';
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
import { StoreContext } from '../stores/storeContext';
import Header from '../components/Header';
import PlaylistCard from '../components/playlists/PlaylistCard';

const ProductPlaylistsPage = observer(({ isAuthenticated = true }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { productPlaylistStore } = useContext(StoreContext);
  
  // State for UI
  const [searchQuery, setSearchQuery] = useState('');
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  
  // Handle menu open
  const handleMenuOpen = (event, playlistId) => {
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
    navigate(`/product-playlists/edit/${selectedPlaylistId}`);
    handleMenuClose();
  };
  
  // Handle delete playlist
  const handleDeletePlaylist = () => {
    productPlaylistStore.deletePlaylist(selectedPlaylistId);
    handleMenuClose();
  };
  
  // Handle search change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  // Filter playlists based on search query
  const filterPlaylists = (playlists) => {
    if (!searchQuery) return playlists;
    
    return playlists.filter(playlist => 
      playlist.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      playlist.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
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
        
        {productPlaylistStore.loading ? (
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
              
              {filterPlaylists(productPlaylistStore.playlists).length > 0 ? (
                <Grid container spacing={3}>
                  {filterPlaylists(productPlaylistStore.playlists).map(playlist => (
                    <Grid item xs={12} sm={6} md={3} key={playlist.id}>
                      <PlaylistCard 
                        playlist={playlist} 
                        isUserPlaylist={true}
                        onMenuOpen={handleMenuOpen}
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
            <Box sx={{ mb: 6 }}>
              <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                Featured Playlists
              </Typography>
              
              <Grid container spacing={3}>
                {filterPlaylists(productPlaylistStore.featuredPlaylists).map(playlist => (
                  <Grid item xs={12} sm={6} md={3} key={playlist.id}>
                    <PlaylistCard playlist={playlist} />
                  </Grid>
                ))}
              </Grid>
            </Box>
            
            {/* Popular Playlists Section */}
            <Box sx={{ mb: 6 }}>
              <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                Popular Playlists
              </Typography>
              
              <Grid container spacing={3}>
                {filterPlaylists(productPlaylistStore.popularPlaylists).map(playlist => (
                  <Grid item xs={12} sm={6} md={3} key={playlist.id}>
                    <PlaylistCard playlist={playlist} />
                  </Grid>
                ))}
              </Grid>
            </Box>
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