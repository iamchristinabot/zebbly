import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
  useTheme,
  Breadcrumbs,
  Link as MuiLink,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Header from '../components/Header';
import PlaylistCard from '../components/playlists/PlaylistCard';
import { playlistCategories } from '../config/categories';
import { AuthenticatedProps } from '../types/common';
import { ProductPlaylistStore } from '../stores/productPlaylistStore';

export interface CategoryPlaylistsPageProps extends AuthenticatedProps {
  productPlaylistStore: ProductPlaylistStore;
}

const CategoryPlaylistsPage = observer(({ 
  isAuthenticated = true,
  productPlaylistStore
}: CategoryPlaylistsPageProps) => {
  const theme = useTheme();
  const { categoryId } = useParams<{ categoryId: string }>();
  
  // Find the category details
  const category = playlistCategories.find(cat => cat.id === categoryId);
  
  // Set the selected category in the store when the component mounts
  React.useEffect(() => {
    if (categoryId) {
      productPlaylistStore.setSelectedCategory(categoryId);
    }
    
    // Clear the selected category when unmounting
    return () => {
      productPlaylistStore.setSelectedCategory(null);
    };
  }, [categoryId, productPlaylistStore]);

  if (!category) {
    return (
      <>
        <Header isAuthenticated={isAuthenticated} />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h4">Category not found</Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />} 
          aria-label="breadcrumb"
          sx={{ mb: 3 }}
        >
          <MuiLink
            component={Link}
            to="/product-playlists"
            color="inherit"
            sx={{
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            All Playlists
          </MuiLink>
          <Typography 
            color="text.primary" 
            variant="body2"
            sx={{ 
              fontWeight: 500,
            }}
          >
            {category.name}
          </Typography>
        </Breadcrumbs>

        <Box sx={{ mb: 4 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 2,
              gap: 2
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.palette.mode === 'light' 
                  ? `${category.color}20` 
                  : `${category.color}40`,
                color: category.color,
              }}
            >
              <category.icon />
            </Box>
            <Typography variant="h4" component="h1">
              {category.name} Playlists
            </Typography>
          </Box>
          
          <Typography variant="body1" color="text.secondary" paragraph>
            {category.description}
          </Typography>
        </Box>

        {productPlaylistStore.isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {productPlaylistStore.filteredPlaylists.map((playlist) => (
              <Grid item xs={12} sm={6} md={3} key={playlist.id}>
                <PlaylistCard 
                  playlist={{
                    id: playlist.id,
                    title: playlist.name,
                    description: playlist.description,
                    coverImage: playlist.products[0]?.images[0] || 'https://images.unsplash.com/photo-1472851294608-062f824d29cc',
                    creator: {
                      id: playlist.userId,
                      name: 'User',
                      avatar: `https://i.pravatar.cc/150?u=${playlist.userId}`
                    },
                    itemCount: playlist.products.length,
                    likes: 0,
                    isPublic: playlist.isPublic,
                    items: playlist.products.map(product => ({
                      id: product.id,
                      productId: product.id,
                      product: product,
                      addedAt: new Date().toISOString()
                    }))
                  }}
                />
              </Grid>
            ))}
          </Grid>
        )}
        
        {productPlaylistStore.filteredPlaylists.length === 0 && !productPlaylistStore.isLoading && (
          <Box 
            sx={{ 
              textAlign: 'center',
              py: 8,
              px: 2,
              bgcolor: 'background.paper',
              borderRadius: 2,
              border: 1,
              borderColor: 'divider'
            }}
          >
            <Typography variant="h6" gutterBottom>
              No playlists found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              There are no playlists in this category yet.
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
});

export default CategoryPlaylistsPage; 