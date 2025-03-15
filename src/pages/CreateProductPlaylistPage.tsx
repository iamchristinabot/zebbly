import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Switch,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import { ProductPlaylistStore } from '../stores/productPlaylistStore';
import { AuthenticatedProps } from '../types/common';
import PageTitle from 'src/components/elements/PageTitle';

interface FormErrors {
  title?: string;
  description?: string;
  submit?: string;
}

export interface CreateProductPlaylistPageProps extends AuthenticatedProps {
  productPlaylistStore: ProductPlaylistStore;
}

interface CreatePlaylistData {
  userId: string;
  name: string;
  description: string;
  products: any[];
  isPublic: boolean;
}

const CreateProductPlaylistPage = observer(({ 
  isAuthenticated = true,
  productPlaylistStore 
}: CreateProductPlaylistPageProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  
  // Handle cover image selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setCoverImage(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (!e.target) return;
        setCoverImagePreview(e.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const playlistData: CreatePlaylistData = {
        userId: 'me', // This should come from your auth system
        name: title,
        description,
        products: [],
        isPublic
      };
      
      await productPlaylistStore.createPlaylist(playlistData);
      navigate('/style-playlists');
    } catch (error) {
      console.error('Error creating playlist:', error);
      setErrors({ submit: 'Failed to create playlist. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = () => {
    const input = document.getElementById('cover-image-input') as HTMLInputElement | null;
    input?.click();
  };
  
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            component={Link}
            to="/style-playlists"
            sx={{ mb: 2 }}
          >
            Back to Playlists
          </Button>
          
          <PageTitle title="Create New Playlist" gutterBottom />
          
          <Typography variant="body1" color="text.secondary" paragraph>
            Create a new style playlist to organize and share your favorite items.
          </Typography>
        </Box>
        
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            border: `1px solid ${theme.palette.brand.lightGray}`,
            borderRadius: 2
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Cover Image */}
              <Grid item xs={12} md={4}>
                <Box 
                  sx={{ 
                    width: '100%',
                    aspectRatio: '1/1',
                    backgroundColor: theme.palette.brand.lightGray,
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'pointer',
                    '&:hover': {
                      opacity: 0.9
                    }
                  }}
                  onClick={handleImageClick}
                >
                  {coverImagePreview ? (
                    <Box 
                      component="img"
                      src={coverImagePreview}
                      alt="Playlist cover"
                      sx={{ 
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <>
                      <AddPhotoAlternateIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                      <Typography variant="body2" color="text.secondary" align="center">
                        Click to add a cover image
                      </Typography>
                    </>
                  )}
                  
                  <input
                    id="cover-image-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </Box>
              </Grid>
              
              {/* Form Fields */}
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Playlist Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  error={!!errors.title}
                  helperText={errors.title}
                  sx={{ mb: 3 }}
                  required
                />
                
                <TextField
                  fullWidth
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  error={!!errors.description}
                  helperText={errors.description}
                  multiline
                  rows={4}
                  sx={{ mb: 3 }}
                  required
                />
                
                <FormControlLabel
                  control={
                    <Switch 
                      checked={isPublic} 
                      onChange={(e) => setIsPublic(e.target.checked)} 
                    />
                  }
                  label="Make this playlist public"
                />
                
                {errors.submit && (
                  <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                    {errors.submit}
                  </Typography>
                )}
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                component={Link}
                to="/style-playlists"
                sx={{ mr: 2 }}
              >
                Cancel
              </Button>
              
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Create Playlist'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </>
  );
});

export default CreateProductPlaylistPage; 