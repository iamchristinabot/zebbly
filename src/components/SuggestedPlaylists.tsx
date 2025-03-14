import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Avatar,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Playlist } from '../types';

interface SuggestedPlaylistsProps {
  playlists: Playlist[];
}

const SuggestedPlaylists: React.FC<SuggestedPlaylistsProps> = ({ playlists }) => {
  const theme = useTheme();

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        Suggested Playlists
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {playlists.map((playlist) => (
          <Card
            key={playlist.id}
            elevation={0}
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
            }}
          >
            <CardActionArea
              component={Link}
              to={`/playlists/${playlist.id}`}
              sx={{
                display: 'flex',
                alignItems: 'stretch',
                height: '100%',
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: 100, height: 100, objectFit: 'cover' }}
                image={playlist.coverImage}
                alt={playlist.title}
              />
              <CardContent sx={{ flex: 1, p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar
                    src={playlist.creator.avatar}
                    alt={playlist.creator.name}
                    sx={{ width: 24, height: 24, mr: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {playlist.creator.name}
                  </Typography>
                </Box>
                
                <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                  {playlist.title}
                </Typography>
                
                <Typography variant="caption" color="text.secondary" display="block">
                  {playlist.itemCount} items • {playlist.likes} likes
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default SuggestedPlaylists; 