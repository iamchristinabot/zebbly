import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SmartToyIcon from "@mui/icons-material/SmartToy";
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
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import ProfileSelector from "../components/ProfileSelector";
import { useStores } from "../hooks/useStores";
import { AuthenticatedProps } from "../types/common";
import PageTitle from "src/components/elements/PageTitle";

// Message types
const MESSAGE_TYPE = {
  USER: "user",
  ASSISTANT: "assistant",
  PRODUCT: "product",
} as const;

type MessageType = (typeof MESSAGE_TYPE)[keyof typeof MESSAGE_TYPE];

export interface ShoppingAssistantPageProps extends AuthenticatedProps {}

interface PriceRange {
  min: number;
  max: number;
}

interface UserPreferences {
  interests: string[];
  priceRanges: {
    [category: string]: PriceRange;
  };
  styles: string[];
  colors: string[];
  brands: string[];
}

interface ProfilePreferences {
  [key: string]: UserPreferences;
}

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  store: string;
  rating: number;
  reviews: number;
  liked?: boolean;
  saved?: boolean;
}

interface Message {
  type: MessageType;
  content: string;
  timestamp: Date;
  products?: Product[];
}

interface RenderMessageProps {
  message: Message;
  index: number;
  handleLikeProduct: (productId: string) => void;
  handleSaveProduct: (productId: string) => void;
  handleBuyProduct: (productId: string) => void;
}

