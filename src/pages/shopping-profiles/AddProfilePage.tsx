import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  Breadcrumbs,
  Link as MuiLink,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import ProfileForm from '../../components/shopping-profiles/ProfileForm';
import ProfilePreview from '../../components/shopping-profiles/ProfilePreview';

import { useStores } from '../../hooks/useStores';

interface AddProfilePageProps {
  isAuthenticated: boolean;
}

const AddProfilePage = observer(({ isAuthenticated = true }: AddProfilePageProps) => {
  const navigate = useNavigate();
  const { shoppingProfileStore } = useStores();
  
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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setSaving(false);
      navigate('/shopping-profiles');
    }, 1000);
  };
  
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Breadcrumbs navigation */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <MuiLink component={Link} to="/" color="inherit">
            Home
          </MuiLink>
          <MuiLink component={Link} to="/shopping-profiles" color="inherit">
            Shopping Profiles
          </MuiLink>
          <Typography color="text.primary" variant="body2" sx={{ fontSize: '0.85rem' }}>
            Add New Profile
          </Typography>
        </Breadcrumbs>
        
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
          {/* Profile preview */}
          <Grid item xs={12} md={4}>
            <ProfilePreview formData={formData} />
          </Grid>
          
          {/* Add form */}
          <Grid item xs={12} md={8}>
            <ProfileForm 
              formData={formData}
              handleInputChange={handleInputChange}
              handleSaveProfile={handleSaveProfile}
              saving={saving}
              isNewProfile={true}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
});

export default AddProfilePage; 