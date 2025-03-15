import React from 'react';
import {
  Paper,
  Box,
  Avatar,
  Typography,
  Button,
  Stack,
  Chip,
  useTheme,
  ImageList,
  ImageListItem,
  Link
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Creator, ShoppingProfileType } from '../../stores/socialFeedStore';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';

interface StyleTwinSuggestionFeedItemProps {
  creator: Creator;
  profileType: ShoppingProfileType;
  onFollow: (creatorId: string) => void;
  isFollowing: boolean;
}

const StyleTwinSuggestionFeedItem: React.FC<StyleTwinSuggestionFeedItemProps> = ({
  creator,
  profileType,
  onFollow,
  isFollowing
}) => {
  const theme = useTheme();
  const styleScore = creator.styleScores?.[profileType] ?? 0;

  // Mock recent posts - in production, this would come from the creator object
  const recentPosts = [
    {
      id: '1',
      image: `https://picsum.photos/seed/${creator.id}-1/200/200`,
      title: 'Summer Dress'
    },
    {
      id: '2',
      image: `https://picsum.photos/seed/${creator.id}-2/200/200`,
      title: 'Casual Sneakers'
    },
    {
      id: '3',
      image: `https://picsum.photos/seed/${creator.id}-3/200/200`,
      title: 'Denim Jacket'
    }
  ];

  const getProfileTypeColor = (type: ShoppingProfileType) => {
    switch (type) {
      case 'casual': return theme.palette.info.main;
      case 'workwear': return theme.palette.success.main;
      case 'evening': return theme.palette.secondary.main;
      case 'athletic': return theme.palette.warning.main;
      default: return theme.palette.primary.main;
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 3,
        border: `1px solid ${theme.palette.brand.lightGray}`,
        borderRadius: 2,
        background: `linear-gradient(to right, ${theme.palette.background.paper}, ${theme.palette.background.paper} 60%, ${theme.palette.primary.light}10)`
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Header with avatar and info */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Avatar
              src={creator.avatar}
              alt={creator.name}
              component={RouterLink}
              to={`/profile/${creator.id}`}
              sx={{ 
                width: 64, 
                height: 64,
                border: `2px solid ${getProfileTypeColor(profileType)}`
              }}
            />
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography
                  variant="h6"
                  component={RouterLink}
                  to={`/profile/${creator.id}`}
                  sx={{
                    textDecoration: 'none',
                    color: 'inherit',
                    '&:hover': { color: theme.palette.primary.main }
                  }}
                >
                  {creator.name}
                </Typography>
                <Chip
                  size="small"
                  label={`${styleScore}% Match`}
                  color="primary"
                />
              </Box>
              
              <Stack direction="row" spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Your style twin for
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: getProfileTypeColor(profileType),
                    fontWeight: 'bold',
                    textTransform: 'capitalize'
                  }}
                >
                  {profileType} Style
                </Typography>
              </Stack>
            </Box>
          </Box>

          <Button
            variant={isFollowing ? "outlined" : "contained"}
            onClick={() => onFollow(creator.id)}
            startIcon={isFollowing ? <PersonIcon /> : <PersonAddIcon />}
            sx={{ 
              borderRadius: 5,
              px: 3,
              height: 36,
              alignSelf: 'flex-start',
              backgroundColor: isFollowing ? 'transparent' : getProfileTypeColor(profileType),
              borderColor: getProfileTypeColor(profileType),
              '&:hover': {
                backgroundColor: isFollowing ? 'rgba(0,0,0,0.04)' : getProfileTypeColor(profileType),
                borderColor: getProfileTypeColor(profileType),
              }
            }}
          >
            {isFollowing ? 'Following' : 'Follow Style Twin'}
          </Button>
        </Box>

        {/* Recent posts preview */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          ml: 'calc(64px + 16px)' // Avatar width (64px) + gap (16px)
        }}>
          <ImageList
            sx={{
              display: 'flex',
              gap: 1,
              m: 0
            }}
            cols={3}
          >
            {recentPosts.map((post) => (
              <ImageListItem 
                key={post.id}
                sx={{ 
                  width: 80, 
                  height: 80,
                  flexShrink: 0,
                  overflow: 'hidden',
                  borderRadius: 1
                }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
          <Link
            component={RouterLink}
            to={`/profile/${creator.id}`}
            sx={{ 
              color: 'text.secondary',
              textDecoration: 'none',
              '&:hover': {
                color: getProfileTypeColor(profileType),
                textDecoration: 'underline'
              }
            }}
          >
            <Typography variant="body2">
              View More
            </Typography>
          </Link>
        </Box>
      </Box>
    </Paper>
  );
};

export default StyleTwinSuggestionFeedItem; 