const ShoppingAssistantPage = observer(
  ({ isAuthenticated = true }: ShoppingAssistantPageProps) => {
    const { userStore, shoppingProfileStore, aiRecommendationStore } =
      useStores();
    const theme = useTheme();
    const navigate = useNavigate();

    // Selected profile state
    const [selectedProfileId, setSelectedProfileId] = useState<string | null>(
      null
    );
    const [profilePreferences, setProfilePreferences] =
      useState<ProfilePreferences>({});
    const [loadingProfiles, setLoadingProfiles] = useState(true);

    // Create a fallback for preferences if it's undefined
    const defaultUserPreferences: UserPreferences = {
      interests: ["Tech", "Home Decor", "Fitness"],
      priceRanges: {
        Tech: { min: 50, max: 500 },
        "Home Decor": { min: 20, max: 200 },
        Fitness: { min: 30, max: 150 },
      },
      styles: ["Modern", "Minimalist"],
      colors: ["Black", "White", "Gray", "Blue"],
      brands: ["Apple", "Samsung", "Nike", "Adidas", "IKEA"],
    };

    // Use either the store's userPreferences or the profile-specific preferences
    const userPreferences =
      selectedProfileId && profilePreferences[selectedProfileId]
        ? profilePreferences[selectedProfileId]
        : defaultUserPreferences;

    // Chat state
    const [messages, setMessages] = useState<Message[]>([
      {
        type: MESSAGE_TYPE.ASSISTANT,
        content:
          "Hi there! I'm your AI shopping assistant. How can I help you find products today?",
        timestamp: new Date(),
      },
    ]);

    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Product recommendations
    const [recommendedProducts, setRecommendedProducts] = useState<Product[]>(
      []
    );

    // Load profile from store
    useEffect(() => {
      const loadProfile = async () => {
        setLoadingProfiles(true);

        try {
          if (!shoppingProfileStore) {
            console.error("Shopping profile store is not available");
            setLoadingProfiles(false);
            return;
          }

          await shoppingProfileStore.loadProfiles();

          // Set current profile if available
          const defaultProfile = shoppingProfileStore.profiles[0];
          if (defaultProfile) {
            setSelectedProfileId(defaultProfile.id);

            // Generate preferences for the profile
            const preferences: ProfilePreferences = {
              [defaultProfile.id]: generateProfilePreferences(defaultProfile),
            };
            setProfilePreferences(preferences);
          }
        } catch (error) {
          console.error("Error loading profiles:", error);
        } finally {
          setLoadingProfiles(false);
        }
      };

      loadProfile();
    }, [shoppingProfileStore]);

    // Generate profile-specific preferences based on profile data
    const generateProfilePreferences = (profile: any): UserPreferences => {
      // If profile has specific preferences, use those
      if (
        profile.interests &&
        profile.stylePreferences &&
        profile.favoriteColors
      ) {
        return {
          interests: profile.interests.split(",") || [
            "Fashion",
            "Home Decor",
            "Tech",
          ],
          priceRanges: {
            Tech: { min: 50, max: 500 },
            "Home Decor": { min: 20, max: 200 },
            Fashion: { min: 30, max: 300 },
            Fitness: { min: 30, max: 150 },
          },
          styles: profile.stylePreferences.split(",") || [
            "Modern",
            "Minimalist",
          ],
          colors: profile.favoriteColors.split(",") || [
            "Black",
            "White",
            "Gray",
            "Blue",
          ],
          brands: profile.favoriteStores?.split(",") || [
            "Apple",
            "Samsung",
            "Nike",
            "Adidas",
            "IKEA",
          ],
        };
      }

      // Otherwise, generate based on relationship
      if (profile.relationship === "spouse") {
        return {
          interests: ["Tech", "Sports", "Cooking"],
          priceRanges: {
            Tech: { min: 100, max: 1000 },
            Sports: { min: 50, max: 300 },
            Cooking: { min: 30, max: 200 },
          },
          styles: ["Casual", "Sporty", "Classic"],
          colors: ["Blue", "Gray", "Black", "Green"],
          brands: ["Samsung", "Nike", "Under Armour", "North Face", "Weber"],
        };
      } else if (profile.relationship === "child") {
        return {
          interests: ["Toys", "Books", "Games"],
          priceRanges: {
            Toys: { min: 20, max: 100 },
            Books: { min: 10, max: 50 },
            Games: { min: 20, max: 60 },
          },
          styles: ["Colorful", "Fun", "Playful"],
          colors: ["Red", "Blue", "Yellow", "Green"],
          brands: ["Lego", "Disney", "Nintendo", "Marvel"],
        };
      } else {
        // Default for self or other
        return defaultUserPreferences;
      }
    };

    // Scroll to bottom of chat when messages change
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    // Handle profile change
    const handleProfileChange = (profileId: string) => {
      setSelectedProfileId(profileId);
      const profile = shoppingProfileStore?.profiles.find(
        (p) => p.id === profileId
      );

      if (profile) {
        // Update preferences using actual profile data
        const preferences: ProfilePreferences = {
          [profile.id]: {
            interests: profile.interests,
            priceRanges: profile.preferences.reduce(
              (acc: { [key: string]: PriceRange }, pref) => ({
                ...acc,
                [pref.category]: { min: pref.minPrice, max: pref.maxPrice },
              }),
              {}
            ),
            styles: profile.stylePreferences,
            colors: profile.stylePreferences.filter((style) =>
              style.toLowerCase().includes("color")
            ),
            brands: profile.favoriteStores,
          },
        };
        setProfilePreferences(preferences);

        // Also update the current profile in the store
        shoppingProfileStore.setCurrentProfile(profile);
      }
    };

    // Handle send message
    const handleSendMessage = () => {
      if (!inputValue.trim()) return;

      // Add user message
      const userMessage: Message = {
        type: MESSAGE_TYPE.USER,
        content: inputValue,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");
      setIsTyping(true);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = generateAIResponse(inputValue);
        setMessages((prev) => [...prev, aiResponse]);
        setIsTyping(false);

        // If the message is about product recommendations, show some products
        if (
          inputValue.toLowerCase().includes("recommend") ||
          inputValue.toLowerCase().includes("suggest") ||
          inputValue.toLowerCase().includes("show me")
        ) {
          generateProductRecommendations();
        }
      }, 1500);
    };

    // Generate AI response based on user input
    const generateAIResponse = (userInput: string): Message => {
      const userInputLower = userInput.toLowerCase();
      let responseContent = "";

      if (userInputLower.includes("hello") || userInputLower.includes("hi")) {
        responseContent = `Hello! I'm here to help you find products that match your preferences. What are you looking for today?`;
      } else if (
        userInputLower.includes("recommend") ||
        userInputLower.includes("suggest")
      ) {
        if (
          userInputLower.includes("tech") ||
          userInputLower.includes("gadget") ||
          userInputLower.includes("electronic")
        ) {
          responseContent = `Based on your preferences for ${userPreferences.interests.join(
            ", "
          )}, I'd recommend checking out these tech products. They match your modern, minimalist style and fall within your price range of $${
            userPreferences.priceRanges["Tech"].min
          }-$${userPreferences.priceRanges["Tech"].max}.`;
        } else if (
          userInputLower.includes("home") ||
          userInputLower.includes("decor") ||
          userInputLower.includes("furniture")
        ) {
          responseContent = `I've found some home decor items that match your ${userPreferences.styles.join(
            ", "
          )} style preferences. These items feature your favorite colors: ${userPreferences.colors.join(
            ", "
          )}.`;
        } else if (
          userInputLower.includes("fitness") ||
          userInputLower.includes("workout") ||
          userInputLower.includes("exercise")
        ) {
          responseContent = `Here are some fitness products I think you'll love. They're from brands you prefer like ${userPreferences.brands
            .filter((b) => b === "Nike" || b === "Adidas")
            .join(", ")}.`;
        } else {
          responseContent = `I'd be happy to recommend some products for you. Based on your preferences, I think you might like these items. They match your style and interests in ${userPreferences.interests.join(
            ", "
          )}.`;
        }
      } else if (
        userInputLower.includes("price") ||
        userInputLower.includes("budget") ||
        userInputLower.includes("cost")
      ) {
        responseContent = `I can help you find products within your budget. What price range are you looking for?`;
      } else if (userInputLower.includes("thank")) {
        responseContent = `You're welcome! Is there anything else I can help you with today?`;
      } else {
        responseContent = `I understand you're interested in "${userInput}". Let me find some relevant products that match your preferences for ${userPreferences.interests.join(
          ", "
        )} and your ${userPreferences.styles.join(", ")} style.`;
      }

      return {
        type: MESSAGE_TYPE.ASSISTANT,
        content: responseContent,
        timestamp: new Date(),
      };
    };

    // Generate product recommendations
    const generateProductRecommendations = () => {
      // Simulate API call to get product recommendations
      setTimeout(() => {
        const mockProducts = [
          {
            id: "p1",
            title: "Wireless Noise Cancelling Headphones",
            description:
              "Premium sound quality with adaptive noise cancellation.",
            price: 249.99,
            image: "https://via.placeholder.com/300x200",
            store: "Amazon",
            rating: 4.7,
            reviews: 1245,
          },
          {
            id: "p2",
            title: "Smart Home Hub",
            description: "Control all your smart devices from one central hub.",
            price: 129.99,
            image: "https://via.placeholder.com/300x200",
            store: "Best Buy",
            rating: 4.5,
            reviews: 867,
          },
          {
            id: "p3",
            title: "Fitness Tracker Watch",
            description: "Track your workouts, heart rate, and sleep patterns.",
            price: 179.99,
            image: "https://via.placeholder.com/300x200",
            store: "Nike",
            rating: 4.6,
            reviews: 932,
          },
        ];

        setRecommendedProducts(mockProducts);

        // Add product message to chat
        setMessages((prev) => [
          ...prev,
          {
            type: MESSAGE_TYPE.PRODUCT,
            content: "Here are some products you might like:",
            products: mockProducts,
            timestamp: new Date(),
          },
        ]);
      }, 1000);
    };

    // Handle key press (Enter to send)
    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    };

    // Handle product like
    const handleLikeProduct = (productId: string) => {
      setRecommendedProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, liked: !p.liked } : p))
      );
    };

    // Handle product save
    const handleSaveProduct = (productId: string) => {
      setRecommendedProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, saved: !p.saved } : p))
      );
    };

    // Handle product buy
    const handleBuyProduct = (productId: string) => {
      // In a real app, this would navigate to the product page or add to cart
      console.log(`Buy product: ${productId}`);
    };

    // Render message based on type
    const renderMessage = ({
      message,
      index,
      handleLikeProduct,
      handleSaveProduct,
      handleBuyProduct,
    }: RenderMessageProps) => {
      switch (message.type) {
        case MESSAGE_TYPE.USER:
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mb: 2,
              }}
            >
              <Paper
                sx={{
                  p: 2,
                  maxWidth: "70%",
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  borderRadius: "12px 12px 0 12px",
                }}
              >
                <Typography variant="body1">{message.content}</Typography>
              </Paper>
            </Box>
          );

        case MESSAGE_TYPE.ASSISTANT:
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                mb: 2,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: theme.palette.secondary.main,
                  mr: 1,
                }}
              >
                <SmartToyIcon />
              </Avatar>
              <Paper
                sx={{
                  p: 2,
                  maxWidth: "70%",
                  bgcolor: theme.palette.grey[100],
                  borderRadius: "12px 12px 12px 0",
                }}
              >
                <Typography variant="body1">{message.content}</Typography>
              </Paper>
            </Box>
          );

        case MESSAGE_TYPE.PRODUCT:
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  mb: 2,
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: theme.palette.secondary.main,
                    mr: 1,
                  }}
                >
                  <SmartToyIcon />
                </Avatar>
                <Paper
                  sx={{
                    p: 2,
                    maxWidth: "70%",
                    bgcolor: theme.palette.grey[100],
                    borderRadius: "12px 12px 12px 0",
                  }}
                >
                  <Typography variant="body1">{message.content}</Typography>
                </Paper>
              </Box>

              {message.products && message.products.length > 0 && (
                <Grid container spacing={2} sx={{ ml: 5 }}>
                  {message.products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                      <Card>
                        <CardMedia
                          component="img"
                          height="140"
                          image={product.image}
                          alt={product.title}
                        />
                        <CardContent>
                          <Typography variant="h6" component="div" noWrap>
                            {product.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                          >
                            {product.description}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Typography variant="h6" component="div">
                              ${product.price}
                            </Typography>
                            <Chip label={product.store} size="small" />
                          </Box>
                        </CardContent>
                        <CardActions>
                          <IconButton
                            onClick={() => handleLikeProduct(product.id)}
                          >
                            {product.liked ? (
                              <FavoriteIcon color="error" />
                            ) : (
                              <FavoriteBorderIcon />
                            )}
                          </IconButton>
                          <IconButton
                            onClick={() => handleSaveProduct(product.id)}
                          >
                            {product.saved ? (
                              <BookmarkIcon color="primary" />
                            ) : (
                              <BookmarkBorderIcon />
                            )}
                          </IconButton>
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<ShoppingCartIcon />}
                            onClick={() => handleBuyProduct(product.id)}
                            sx={{ ml: "auto" }}
                          >
                            Buy
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          );

        default:
          return null;
      }
    };

    return (
      <>
        <Header isAuthenticated={isAuthenticated} />

        <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
          <Box sx={{ mb: 4 }}>
            <PageTitle title="Shopping Assistant" gutterBottom />

            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Get personalized product recommendations powered by AI. Start by
              selecting a shopping profile on the left, then chat with your
              assistant to discover perfect gifts and products tailored to your
              preferences.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {/* Sidebar */}
            <Grid item xs={12} md={3}>
              <Paper sx={{ p: 2, height: "100%" }}>
                <Typography variant="h6" gutterBottom>
                  Select Profile
                </Typography>

                {loadingProfiles ? (
                  <Box
                    sx={{ display: "flex", justifyContent: "center", my: 2 }}
                  >
                    <CircularProgress size={24} />
                  </Box>
                ) : (
                  <ProfileSelector
                    value={selectedProfileId || ""}
                    onChange={handleProfileChange}
                    showLabel={false}
                    disabled={!shoppingProfileStore?.profiles.length}
                  />
                )}

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>
                  Shopping Preferences
                </Typography>

                <Typography variant="subtitle2" gutterBottom>
                  Interests
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                  {userPreferences.interests.map((interest, index) => (
                    <Chip key={index} label={interest} size="small" />
                  ))}
                </Box>

                <Typography variant="subtitle2" gutterBottom>
                  Style
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                  {userPreferences.styles.map((style, index) => (
                    <Chip key={index} label={style} size="small" />
                  ))}
                </Box>

                <Typography variant="subtitle2" gutterBottom>
                  Favorite Colors
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                  {userPreferences.colors.map((color, index) => (
                    <Chip key={index} label={color} size="small" />
                  ))}
                </Box>

                <Typography variant="subtitle2" gutterBottom>
                  Preferred Brands
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {userPreferences.brands.map((brand, index) => (
                    <Chip key={index} label={brand} size="small" />
                  ))}
                </Box>
              </Paper>
            </Grid>

            {/* Chat Area */}
            <Grid item xs={12} md={9}>
              <Paper
                sx={{
                  p: 2,
                  height: "70vh",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Chat messages */}
                <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
                  {messages.map((message, index) =>
                    renderMessage({
                      message,
                      index,
                      handleLikeProduct,
                      handleSaveProduct,
                      handleBuyProduct,
                    })
                  )}

                  {isTyping && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        mb: 2,
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: theme.palette.secondary.main,
                          mr: 1,
                        }}
                      >
                        <SmartToyIcon />
                      </Avatar>
                      <Paper
                        sx={{
                          p: 2,
                          maxWidth: "70%",
                          bgcolor: theme.palette.grey[100],
                          borderRadius: "12px 12px 12px 0",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <CircularProgress size={16} sx={{ mr: 1 }} />
                          <Typography variant="body2">Typing...</Typography>
                        </Box>
                      </Paper>
                    </Box>
                  )}

                  <div ref={messagesEndRef} />
                </Box>

                {/* Input area */}
                <Box
                  sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs>
                      <TextField
                        fullWidth
                        placeholder="Type your message..."
                        variant="outlined"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        disabled={isTyping}
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        endIcon={<SendIcon />}
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isTyping}
                      >
                        Send
                      </Button>
                    </Grid>
                  </Grid>

                  <Box
                    sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}
                  >
                    <Chip
                      label="Recommend tech gadgets"
                      onClick={() =>
                        setInputValue(
                          "Can you recommend some tech gadgets for me?"
                        )
                      }
                      clickable
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                    <Chip
                      label="Home decor ideas"
                      onClick={() =>
                        setInputValue("I'm looking for home decor ideas")
                      }
                      clickable
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                    <Chip
                      label="Fitness equipment"
                      onClick={() =>
                        setInputValue("Show me some fitness equipment")
                      }
                      clickable
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
);

export default ShoppingAssistantPage;
