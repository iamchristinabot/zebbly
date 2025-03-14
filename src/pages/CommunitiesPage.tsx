import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import CommunityCard from "../components/communities/CommunityCard";
import CommunityCategories from "../components/communities/CommunityCategories";
import FeaturedCommunities from "../components/communities/FeaturedCommunities";
import RecommendedCommunities from "../components/communities/RecommendedCommunities";
import { AuthenticatedProps } from "../types/common";

interface Community {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  postCount: number;
  category: string;
  tags: string[];
  image: string;
  isJoined: boolean;
}

export interface CommunitiesPageProps extends AuthenticatedProps {}

const CommunitiesPage = observer(
  ({ isAuthenticated = true }: CommunitiesPageProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [tabValue, setTabValue] = useState(0);
    const [communities, setCommunities] = useState<Community[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Fetch communities data
      setLoading(true);
      // This would be an API call in a real app
      setTimeout(() => {
        const mockCommunities = [
          {
            id: "c1",
            name: "New Parents Hub",
            description:
              "A community for new parents to discuss baby products, share experiences, and support each other.",
            memberCount: 2453,
            postCount: 1287,
            category: "Parenting",
            tags: ["Baby", "Newborn", "Parenting"],
            image:
              "https://images.unsplash.com/photo-1519689680058-324335c77eba",
            isJoined: true,
          },
          {
            id: "c2",
            name: "Running Enthusiasts",
            description:
              "Find the perfect running shoes and gear. Share your experiences and get advice from fellow runners.",
            memberCount: 5621,
            postCount: 3842,
            category: "Sports",
            tags: ["Running", "Shoes", "Fitness"],
            image:
              "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8",
            isJoined: false,
          },
          {
            id: "c3",
            name: "Tech Gadget Reviews",
            description:
              "Discuss the latest tech gadgets, share reviews, and get recommendations from tech enthusiasts.",
            memberCount: 8932,
            postCount: 6721,
            category: "Technology",
            tags: ["Gadgets", "Reviews", "Tech"],
            image:
              "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
            isJoined: true,
          },
          {
            id: "c4",
            name: "Home Decor Ideas",
            description:
              "Share your home decor ideas, get inspiration, and find the perfect products for your space.",
            memberCount: 4215,
            postCount: 2876,
            category: "Home",
            tags: ["Decor", "Interior", "Design"],
            image:
              "https://images.unsplash.com/photo-1513694203232-719a280e022f",
            isJoined: false,
          },
          {
            id: "c5",
            name: "Parents of Tweens",
            description:
              "Navigate the challenges of parenting 8-12 year olds. Product recommendations and advice.",
            memberCount: 3187,
            postCount: 1954,
            category: "Parenting",
            tags: ["Tweens", "Children", "Parenting"],
            image:
              "https://images.unsplash.com/photo-1444840535719-195841cb6e2d",
            isJoined: false,
          },
          {
            id: "c6",
            name: "Senior Living Solutions",
            description:
              "Products and ideas to help seniors live comfortably and independently.",
            memberCount: 2765,
            postCount: 1832,
            category: "Lifestyle",
            tags: ["Seniors", "Elderly", "Accessibility"],
            image:
              "https://images.unsplash.com/photo-1447069387593-a5de0862481e",
            isJoined: false,
          },
        ];

        setCommunities(mockCommunities);
        setLoading(false);
      }, 1000);
    }, []);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
      setTabValue(newValue);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    };

    const filteredCommunities = communities.filter(
      (community: any) =>
        community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        community.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        community.tags.some((tag: string) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

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
            <Typography variant="h2" component="h1" sx={{ fontWeight: 700 }}>
              Communities
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              component={Link}
              to="/communities/create"
            >
              Create Community
            </Button>
          </Box>

          <TextField
            fullWidth
            placeholder="Search communities..."
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ mb: 4 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          {!searchQuery && (
            <>
              <FeaturedCommunities />
              <Divider sx={{ my: 4 }} />
            </>
          )}

          <Box sx={{ mb: 4 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="community tabs"
            >
              <Tab label="All Communities" />
              <Tab label="My Communities" />
              <Tab label="Recommended" />
            </Tabs>
          </Box>

          {!searchQuery && tabValue === 2 ? (
            <RecommendedCommunities />
          ) : (
            <>
              {!searchQuery && tabValue === 0 && <CommunityCategories />}

              <Grid container spacing={3}>
                {filteredCommunities
                  .filter(
                    (community: any) => tabValue !== 1 || community.isJoined
                  )
                  .map((community: any) => (
                    <Grid item xs={12} sm={6} md={4} key={community.id}>
                      <CommunityCard community={community} />
                    </Grid>
                  ))}
              </Grid>
            </>
          )}
        </Container>
      </>
    );
  }
);

export default CommunitiesPage;
