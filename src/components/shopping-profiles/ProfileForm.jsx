import React from 'react';
import {
  Grid,
  TextField,
  MenuItem,
  Divider,
  Typography,
  Box,
  Button,
  Paper,
  useTheme,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { Link } from 'react-router-dom';

const ProfileForm = ({ 
  formData, 
  handleInputChange, 
  handleSaveProfile, 
  saving, 
  isNewProfile = false 
}) => {
  const theme = useTheme();
  
  return (
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
          {saving ? (isNewProfile ? 'Creating...' : 'Saving...') : (isNewProfile ? 'Create Profile' : 'Save Profile')}
        </Button>
      </Box>
    </Paper>
  );
};

export default ProfileForm; 