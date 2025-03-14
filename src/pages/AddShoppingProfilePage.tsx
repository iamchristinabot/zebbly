import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
  Paper,
  Divider,
  Avatar,
  IconButton,
  Breadcrumbs,
  Link as MuiLink,
  useTheme,
  Card,
  CardContent,
  Chip,
  CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../stores/storeContext';
import Header from '../components/header/Header';

const AddShoppingProfilePage = observer(({ isAuthenticated = true }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { shoppingProfileStore } = useContext(StoreContext);
  
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    relationship: 'self',
    age: '',
    gender: 'Female',
    bio: '',
    interests: '',
    stylePreferences: '',
    favoriteColors: '',
    favoriteCategories: '',
    favoriteStores: '',
    sizingInfo: '',
    avatar: null
  });
  
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
    
    // Simulate API call to create profile
    setTimeout(() => {
      // In a real app, this would create the profile via API
      // For now, just navigate back to profiles page
      setSaving(false);
      navigate('/shopping-profiles');
    }, 1000);
  };
  
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>        
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
            Create New Shopping Profile
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {/* Profile preview card */}
          <Grid item xs={12} md={4}>
            <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                  <Avatar 
                    src={formData.avatar} 
                    sx={{ width: 120, height: 120, mb: 2 }}
                  >
                    <PersonIcon sx={{ fontSize: 60 }} />
                  </Avatar>
                  <Typography variant="h5" gutterBottom>
                    {formData.name || 'New Profile'}
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
                  {formData.stylePreferences.split(',').filter(style => style.trim()).map((style, index) => (
                    <Chip key={index} label={style.trim()} size="small" />
                  ))}
                </Box>
                
                <Typography variant="subtitle2" gutterBottom>
                  Favorite Colors
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {formData.favoriteColors.split(',').filter(color => color.trim()).map((color, index) => (
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
          
          {/* Add form */}
          <Grid item xs={12} md={8}>
            <Paper elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Profile Details
              </Typography>
              
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
                
                {/* Shopping Preferences section */}
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
                  {saving ? 'Creating...' : 'Create Profile'}
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
});

export default AddShoppingProfilePage; 