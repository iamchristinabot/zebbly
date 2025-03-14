import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
  Grid,
  Switch,
  FormControlLabel,
  Divider,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme
} from '@mui/material';
import Header from '../components/header/Header';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const SettingsPage = ({ isAuthenticated = true }) => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  
  // Account settings state
  const [email, setEmail] = useState('jessica@example.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Profile settings state
  const [name, setName] = useState('Jessica Anderson');
  const [bio, setBio] = useState('Home decor enthusiast and DIY lover. Always on the lookout for unique finds!');
  const [avatarPreview, setAvatarPreview] = useState(null);
  
  // Notification settings state
  const [emailNotifications, setEmailNotifications] = useState({
    newFollower: true,
    productComment: true,
    productLike: false,
    weeklyDigest: true,
    productRecommendations: true
  });
  
  // Privacy settings state
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    allowTagging: true,
    showActivity: true
  });
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  
  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };
  
  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };
  
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };
  
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  
  const handleBioChange = (event) => {
    setBio(event.target.value);
  };
  
  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleNotificationChange = (setting) => (event) => {
    setEmailNotifications({
      ...emailNotifications,
      [setting]: event.target.checked
    });
  };
  
  const handlePrivacyChange = (setting) => (event) => {
    if (setting === 'profileVisibility') {
      setPrivacySettings({
        ...privacySettings,
        [setting]: event.target.value
      });
    } else {
      setPrivacySettings({
        ...privacySettings,
        [setting]: event.target.checked
      });
    }
  };
  
  const handleSaveAccount = () => {
    // In a real app, this would send the data to your backend
    console.log({
      email,
      currentPassword,
      newPassword,
      confirmPassword
    });
    
    // Show success message
    alert('Account settings saved successfully!');
  };
  
  const handleSaveProfile = () => {
    // In a real app, this would send the data to your backend
    console.log({
      name,
      bio,
      avatar: avatarPreview
    });
    
    // Show success message
    alert('Profile settings saved successfully!');
  };
  
  const handleSaveNotifications = () => {
    // In a real app, this would send the data to your backend
    console.log({
      emailNotifications
    });
    
    // Show success message
    alert('Notification settings saved successfully!');
  };
  
  const handleSavePrivacy = () => {
    // In a real app, this would send the data to your backend
    console.log({
      privacySettings
    });
    
    // Show success message
    alert('Privacy settings saved successfully!');
  };
  
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Settings
        </Typography>
        
        <Paper 
          elevation={0} 
          sx={{ 
            border: `1px solid ${theme.palette.brand.lightGray}`,
            borderRadius: 2
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="settings tabs"
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab label="Account" id="settings-tab-0" />
              <Tab label="Profile" id="settings-tab-1" />
              <Tab label="Notifications" id="settings-tab-2" />
              <Tab label="Privacy" id="settings-tab-3" />
            </Tabs>
          </Box>
          
          <Box sx={{ p: 3 }}>
            <TabPanel value={tabValue} index={0}>
              <Typography variant="h6" gutterBottom>
                Account Settings
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Change Password
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Current Password"
                    type="password"
                    value={currentPassword}
                    onChange={handleCurrentPasswordChange}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="New Password"
                    type="password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button 
                      variant="contained" 
                      color="primary"
                      onClick={handleSaveAccount}
                    >
                      Save Changes
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
            
            <TabPanel value={tabValue} index={1}>
              <Typography variant="h6" gutterBottom>
                Profile Settings
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar
                    src={avatarPreview || "https://via.placeholder.com/150"}
                    sx={{ width: 150, height: 150, mb: 2 }}
                  />
                  <Button
                    variant="outlined"
                    component="label"
                  >
                    Upload Photo
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleAvatarUpload}
                    />
                  </Button>
                </Grid>
                
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    label="Display Name"
                    value={name}
                    onChange={handleNameChange}
                    sx={{ mb: 3 }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Bio"
                    value={bio}
                    onChange={handleBioChange}
                    multiline
                    rows={4}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button 
                      variant="contained" 
                      color="primary"
                      onClick={handleSaveProfile}
                    >
                      Save Changes
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
            
            <TabPanel value={tabValue} index={2}>
              <Typography variant="h6" gutterBottom>
                Notification Settings
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Typography variant="subtitle1" gutterBottom>
                Email Notifications
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={emailNotifications.newFollower}
                        onChange={handleNotificationChange('newFollower')}
                        color="primary"
                      />
                    }
                    label="Someone follows you"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={emailNotifications.productComment}
                        onChange={handleNotificationChange('productComment')}
                        color="primary"
                      />
                    }
                    label="Someone comments on your post"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={emailNotifications.productLike}
                        onChange={handleNotificationChange('productLike')}
                        color="primary"
                      />
                    }
                    label="Someone likes your post"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={emailNotifications.weeklyDigest}
                        onChange={handleNotificationChange('weeklyDigest')}
                        color="primary"
                      />
                    }
                    label="Weekly digest of activity"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={emailNotifications.productRecommendations}
                        onChange={handleNotificationChange('productRecommendations')}
                        color="primary"
                      />
                    }
                    label="Product recommendations"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button 
                      variant="contained" 
                      color="primary"
                      onClick={handleSaveNotifications}
                    >
                      Save Changes
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
            
            <TabPanel value={tabValue} index={3}>
              <Typography variant="h6" gutterBottom>
                Privacy Settings
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="profile-visibility-label">Profile Visibility</InputLabel>
                    <Select
                      labelId="profile-visibility-label"
                      id="profile-visibility"
                      value={privacySettings.profileVisibility}
                      label="Profile Visibility"
                      onChange={handlePrivacyChange('profileVisibility')}
                    >
                      <MenuItem value="public">Public - Anyone can see your profile</MenuItem>
                      <MenuItem value="followers">Followers Only - Only people who follow you can see your profile</MenuItem>
                      <MenuItem value="private">Private - Only you can see your profile</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={privacySettings.allowTagging}
                        onChange={handlePrivacyChange('allowTagging')}
                        color="primary"
                      />
                    }
                    label="Allow others to tag you in posts"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={privacySettings.showActivity}
                        onChange={handlePrivacyChange('showActivity')}
                        color="primary"
                      />
                    }
                    label="Show your activity in feeds (likes, comments, etc.)"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button 
                      variant="contained" 
                      color="primary"
                      onClick={handleSavePrivacy}
                    >
                      Save Changes
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default SettingsPage; 