import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Link as MuiLink,
  Paper,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { StoreContext } from '../stores/storeContext';

const EditShoppingProfilePage = observer(({ isAuthenticated = true }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { profileId } = useParams();
  const { shoppingProfileStore } = useContext(StoreContext);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    relationship: 'self',
    age: '',
    gender: '',
    bio: '',
    interests: '',
    stylePreferences: '',
    favoriteColors: '',
    favoriteCategories: '',
    favoriteStores: '',
    sizingInfo: '',
    avatar: null
  });
  
  // Load profile data
  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      
      // In a real app, this would fetch from an API
      // For now, simulate a delay and use mock data
      setTimeout(() => {
        // Find the profile by ID
        const mockProfiles = [
          {
            id: 'profile1',
            name: 'My Style',
            relationship: 'self',
            age: 32,
            gender: 'Female',
            bio: 'This is my personal shopping profile for everyday items and fashion.',
            interests: ['Minimalist design', 'Sustainable fashion', 'Outdoor activities'],
            stylePreferences: ['Casual chic', 'Business casual', 'Athleisure'],
            favoriteColors: ['Navy', 'Beige', 'Olive green'],
            favoriteCategories: ['Clothing', 'Home decor', 'Accessories'],
            favoriteStores: ['Amazon', 'Target', 'Nordstrom'],
            sizingInfo: 'Clothing size M, Shoe size 8, Prefers loose fit',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            isDefault: true
          },
          {
            id: 'profile2',
            name: 'Michael (Husband)',
            relationship: 'spouse',
            age: 34,
            gender: 'Male',
            bio: 'My husband who loves tech gadgets and outdoor gear.',
            interests: ['Technology', 'Hiking', 'Cooking'],
            stylePreferences: ['Casual', 'Sporty', 'Classic'],
            favoriteColors: ['Blue', 'Gray', 'Black'],
            favoriteCategories: ['Electronics', 'Outdoor gear', 'Kitchen gadgets'],
            favoriteStores: ['Home Depot', 'Etsy'],
            sizingInfo: 'Clothing size L, Shoe size 10, Prefers slim fit',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            isDefault: false
          },
          {
            id: 'profile3',
            name: 'Emma (Daughter)',
            relationship: 'child',
            age: 7,
            gender: 'Female',
            bio: 'My daughter who loves colorful clothes and toys.',
            interests: ['Art', 'Animals', 'Reading'],
            stylePreferences: ['Colorful', 'Comfortable', 'Fun'],
            favoriteColors: ['Pink', 'Purple', 'Yellow'],
            favoriteCategories: ['Toys', 'Books', 'Clothing'],
            favoriteStores: ['Amazon', 'Etsy'],
            sizingInfo: 'Clothing size 12, Shoe size 1, Prefers stretchy fabric',
            avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
            isDefault: false
          }
        ];
        
        const foundProfile = mockProfiles.find(p => p.id === profileId);
        
        if (foundProfile) {
          setProfile(foundProfile);
          setFormData({
            name: foundProfile.name,
            relationship: foundProfile.relationship,
            age: foundProfile.age,
            gender: foundProfile.gender,
            bio: foundProfile.bio || '',
            interests: foundProfile.interests.join(', '),
            stylePreferences: foundProfile.stylePreferences.join(', '),
            favoriteColors: foundProfile.favoriteColors.join(', '),
            favoriteCategories: foundProfile.favoriteCategories.join(', '),
            favoriteStores: foundProfile.favoriteStores?.join(', ') || '',
            sizingInfo: foundProfile.sizingInfo || '',
            avatar: foundProfile.avatar
          });
        } else {
          // Handle profile not found
          navigate('/shopping-profiles');
        }
        
        setLoading(false);
      }, 500);
    };
    
    loadProfile();
  }, [profileId, navigate]);
  
  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle save profile
  const handleSaveProfile = () => {
    setSaving(true);
    
    // Simulate API call to update profile
    setTimeout(() => {
      // In a real app, this would update the profile via API
      // For now, just navigate back to profiles page
      setSaving(false);
      navigate('/shopping-profiles');
    }, 1000);
  };
  
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Page header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <IconButton 
            component={Link} 
            to="/shopping-profiles"
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          
          <Typography variant="h4" component="h1">
            Edit Shopping Profile
          </Typography>
        </Box>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {/* Profile preview card */}
            <Grid item xs={12} md={4}>
              <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                    <Avatar 
                      src={formData.avatar} 
                      sx={{ width: 120, height: 120, mb: 2 }}
                    />
                    <Typography variant="h5" gutterBottom>
                      {formData.name}
                    </Typography>
                    <Chip 
                      label={
                        formData.relationship === 'self' ? 'Self' :
                        formData.relationship === 'spouse' ? 'Spouse/Partner' :
                        formData.relationship === 'child' ? 'Child' :
                        formData.relationship === 'parent' ? 'Parent' :
                        formData.relationship === 'friend' ? 'Friend' : 'Other'
                      }
                      color="primary"
                      size="small"
                    />
                  </Box>
                  
                  <Divider sx={{ mb: 2 }} />
                  
                  <Typography variant="body2" paragraph>
                    {formData.bio || 'No description provided.'}
                  </Typography>
                  
                  <Typography variant="subtitle2" gutterBottom>
                    Style Preferences
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {formData.stylePreferences.split(',').map((style, index) => (
                      <Chip key={index} label={style.trim()} size="small" />
                    ))}
                  </Box>
                  
                  <Typography variant="subtitle2" gutterBottom>
                    Favorite Colors
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {formData.favoriteColors.split(',').map((color, index) => (
                      <Chip key={index} label={color.trim()} size="small" variant="outlined" />
                    ))}
                  </Box>
                  
                  <Typography variant="subtitle2" gutterBottom>
                    Favorite Stores
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {formData.favoriteStores.split(',').filter(store => store.trim()).map((store, index) => (
                      <Chip key={index} label={store.trim()} size="small" variant="outlined" />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Edit form */}
            <Grid item xs={12} md={8}>
              <Paper elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, p: 3 }}>
                
                <Grid container spacing={3}>
                  {/* Basic information section */}
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" color="primary" fontWeight="medium" gutterBottom>
                      Basic Information
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      name="name"
                      label="Profile Name"
                      fullWidth
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="relationship"
                      label="Relationship"
                      select
                      fullWidth
                      value={formData.relationship}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="self">Self</MenuItem>
                      <MenuItem value="spouse">Spouse/Partner</MenuItem>
                      <MenuItem value="child">Child</MenuItem>
                      <MenuItem value="parent">Parent</MenuItem>
                      <MenuItem value="friend">Friend</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </TextField>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="age"
                      label="Age"
                      type="number"
                      fullWidth
                      value={formData.age}
                      onChange={handleInputChange}
                      inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                        onWheel: (e) => e.target.blur()
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      name="gender"
                      label="Gender"
                      select
                      fullWidth
                      value={formData.gender}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Non-binary">Non-binary</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </TextField>
                  </Grid>
                  
                  {/* Description section with more spacing */}
                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" color="primary" fontWeight="medium" gutterBottom sx={{ mt: 2 }}>
                      Description
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      name="bio"
                      label="About this person (freeform)"
                      fullWidth
                      multiline
                      rows={4}
                      value={formData.bio}
                      onChange={handleInputChange}
                      helperText="Describe this person in your own words. Include any details that might help with recommendations."
                    />
                  </Grid>
                  
                  {/* Style & Preferences section with more spacing */}
                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" color="primary" fontWeight="medium" gutterBottom sx={{ mt: 2 }}>
                      Style & Preferences
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      name="interests"
                      label="Interests (comma separated)"
                      fullWidth
                      multiline
                      rows={2}
                      value={formData.interests}
                      onChange={handleInputChange}
                      helperText="E.g., Technology, Hiking, Cooking"
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      name="stylePreferences"
                      label="Style Preferences (comma separated)"
                      fullWidth
                      multiline
                      rows={2}
                      value={formData.stylePreferences}
                      onChange={handleInputChange}
                      helperText="E.g., Casual, Sporty, Classic"
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" color="primary" fontWeight="medium" gutterBottom sx={{ mt: 2 }}>
                      Shopping Preferences
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      name="favoriteStores"
                      label="Favorite Stores (comma separated)"
                      fullWidth
                      multiline
                      rows={2}
                      value={formData.favoriteStores}
                      onChange={handleInputChange}
                      helperText="E.g., Amazon, Target, Nordstrom, Etsy, Home Depot"
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      name="sizingInfo"
                      label="Sizing Information"
                      fullWidth
                      multiline
                      rows={2}
                      value={formData.sizingInfo}
                      onChange={handleInputChange}
                      helperText="E.g., Clothing size M, Shoe size 8, Prefers loose fit"
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="favoriteCategories"
                      label="Favorite Categories (comma separated)"
                      fullWidth
                      value={formData.favoriteCategories}
                      onChange={handleInputChange}
                      helperText="E.g., Electronics, Clothing, Books"
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="favoriteColors"
                      label="Favorite Colors (comma separated)"
                      fullWidth
                      value={formData.favoriteColors}
                      onChange={handleInputChange}
                      helperText="E.g., Blue, Gray, Black"
                    />
                  </Grid>
                </Grid>
                
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button 
                    component={Link}
                    to="/shopping-profiles"
                    sx={{ mr: 2 }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="contained" 
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveProfile}
                    disabled={saving || !formData.name}
                  >
                    {saving ? 'Saving...' : 'Save Profile'}
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
});

export default EditShoppingProfilePage; 