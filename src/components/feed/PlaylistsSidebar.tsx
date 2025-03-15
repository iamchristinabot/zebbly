import React from 'react';
import { Paper, Box, Typography, Divider, CircularProgress, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../hooks/useStores';
import { ShoppingProfileType } from '../../stores/socialFeedStore';
import SuggestedPlaylists from '../SuggestedPlaylists';

interface PlaylistsSidebarProps {
  activeProfile: ShoppingProfileType;
}

const PlaylistsSidebar = observer(({ activeProfile }: PlaylistsSidebarProps) => {
  const theme = useTheme();
  const { socialFeedStore } = useStores();

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3,
        mb: 3,
        border: `1px solid ${theme.palette.brand.lightGray}`,
        borderRadius: 2,
        position: { md: 'sticky' },
        top: { md: 24 }
      }}
    >
      <Typography variant="h6" gutterBottom>
        Style Playlists For You
      </Typography>
      <Divider sx={{ mb: 2 }} />
      
      {socialFeedStore.isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress size={24} />
        </Box>
      ) : (
        <SuggestedPlaylists 
          playlists={socialFeedStore.suggestedPlaylists.filter(
            playlist => playlist.profileTypes?.includes(activeProfile)
          )} 
        />
      )}
    </Paper>
  );
});

export default PlaylistsSidebar; 