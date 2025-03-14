import React, { useState, useEffect } from "react";
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
  Chip,
  CircularProgress,
  LinearProgress,
  Divider,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import StyleIcon from "@mui/icons-material/Style";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useStores } from "../hooks/useStores";
import Header from "../components/Header";
import StyleTwinCard from '../components/StyleTwinCard';
import { SelectChangeEvent } from "@mui/material";
import type { StyleTwin, ShoppingProfile } from "../stores/shoppingProfileStore";
import ProfileSelector from '../components/ProfileSelector';

interface StyleTwinsPageProps {
  isAuthenticated: boolean;
}

const StyleTwinsPage = observer(({ isAuthenticated = true }: StyleTwinsPageProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { profileId } = useParams();
  const { userStore, aiRecommendationStore, shoppingProfileStore } = useStores();

  // State for UI
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedTwin, setSelectedTwin] = useState<StyleTwin | null>(null);
  const [comparisonDialogOpen, setComparisonDialogOpen] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<ShoppingProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // Load profiles and style twins on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setLoadingProfile(true);
      
      try {
        if (!shoppingProfileStore?.profiles) {
          console.error("Shopping profile store is not available");
          setLoading(false);
          setLoadingProfile(false);
          return;
        }
        
        // Load profiles from store if not already loaded
        if (!shoppingProfileStore.profiles.length) {
          await shoppingProfileStore.loadProfiles();
        }
        
        // Find the profile by ID or use default
        let profile: ShoppingProfile | undefined;
        if (profileId && shoppingProfileStore.profiles) {
          profile = shoppingProfileStore.profiles.find((p: ShoppingProfile) => p.id === profileId);
        }
        
        if (!profile && shoppingProfileStore.profiles.length > 0) {
          // Use default profile or first available
          profile = shoppingProfileStore.profiles.find((p: ShoppingProfile) => p.isDefault) || 
                    shoppingProfileStore.profiles[0];
                    
          // Update URL to match selected profile
          if (profile && profile.id !== profileId) {
            navigate(`/style-twins/${profile.id}`, { replace: true });
          }
        }
        
        if (profile) {
          setCurrentProfile(profile);
          setLoadingProfile(false);
          
          // Load style twins for the profile
          await shoppingProfileStore.loadStyleTwins(profile.id);
          setLoading(false);
        } else {
          setLoadingProfile(false);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error loading data:", error);
        setLoadingProfile(false);
        setLoading(false);
      }
    };
    
    loadData();
  }, [profileId, shoppingProfileStore, navigate]);

  // Update the handleProfileChange function
  const handleProfileChange = (profileId: string) => {
    const profile = shoppingProfileStore?.profiles.find(p => p.id === profileId);
    if (profile) {
      setCurrentProfile(profile);
      shoppingProfileStore.loadStyleTwins(profile.id);
    }
  };

  const handleLoadMoreTwins = () => {
    setAnalyzing(true);
    setTimeout(() => {
      // Generate additional mock twins
      const additionalTwins = [
        {
          id: "user5",
          name: "Jennifer Wilson",
          avatar: "https://randomuser.me/api/portraits/women/63.jpg",
          matchScore: 0.76,
          bio: "Interior design enthusiast with a passion for Scandinavian aesthetics and sustainable home products.",
          location: "Seattle, WA",
          followers: 892,
          following: 345,
          styleTraits: ["Minimalist", "Scandinavian", "Eco-friendly", "Functional"],
          favoriteCategories: ["Home Decor", "Furniture", "Lighting"],
          favoriteBrands: ["IKEA", "West Elm", "Crate & Barrel", "Parachute"],
          recentProducts: [
            {
              id: "p13",
              title: "Linen Duvet Cover",
              image: "https://picsum.photos/seed/product13/300/200",
              price: 129.99,
            },
            {
              id: "p14",
              title: "Ceramic Table Lamp",
              image: "https://picsum.photos/seed/product14/300/200",
              price: 89.99,
            },
            {
              id: "p15",
              title: "Wool Area Rug",
              image: "https://picsum.photos/seed/product15/300/200",
              price: 249.99,
            },
          ],
          commonInterests: [
            "Sustainable Living",
            "Interior Design",
            "DIY Home Projects",
          ],
        },
        {
          id: "user6",
          name: "Robert Kim",
          avatar: "https://randomuser.me/api/portraits/men/42.jpg",
          matchScore: 0.73,
          bio: "Tech enthusiast and early adopter. Always looking for the latest gadgets and smart home innovations.",
          location: "Austin, TX",
          followers: 1243,
          following: 567,
          styleTraits: ["Tech-forward", "Modern", "Practical", "Quality-focused"],
          favoriteCategories: ["Electronics", "Smart Home", "Gadgets"],
          favoriteBrands: ["Apple", "Google", "Samsung", "Sonos"],
          recentProducts: [
            {
              id: "p16",
              title: "Smart Speaker",
              image: "https://picsum.photos/seed/product16/300/200",
              price: 199.99,
            },
            {
              id: "p17",
              title: "Wireless Charging Pad",
              image: "https://picsum.photos/seed/product17/300/200",
              price: 49.99,
            },
            {
              id: "p18",
              title: "Smart Thermostat",
              image: "https://picsum.photos/seed/product18/300/200",
              price: 249.99,
            },
          ],
          commonInterests: [
            "Home Automation",
            "Tech Gadgets",
            "Productivity Tools",
          ],
        },
      ];
      
      // Add the new twins to the existing ones
      shoppingProfileStore.styleTwins = [...shoppingProfileStore.styleTwins, ...additionalTwins];
      setAnalyzing(false);
    }, 2000);
  };

  const handleOpenComparison = (twin: StyleTwin) => {
    setSelectedTwin(twin);
    setComparisonDialogOpen(true);
  };

  const handleCloseComparison = () => {
    setComparisonDialogOpen(false);
  };

  const handleFollowTwin = (twinId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    shoppingProfileStore.toggleFollowTwin(twinId);
  };

  // Handle comparison dialog close
  const handleCloseComparisonFromDialog = () => {
    setComparisonDialogOpen(false);
  };

  // Handle follow twin with synthetic event
  const handleFollowTwinFromDialog = (twinId: string) => {
    shoppingProfileStore.toggleFollowTwin(twinId);
  };

  return (
    <>
      <Header isAuthenticated={isAuthenticated} />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Hero Section */}
        <Box 
          sx={{ 
            mb: 6,
            background: `linear-gradient(135deg, 
              white 0%,
              rgba(103, 58, 183, 0.03) 60%,
              rgba(103, 58, 183, 0.06) 100%
            )`,
            borderRadius: 3,
            p: 4,
            position: 'relative',
            overflow: 'hidden',
            border: `1px solid ${theme.palette.grey[100]}`,
            boxShadow: `0 4px 20px rgba(103, 58, 183, 0.03)`
          }}
        >
          {/* Background Pattern */}
          <Box 
            sx={{
              position: 'absolute',
              right: -50,
              top: -50,
              opacity: 0.06,
              transform: 'rotate(30deg)',
              color: theme.palette.primary.main
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: 200 }} />
          </Box>

          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Box sx={{ mb: 2 }}>
                <Typography 
                  variant="h3" 
                  component="h1" 
                  sx={{ 
                    mb: 2, 
                    fontWeight: 700,
                    background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.main} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Style Twins
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 400,
                    color: theme.palette.text.secondary
                  }}
                >
                  Discover people who share your taste and style preferences,
                  powered by AI analysis of your product interactions.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              {!loadingProfile && currentProfile && (
                <Box 
                  sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: 2,
                    p: 2,
                    border: `1px solid ${theme.palette.grey[100]}`,
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        color: theme.palette.text.secondary,
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        fontSize: '0.75rem',
                        letterSpacing: '0.1em'
                      }}
                    >
                      Select Profile
                    </Typography>
                    <ProfileSelector
                      value={currentProfile?.id}
                      onChange={handleProfileChange}
                      disabled={loadingProfile}
                      showLabel={false}
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'white',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.grey[200]
                        }
                      }}
                    />
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={4}>
          {/* Style Twins - now takes full width */}
          <Grid item xs={12}>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <CircularProgress />
              </Box>
            ) : shoppingProfileStore.styleTwins.length > 0 ? (
              <Grid container spacing={3}>
                {shoppingProfileStore.styleTwins.map((twin) => (
                  <Grid item xs={12} sm={6} md={4} key={twin.id}>
                    <StyleTwinCard
                      twin={twin}
                      onCompare={() => handleOpenComparison(twin)}
                      onFollow={(e: React.MouseEvent) => handleFollowTwin(twin.id, e)}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" gutterBottom>
                  No style twins found
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Try selecting a different profile or update your style preferences.
                </Typography>
                <Button 
                  variant="contained" 
                  component="a" 
                  href="/shopping-profiles"
                >
                  Update Style Preferences
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
        
        {/* Refresh button moved to bottom */}
        {shoppingProfileStore.styleTwins.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 2 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<AutoAwesomeIcon />}
              onClick={handleLoadMoreTwins}
              disabled={analyzing}
            >
              {analyzing ? "Finding More Twins..." : "Load More Style Twins"}
            </Button>
          </Box>
        )}
      </Container>

      {/* Style Comparison Dialog */}
      {selectedTwin && (
        <Dialog
          open={comparisonDialogOpen}
          onClose={handleCloseComparisonFromDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            Style Comparison
            <IconButton
              aria-label="close"
              onClick={handleCloseComparisonFromDialog}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Box sx={{ textAlign: "center", px: 2 }}>
                    <Avatar
                      src={userStore.getUserById("me")?.avatar || ""}
                      sx={{ width: 60, height: 60, mx: "auto", mb: 1 }}
                    />
                    <Typography variant="subtitle1" fontWeight="bold">
                      You
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      px: 3,
                    }}
                  >
                    <CompareArrowsIcon
                      sx={{ fontSize: 32, color: theme.palette.primary.main }}
                    />
                    <Chip
                      label={`${Math.round(
                        selectedTwin.matchScore * 100
                      )}% Match`}
                      color="primary"
                      sx={{ mt: 1 }}
                    />
                  </Box>

                  <Box sx={{ textAlign: "center", px: 2 }}>
                    <Avatar
                      src={selectedTwin.avatar}
                      sx={{ width: 60, height: 60, mx: "auto", mb: 1 }}
                    />
                    <Typography variant="subtitle1" fontWeight="bold">
                      {selectedTwin.name}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Common Style Traits
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
                  {selectedTwin.styleTraits.map((trait, index) => (
                    <Chip
                      key={index}
                      label={trait}
                      size="small"
                      icon={<CheckCircleIcon />}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>

                <Typography variant="subtitle2" gutterBottom>
                  Common Interests
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {selectedTwin.commonInterests.map((interest, index) => (
                    <Chip key={index} label={interest} size="small" />
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Favorite Brands
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
                  {selectedTwin.favoriteBrands.map((brand, index) => (
                    <Chip
                      key={index}
                      label={brand}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>

                <Typography variant="subtitle2" gutterBottom>
                  Favorite Categories
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {selectedTwin.favoriteCategories.map((category, index) => (
                    <Chip key={index} label={category} size="small" />
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" gutterBottom>
                  Recent Products
                </Typography>
                <Grid container spacing={2}>
                  {selectedTwin.recentProducts.map((product, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                      <Card
                        elevation={0}
                        sx={{
                          border: `1px solid ${theme.palette.brand.lightGray}`,
                          height: "100%",
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="120"
                          image={product.image}
                          alt={product.title}
                        />
                        <CardContent sx={{ p: 1.5 }}>
                          <Typography variant="body2" noWrap>
                            {product.title}
                          </Typography>
                          <Typography variant="subtitle2" color="primary">
                            ${product.price}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleCloseComparisonFromDialog}>
              Close
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<PersonAddIcon />}
              onClick={() => {
                handleFollowTwinFromDialog(selectedTwin.id);
                handleCloseComparisonFromDialog();
              }}
            >
              {selectedTwin.isFollowing ? "Unfollow" : "Follow"}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
});

export default StyleTwinsPage;
