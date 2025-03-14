import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Stack,
  useTheme
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Playlist } from '../../types';

interface SuggestedPlaylistsProps {
  playlists: Playlist[];
}

const SuggestedPlaylists: React.FC<SuggestedPlaylistsProps> = ({ playlists }) => {
  const theme = useTheme();

  if (playlists.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 2 }}>
        <Typography variant="body2" color="text.secondary">
          No playlists to suggest at the moment
        </Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={2}>
      {playlists.map((playlist) => (
        <Card
          key={playlist.id}
          elevation={0}
          sx={{
            display: 'flex',
            border: `1px solid ${theme.palette.brand.lightGray}`,
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: 100, height: 100, objectFit: 'cover' }}
            image={playlist.coverImage}
            alt={playlist.title}
          />
          <CardContent sx={{ flex: 1, p: 2 }}>
            <Typography variant="subtitle1" noWrap>
              {playlist.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {playlist.itemCount} items
            </Typography>
            <Button
              component={Link}
              to={`/product-playlists/${playlist.id}`}
              size="small"
              sx={{ mt: 1 }}
            >
              View Playlist
            </Button>
          </CardContent>
        </Card>
      ))}
      
      <Button
        component={Link}
        to="/product-playlists"
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
      >
        See All Playlists
      </Button>
    </Stack>
  );
};

export default SuggestedPlaylists; 