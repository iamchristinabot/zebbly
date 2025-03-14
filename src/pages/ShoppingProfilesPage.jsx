import React, { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Avatar,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Menu,
  MenuItem,
  Tooltip,
  CircularProgress,
  useTheme,
  ListItemIcon,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonIcon from "@mui/icons-material/Person";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import StyleIcon from "@mui/icons-material/Style";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../stores/storeContext";
import Header from "../components/Header";

const ShoppingProfilesPage = observer(({ isAuthenticated = true }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { userStore, shoppingProfileStore } = useContext(StoreContext);

  // State for UI
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Local state for profiles if store is undefined
  const [localProfiles, setLocalProfiles] = useState([]);

  // AI prompt state
  const [aiPrompt, setAiPrompt] = useState("");

  // Load profiles on component mount
  useEffect(() => {
    if (shoppingProfileStore) {
      console.log("Using shoppingProfileStore");
      shoppingProfileStore.loadProfiles().finally(() => setLoading(false));
    } else {
      console.log("shoppingProfileStore is undefined, using mock data");
      // Mock data for when store is undefined
      setTimeout(() => {
        setLocalProfiles([
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
            avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
            isDefault: false
          }
        ]);
        setLoading(false);
      }, 1000);
    }
  }, [shoppingProfileStore]);

  // Use either store profiles or local profiles
  const profiles = shoppingProfileStore?.profiles || localProfiles;

  // Handle menu open
  const handleMenuOpen = (event, profileId) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedProfileId(profileId);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedProfileId(null);
  };

  // Handle edit profile
  const handleEditProfile = () => {
    handleMenuClose();
    navigate(`/shopping-profiles/edit/${selectedProfileId}`);
  };

  // Handle delete profile
  const handleDeleteProfile = () => {
    if (shoppingProfileStore) {
      shoppingProfileStore.deleteProfile(selectedProfileId);
    } else {
      setLocalProfiles(localProfiles.filter(p => p.id !== selectedProfileId));
    }
    handleMenuClose();
  };

  // Handle set as default profile
  const handleSetAsDefault = () => {
    if (shoppingProfileStore) {
      shoppingProfileStore.setDefaultProfile(selectedProfileId);
    } else {
      setLocalProfiles(localProfiles.map(p => ({
        ...p,
        isDefault: p.id === selectedProfileId
      })));
    }
    handleMenuClose();
  };

  // Handle AI dialog open
  const handleAiDialogOpen = () => {
    setAiPrompt("");
    setAiDialogOpen(true);
  };

  // Handle AI prompt change
  const handleAiPromptChange = (e) => {
    setAiPrompt(e.target.value);
  };

  // Handle AI profile generation
  const handleAiProfileGeneration = () => {
    setAiGenerating(true);

    // Simulate AI profile generation
    setTimeout(() => {
      // Generate profile based on AI prompt
      const aiGeneratedProfile = {
        name: aiPrompt.includes("husband")
          ? "David (Husband)"
          : aiPrompt.includes("daughter")
          ? "Lily (Daughter)"
          : aiPrompt.includes("son")
          ? "Ethan (Son)"
          : "New AI Profile",
        relationship:
          aiPrompt.includes("husband") || aiPrompt.includes("wife")
            ? "spouse"
            : aiPrompt.includes("daughter") || aiPrompt.includes("son")
            ? "child"
            : aiPrompt.includes("mother") || aiPrompt.includes("father")
            ? "parent"
            : "other",
        age:
          aiPrompt.includes("husband") || aiPrompt.includes("wife")
            ? 35
            : aiPrompt.includes("daughter") || aiPrompt.includes("son")
            ? 10
            : aiPrompt.includes("mother") || aiPrompt.includes("father")
            ? 65
            : 30,
        gender:
          aiPrompt.includes("husband") ||
          aiPrompt.includes("son") ||
          aiPrompt.includes("father")
            ? "Male"
            : "Female",
        bio: aiPrompt,
        interests: aiPrompt.includes("tech")
          ? ["Technology", "Gadgets", "Smart home"]
          : aiPrompt.includes("fashion")
          ? ["Fashion", "Style", "Trends"]
          : aiPrompt.includes("sport")
          ? ["Sports", "Fitness", "Outdoor activities"]
          : ["Reading", "Movies", "Travel"],
        stylePreferences: aiPrompt.includes("casual")
          ? ["Casual", "Comfortable", "Relaxed"]
          : aiPrompt.includes("formal")
          ? ["Formal", "Business", "Elegant"]
          : aiPrompt.includes("sport")
          ? ["Athletic", "Sporty", "Active"]
          : ["Modern", "Classic", "Versatile"],
        favoriteColors: aiPrompt.includes("blue")
          ? ["Blue", "Navy", "Teal"]
          : aiPrompt.includes("red")
          ? ["Red", "Burgundy", "Coral"]
          : aiPrompt.includes("green")
          ? ["Green", "Olive", "Mint"]
          : ["Black", "Gray", "White"],
        favoriteCategories: aiPrompt.includes("tech")
          ? ["Electronics", "Gadgets", "Smart home"]
          : aiPrompt.includes("fashion")
          ? ["Clothing", "Accessories", "Shoes"]
          : aiPrompt.includes("sport")
          ? ["Sportswear", "Equipment", "Outdoor gear"]
          : ["Books", "Home decor", "Kitchen"],
        avatar: `https://randomuser.me/api/portraits/${
          aiPrompt.includes("husband") ||
          aiPrompt.includes("son") ||
          aiPrompt.includes("father")
            ? "men"
            : "women"
        }/${Math.floor(Math.random() * 100)}.jpg`,
        isDefault: shoppingProfileStore.profiles.length === 0,
      };

      setAiGenerating(false);
      setAiDialogOpen(false);
      navigate(`/shopping-profiles/add?aiProfile=${JSON.stringify(aiGeneratedProfile)}`);
    }, 2000);
  };

  // Get relationship icon
  const getRelationshipIcon = (relationship) => {
    switch (relationship) {
      case "self":
        return <PersonIcon />;
      case "spouse":
        return <FamilyRestroomIcon />;
      case "child":
        return <ChildCareIcon />;
      default:
        return <PersonIcon />;
    }
  };

  // Navigate to style twins for a specific profile
  const navigateToStyleTwins = (profileId) => {
    navigate(`/style-twins/${profileId}`);
  };

  return (
    <>
      <Header isAuthenticated={isAuthenticated} />

      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Shopping Profiles
          </Typography>

          <Box>
            <Button
              variant="outlined"
              startIcon={<SmartToyIcon />}
              onClick={handleAiDialogOpen}
              sx={{ mr: 2 }}
            >
              AI Create
            </Button>

            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => navigate('/shopping-profiles/add')}
              sx={{ mr: 2 }}
            >
              Create Profile
            </Button>
          </Box>
        </Box>

        <Typography variant="body1" color="text.secondary" paragraph>
          Create and manage shopping profiles for yourself and others. Find
          style twins and get personalized recommendations for each profile.
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {profiles.map((profile) => (
              <Grid item xs={12} sm={6} md={3} key={profile.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    border: profile.isDefault
                      ? `2px solid ${theme.palette.primary.main}`
                      : "none",
                  }}
                >
                  {profile.isDefault && (
                    <Chip
                      label="Default"
                      color="primary"
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        zIndex: 1,
                      }}
                    />
                  )}

                  <CardMedia
                    component="img"
                    height="140"
                    image={profile.avatar}
                    alt={profile.name}
                    sx={{ objectFit: "cover" }}
                  />

                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    {profile.bio && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        paragraph
                      >
                        {profile.bio}
                      </Typography>
                    )}

                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Avatar
                        sx={{ bgcolor: theme.palette.primary.light, mr: 1 }}
                      >
                        {getRelationshipIcon(profile.relationship)}
                      </Avatar>
                      <Typography variant="h6" component="div">
                        {profile.name}
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {profile.age} years old • {profile.gender}
                    </Typography>

                    <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                      Interests
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                        mb: 1,
                      }}
                    >
                      {profile.interests.slice(0, 3).map((interest, index) => (
                        <Chip key={index} label={interest} size="small" />
                      ))}
                      {profile.interests.length > 3 && (
                        <Chip
                          label={`+${profile.interests.length - 3}`}
                          size="small"
                          variant="outlined"
                        />
                      )}
                    </Box>

                    <Typography variant="subtitle2" gutterBottom sx={{ mt: 1 }}>
                      Style Preferences
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {profile.stylePreferences
                        .slice(0, 3)
                        .map((style, index) => (
                          <Chip
                            key={index}
                            label={style}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      {profile.stylePreferences.length > 3 && (
                        <Chip
                          label={`+${profile.stylePreferences.length - 3}`}
                          size="small"
                          variant="outlined"
                        />
                      )}
                    </Box>
                  </CardContent>

                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<StyleIcon />}
                      onClick={() => navigateToStyleTwins(profile.id)}
                      sx={{ mr: 1 }}
                    >
                      Find Twins
                    </Button>

                    <Box sx={{ flexGrow: 1 }} />

                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, profile.id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
            {profiles.length === 0 && (
              <Typography>No profiles available</Typography>
            )}
          </Grid>
        )}

        {/* Profile menu */}
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEditProfile}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Edit Profile" />
          </MenuItem>

          {selectedProfileId &&
            !profiles.find((p) => p.id === selectedProfileId)?.isDefault && (
              <MenuItem onClick={handleSetAsDefault}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Set as Default" />
              </MenuItem>
            )}

          {profiles.length > 1 && (
            <MenuItem onClick={handleDeleteProfile}>
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Delete Profile" />
            </MenuItem>
          )}
        </Menu>

        {/* AI profile generation dialog */}
        <Dialog
          open={aiDialogOpen}
          onClose={() => setAiDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <SmartToyIcon sx={{ mr: 1 }} />
              AI Profile Creation
            </Box>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" paragraph>
              Describe the person you want to create a shopping profile for, and
              our AI will generate a profile based on your description.
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={4}
              value={aiPrompt}
              onChange={handleAiPromptChange}
              placeholder="E.g., My husband who is 35 years old and loves tech gadgets, casual style, and the color blue. He enjoys hiking and cooking on weekends."
              sx={{ mt: 2 }}
            />

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Example prompts:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="My 7-year-old daughter who loves pink, unicorns, and art. She's into comfortable clothes and enjoys reading." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="My teenage son who is into sports, video games, and tech. He prefers casual sporty clothes and the color red." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="My mother who is 65, loves gardening and cooking. She prefers classic styles and comfortable shoes." />
                </ListItem>
              </List>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAiDialogOpen(false)}>Cancel</Button>
            <Button
              variant="contained"
              startIcon={
                aiGenerating ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <AutoAwesomeIcon />
                )
              }
              onClick={handleAiProfileGeneration}
              disabled={!aiPrompt.trim() || aiGenerating}
            >
              {aiGenerating ? "Generating..." : "Generate Profile"}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
});

export default ShoppingProfilesPage;
