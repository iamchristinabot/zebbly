import AddIcon from "@mui/icons-material/Add";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonIcon from "@mui/icons-material/Person";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import StyleIcon from "@mui/icons-material/Style";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { StoreContext } from "../stores/storeContext";

const ShoppingProfilesPage = observer(({ isAuthenticated = true }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { userStore, shoppingProfileStore } = useContext(StoreContext);

  // State for profiles and UI
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [aiGenerating, setAiGenerating] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    relationship: "self",
    age: "",
    gender: "",
    bio: "",
    interests: "",
    stylePreferences: "",
    favoriteColors: "",
    favoriteCategories: "",
    avatar: null,
  });

  // AI prompt state
  const [aiPrompt, setAiPrompt] = useState("");

  // Load profiles on component mount
  useEffect(() => {
    // Simulate API call to load profiles
    setLoading(true);
    setTimeout(() => {
      // Mock profiles data
      const mockProfiles = [
        {
          id: "profile1",
          name: "My Style",
          relationship: "self",
          age: 32,
          gender: "Female",
          interests: [
            "Minimalist design",
            "Sustainable fashion",
            "Outdoor activities",
          ],
          stylePreferences: ["Casual chic", "Business casual", "Athleisure"],
          favoriteColors: ["Navy", "Beige", "Olive green"],
          favoriteCategories: ["Clothing", "Home decor", "Accessories"],
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          isDefault: true,
        },
        {
          id: "profile2",
          name: "Michael (Husband)",
          relationship: "spouse",
          age: 34,
          gender: "Male",
          interests: ["Technology", "Hiking", "Cooking"],
          stylePreferences: ["Casual", "Sporty", "Classic"],
          favoriteColors: ["Blue", "Gray", "Black"],
          favoriteCategories: [
            "Electronics",
            "Outdoor gear",
            "Kitchen gadgets",
          ],
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          isDefault: false,
        },
        {
          id: "profile3",
          name: "Emma (Daughter)",
          relationship: "child",
          age: 7,
          gender: "Female",
          interests: ["Art", "Animals", "Reading"],
          stylePreferences: ["Colorful", "Comfortable", "Fun"],
          favoriteColors: ["Pink", "Purple", "Yellow"],
          favoriteCategories: ["Toys", "Books", "Clothing"],
          avatar: "https://randomuser.me/api/portraits/women/67.jpg",
          isDefault: false,
        },
      ];

      setProfiles(mockProfiles);
      setLoading(false);
    }, 1000);
  }, []);

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
    // Simulate API call to delete profile
    setProfiles(profiles.filter((profile) => profile.id !== selectedProfileId));
    handleMenuClose();
  };

  // Handle set as default profile
  const handleSetAsDefault = () => {
    // Simulate API call to set default profile
    setProfiles(
      profiles.map((profile) => ({
        ...profile,
        isDefault: profile.id === selectedProfileId,
      }))
    );
    handleMenuClose();
  };

  // Handle create profile dialog open
  const handleCreateDialogOpen = () => {
    setFormData({
      name: "",
      relationship: "self",
      age: "",
      gender: "",
      bio: "",
      interests: "",
      stylePreferences: "",
      favoriteColors: "",
      favoriteCategories: "",
      avatar: null,
    });
    setCreateDialogOpen(true);
  };

  // Handle AI dialog open
  const handleAiDialogOpen = () => {
    setAiPrompt("");
    setAiDialogOpen(true);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle AI prompt change
  const handleAiPromptChange = (e) => {
    setAiPrompt(e.target.value);
  };

  // Handle create profile submit
  const handleCreateProfileSubmit = () => {
    // Simulate API call to create profile
    const newProfile = {
      id: `profile${profiles.length + 1}`,
      name: formData.name,
      relationship: formData.relationship,
      age: parseInt(formData.age),
      gender: formData.gender,
      bio: formData.bio,
      interests: formData.interests.split(",").map((item) => item.trim()),
      stylePreferences: formData.stylePreferences
        .split(",")
        .map((item) => item.trim()),
      favoriteColors: formData.favoriteColors
        .split(",")
        .map((item) => item.trim()),
      favoriteCategories: formData.favoriteCategories
        .split(",")
        .map((item) => item.trim()),
      avatar:
        formData.avatar ||
        `https://randomuser.me/api/portraits/${
          formData.gender.toLowerCase() === "female" ? "women" : "men"
        }/${Math.floor(Math.random() * 100)}.jpg`,
      isDefault: profiles.length === 0,
    };

    setProfiles([...profiles, newProfile]);
    setCreateDialogOpen(false);
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
        isDefault: profiles.length === 0,
      };

      setFormData({
        name: aiGeneratedProfile.name,
        relationship: aiGeneratedProfile.relationship,
        age: aiGeneratedProfile.age,
        gender: aiGeneratedProfile.gender,
        bio: aiPrompt,
        interests: aiGeneratedProfile.interests.join(", "),
        stylePreferences: aiGeneratedProfile.stylePreferences.join(", "),
        favoriteColors: aiGeneratedProfile.favoriteColors.join(", "),
        favoriteCategories: aiGeneratedProfile.favoriteCategories.join(", "),
        avatar: aiGeneratedProfile.avatar,
      });

      setAiGenerating(false);
      setAiDialogOpen(false);
      setCreateDialogOpen(true);
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

      <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
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
              startIcon={<AddIcon />}
              onClick={handleCreateDialogOpen}
            >
              New Profile
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
              <Grid item xs={12} sm={6} md={4} key={profile.id}>
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

        {/* Create profile dialog */}
        <Dialog
          open={createDialogOpen}
          onClose={() => setCreateDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Create Shopping Profile</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 0.5 }}>
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

              <Grid item xs={12}>
                <TextField
                  name="bio"
                  label="About this person (freeform)"
                  fullWidth
                  multiline
                  rows={3}
                  value={formData.bio || ""}
                  onChange={handleInputChange}
                  helperText="Describe this person in your own words. Include any details that might help with recommendations."
                />
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
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleCreateProfileSubmit}
              disabled={!formData.name}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>

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
