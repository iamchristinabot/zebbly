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
import { StoreContext } from "../stores/storeContext";
import Header from "../components/Header";
import StyleTwinCard from '../components/StyleTwinCard';

const StyleTwinsPage = observer(({ isAuthenticated = true }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { profileId } = useParams(); // Get profile ID from URL
  const { userStore, aiRecommendationStore, shoppingProfileStore } = useContext(StoreContext);

  // State for style twins and UI
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [styleTwins, setStyleTwins] = useState([]);
  const [selectedTwin, setSelectedTwin] = useState(null);
  const [comparisonDialogOpen, setComparisonDialogOpen] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // Load profiles and style twins on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setLoadingProfile(true);
      
      try {
        if (!shoppingProfileStore) {
          console.error("Shopping profile store is not available");
          setLoading(false);
          setLoadingProfile(false);
          return;
        }
        
        // Load profiles from store
        await shoppingProfileStore.loadProfiles();
        
        // Find the profile by ID or use default
        let profile;
        if (profileId) {
          profile = shoppingProfileStore.profiles.find(p => p.id === profileId);
        }
        
        if (!profile && shoppingProfileStore.profiles.length > 0) {
          // Use default profile or first available
          profile = shoppingProfileStore.profiles.find(p => p.isDefault) || 
                    shoppingProfileStore.profiles[0];
                    
          // Update URL to match selected profile
          if (profile && profile.id !== profileId) {
            navigate(`/style-twins/${profile.id}`, { replace: true });
          }
        }
        
        if (profile) {
          setCurrentProfile(profile);
          setLoadingProfile(false);
          
          // Generate mock style twins based on profile preferences
          // In a real app, this would be an API call using the profile data
          setTimeout(() => {
            const mockTwins = generateStyleTwins(profile);
            setStyleTwins(mockTwins);
            setLoading(false);
          }, 1500);
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

  // Generate mock style twins based on profile
  const generateStyleTwins = (profile) => {
    // This would be replaced by an actual API call in a real app
    return [
      {
        id: "user1",
        name: "Emma Thompson",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        matchScore: 0.92,
        bio: "Fashion enthusiast with a love for minimalist design and sustainable brands.",
        location: "New York, NY",
        followers: 1243,
        following: 567,
        styleTraits: profile.stylePreferences || ["Minimalist", "Sustainable", "Modern", "Casual Chic"],
        favoriteCategories: profile.favoriteCategories || ["Fashion", "Home Decor", "Accessories"],
        favoriteBrands: ["Everlane", "Reformation", "Muji", "IKEA"],
        recentProducts: [
          {
            id: "p1",
            title: "Linen Shirt Dress",
            image: "https://picsum.photos/seed/product1/300/200",
            price: 89.99,
          },
          {
            id: "p2",
            title: "Ceramic Planter",
            image: "https://picsum.photos/seed/product2/300/200",
            price: 34.99,
          },
          {
            id: "p3",
            title: "Minimalist Watch",
            image: "https://picsum.photos/seed/product3/300/200",
            price: 129.99,
          },
        ],
        commonInterests: profile.interests || [
          "Sustainable Fashion",
          "Indoor Plants",
          "Scandinavian Design",
        ],
      },
      {
        id: "user2",
        name: "Michael Chen",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        matchScore: 0.87,
        bio: "Tech enthusiast and design lover. Always looking for smart home gadgets and sleek accessories.",
        location: "San Francisco, CA",
        followers: 892,
        following: 345,
        styleTraits: ["Modern", "Tech-Forward", "Minimalist", "Urban"],
        favoriteCategories: ["Electronics", "Smart Home", "Accessories"],
        favoriteBrands: ["Apple", "Samsung", "Bose", "Philips Hue"],
        recentProducts: [
          {
            id: "p4",
            title: "Wireless Earbuds",
            image: "https://picsum.photos/seed/product4/300/200",
            price: 149.99,
          },
          {
            id: "p5",
            title: "Smart Desk Lamp",
            image: "https://picsum.photos/seed/product5/300/200",
            price: 79.99,
          },
          {
            id: "p6",
            title: "Minimalist Backpack",
            image: "https://picsum.photos/seed/product6/300/200",
            price: 89.99,
          },
        ],
        commonInterests: [
          "Smart Home Tech",
          "Minimalist Design",
          "Productivity Gadgets",
        ],
      },
      {
        id: "user3",
        name: "Sophia Rodriguez",
        avatar: "https://randomuser.me/api/portraits/women/29.jpg",
        matchScore: 0.84,
        bio: "Fitness enthusiast and wellness advocate. Love discovering new workout gear and healthy living products.",
        location: "Los Angeles, CA",
        followers: 1567,
        following: 432,
        styleTraits: ["Athletic", "Casual", "Functional", "Eco-friendly"],
        favoriteCategories: ["Fitness", "Wellness", "Activewear"],
        favoriteBrands: ["Nike", "Lululemon", "Hydroflask", "Manduka"],
        recentProducts: [
          {
            id: "p7",
            title: "Yoga Mat",
            image: "https://picsum.photos/seed/product7/300/200",
            price: 68.99,
          },
          {
            id: "p8",
            title: "Fitness Tracker",
            image: "https://picsum.photos/seed/product8/300/200",
            price: 129.99,
          },
          {
            id: "p9",
            title: "Reusable Water Bottle",
            image: "https://picsum.photos/seed/product9/300/200",
            price: 34.99,
          },
        ],
        commonInterests: [
          "Fitness Tech",
          "Sustainable Products",
          "Outdoor Activities",
        ],
      },
      {
        id: "user4",
        name: "David Johnson",
        avatar: "https://randomuser.me/api/portraits/men/86.jpg",
        matchScore: 0.79,
        bio: "Home chef and kitchen gadget collector. Always looking for the next tool to elevate my cooking game.",
        location: "Chicago, IL",
        followers: 723,
        following: 291,
        styleTraits: [
          "Practical",
          "Quality-focused",
          "Traditional",
          "Functional",
        ],
        favoriteCategories: ["Kitchen", "Cooking", "Home"],
        favoriteBrands: ["KitchenAid", "Le Creuset", "OXO", "Cuisinart"],
        recentProducts: [
          {
            id: "p10",
            title: "Cast Iron Dutch Oven",
            image: "https://picsum.photos/seed/product10/300/200",
            price: 249.99,
          },
          {
            id: "p11",
            title: "Chef's Knife",
            image: "https://picsum.photos/seed/product11/300/200",
            price: 89.99,
          },
          {
            id: "p12",
            title: "Smart Kitchen Scale",
            image: "https://picsum.photos/seed/product12/300/200",
            price: 59.99,
          },
        ],
        commonInterests: [
          "Cooking Gadgets",
          "Quality Kitchenware",
          "Smart Home",
        ],
      },
    ];
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
      setStyleTwins([...styleTwins, ...additionalTwins]);
      setAnalyzing(false);
    }, 2000);
  };

  const handleOpenComparison = (twin) => {
    setSelectedTwin(twin);
    setComparisonDialogOpen(true);
  };

  const handleCloseComparison = () => {
    setComparisonDialogOpen(false);
  };

  const handleFollowTwin = (twinId, event) => {
    event.stopPropagation();
    // Toggle follow status
    setStyleTwins((prevTwins) =>
      prevTwins.map((twin) =>
        twin.id === twinId ? { ...twin, isFollowing: !twin.isFollowing } : twin
      )
    );
  };

  // Handle profile change
  const handleProfileChange = (event) => {
    const newProfileId = event.target.value;
    navigate(`/style-twins/${newProfileId}`);
  };

  return (
    <>
      <Header isAuthenticated={isAuthenticated} />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            mb: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              <AutoAwesomeIcon sx={{ mr: 1, verticalAlign: "middle" }} />
              Find Your Style Twins
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Discover people who share your taste and style preferences,
              powered by AI analysis of your product interactions.
            </Typography>
            {!loadingProfile && currentProfile && (
              <Typography variant="subtitle1" color="primary">
                Currently showing matches for: {currentProfile.name}
              </Typography>
            )}
          </Box>

          {/* Profile selector */}
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="profile-select-label">Shopping Profile</InputLabel>
            <Select
              labelId="profile-select-label"
              id="profile-select"
              value={currentProfile?.id || ''}
              label="Shopping Profile"
              onChange={handleProfileChange}
              disabled={loadingProfile || !shoppingProfileStore || shoppingProfileStore.profiles.length === 0}
            >
              {shoppingProfileStore?.profiles.map((profile) => (
                <MenuItem key={profile.id} value={profile.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar 
                      src={profile.avatar} 
                      sx={{ width: 24, height: 24, mr: 1 }}
                    />
                    {profile.name}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={4}>
          {/* Style Twins - now takes full width */}
          <Grid item xs={12}>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <CircularProgress />
              </Box>
            ) : styleTwins.length > 0 ? (
              <Grid container spacing={3}>
                {styleTwins.map((twin) => (
                  <Grid item xs={12} sm={6} md={4} key={twin.id}>
                    <StyleTwinCard
                      twin={twin}
                      onCompare={() => handleOpenComparison(twin)}
                      onFollow={(e) => handleFollowTwin(twin.id, e)}
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
        {styleTwins.length > 0 && (
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
          onClose={handleCloseComparison}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            Style Comparison
            <IconButton
              aria-label="close"
              onClick={handleCloseComparison}
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
                      src={userStore.getUserById("me").avatar}
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
            <Button variant="outlined" onClick={handleCloseComparison}>
              Close
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<PersonAddIcon />}
              onClick={() => {
                handleFollowTwin(selectedTwin.id, {
                  stopPropagation: () => {},
                });
                handleCloseComparison();
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
