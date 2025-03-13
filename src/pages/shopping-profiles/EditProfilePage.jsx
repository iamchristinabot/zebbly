import React, { useState, useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  Breadcrumbs,
  Link as MuiLink,
  CircularProgress,
  Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { StoreContext } from '../../stores/storeContext';
import Header from '../../components/Header';
import ProfileForm from '../../components/shopping-profiles/ProfileForm';
import ProfilePreview from '../../components/shopping-profiles/ProfilePreview';

const EditProfilePage = observer(({ isAuthenticated = true }) => {
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
      
      try {
        // In a real app, this would fetch from an API
        // For now, simulate a delay and use mock data
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
        
        // Wait for a short delay to simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
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
          // Handle profile not found - don't redirect immediately
          console.error(`Profile with ID ${profileId} not found`);
          // We'll show an error message instead of redirecting
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProfile();
  }, [profileId]);
  
  // Add a separate effect for navigation that only runs when profile is null and loading is complete
  useEffect(() => {
    if (!loading && profile === null && profileId) {
      // Only redirect after loading is complete and we know the profile doesn't exist
      navigate('/shopping-profiles', { 
        replace: true,
        state: { error: `Profile with ID ${profileId} not found` }
      });
    }
  }, [loading, profile, profileId, navigate]);
  
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
            Edit Profile
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
            Edit Shopping Profile
          </Typography>
        </Box>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : profile ? (
          <Grid container spacing={4}>
            {/* Profile preview */}
            <Grid item xs={12} md={4}>
              <ProfilePreview formData={formData} />
            </Grid>
            
            {/* Edit form */}
            <Grid item xs={12} md={8}>
              <ProfileForm 
                formData={formData}
                handleInputChange={handleInputChange}
                handleSaveProfile={handleSaveProfile}
                saving={saving}
                isNewProfile={false}
              />
            </Grid>
          </Grid>
        ) : (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="error" gutterBottom>
              Profile not found
            </Typography>
            <Typography variant="body1" paragraph>
              The profile you're trying to edit doesn't exist or has been deleted.
            </Typography>
            <Button 
              variant="contained" 
              component={Link} 
              to="/shopping-profiles"
              sx={{ mt: 2 }}
            >
              Back to Profiles
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
});

export default EditProfilePage; 