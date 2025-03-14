import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Paper
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import ProductSearch from '../components/playlists/ProductSearch';
import { AuthenticatedProps } from '../types/common';
import { ProductPlaylistStore } from '../stores/productPlaylistStore';
import type { Product } from '../types';

export interface AddToPlaylistPageProps extends AuthenticatedProps {
  productPlaylistStore: ProductPlaylistStore;
}

const AddToPlaylistPage = observer(({ 
  isAuthenticated = true,
  productPlaylistStore 
}: AddToPlaylistPageProps) => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlaylist = async () => {
      try {
        if (!playlistId) {
          throw new Error('Playlist ID is required');
        }
        await productPlaylistStore.loadPlaylist(playlistId);
        // Initialize selected products with existing playlist items
        const existingProductIds = productPlaylistStore.currentPlaylist?.products.map(p => p.id) || [];
        setSelectedProducts(new Set(existingProductIds));
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load playlist');
        setIsLoading(false);
      }
    };

    loadPlaylist();
  }, [playlistId, productPlaylistStore]);

  const handleProductSelect = (product: Product) => {
    const newSelectedProducts = new Set(selectedProducts);
    if (newSelectedProducts.has(product.id)) {
      newSelectedProducts.delete(product.id);
    } else {
      newSelectedProducts.add(product.id);
    }
    setSelectedProducts(newSelectedProducts);
  };

  const handleSave = async () => {
    try {
      if (!playlistId) {
        throw new Error('Playlist ID is required');
      }
      
      // Update playlist with selected products
      await productPlaylistStore.updatePlaylistProducts(playlistId, Array.from(selectedProducts));
      
      // Navigate back to playlist detail page
      navigate(`/playlists/${playlistId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update playlist');
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Header isAuthenticated={isAuthenticated} />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1">
            Add Items to Playlist
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={selectedProducts.size === 0}
          >
            Save Changes
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Paper sx={{ p: 3 }}>
          <ProductSearch
            onProductSelect={handleProductSelect}
            selectedProducts={selectedProducts}
          />
        </Paper>
      </Container>
    </Box>
  );
});

export default AddToPlaylistPage; 