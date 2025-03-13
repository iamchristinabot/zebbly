import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Divider,
  useTheme,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const ProfilePreview = ({ formData }) => {
  const theme = useTheme();
  
  return (
    <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Avatar 
            src={formData.avatar} 
            sx={{ width: 120, height: 120, mb: 2 }}
          >
            {!formData.avatar && <PersonIcon sx={{ fontSize: 60 }} />}
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
  );
};

export default ProfilePreview; 