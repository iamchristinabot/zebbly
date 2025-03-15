import React from 'react';
import { Paper, Box, Typography, Avatar, Stack, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../hooks/useStores';
import { ShoppingProfileType } from '../../stores/socialFeedStore';

interface StyleTwinsSidebarProps {
  activeProfile: ShoppingProfileType;
}

const StyleTwinsSidebar = observer(({ activeProfile }: StyleTwinsSidebarProps) => {
  const theme = useTheme();
  const { socialFeedStore } = useStores();
  const styleTwins = socialFeedStore.styleTwinsByProfile.get(activeProfile) || [];

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        mb: 3,
        border: `1px solid ${theme.palette.brand.lightGray}`,
        borderRadius: 2
      }}
    >
      <Typography variant="h6" gutterBottom>
        Your Style Twins
      </Typography>
      <Stack spacing={2}>
        {styleTwins.map(twin => (
          <Box 
            key={twin.id}
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: 2
            }}
          >
            <Avatar
              src={twin.avatar}
              alt={twin.name}
              sx={{ width: 48, height: 48 }}
            />
            <Box>
              <Typography variant="subtitle2">
                {twin.name}
              </Typography>
              <Typography variant="caption" color="primary" sx={{ fontWeight: 'bold' }}>
                {twin.styleScores?.[activeProfile]}% match
              </Typography>
            </Box>
          </Box>
        ))}
        {styleTwins.length === 0 && (
          <Typography variant="body2" color="text.secondary" align="center">
            No style twins found for {activeProfile} style
          </Typography>
        )}
      </Stack>
    </Paper>
  );
});

export default StyleTwinsSidebar; 