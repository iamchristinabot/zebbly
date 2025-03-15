import React from 'react';
import { Paper, Tabs, Tab, Chip, useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { ShoppingProfileType } from '../../stores/socialFeedStore';
import { useStores } from '../../hooks/useStores';

interface FeedHeaderProps {
  activeProfile: ShoppingProfileType;
  onProfileChange: (event: React.SyntheticEvent, newValue: ShoppingProfileType) => void;
}

const FeedHeader = observer(({ activeProfile, onProfileChange }: FeedHeaderProps) => {
  const theme = useTheme();
  const { socialFeedStore } = useStores();

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 2, 
        mb: 3,
        border: `1px solid ${theme.palette.brand.lightGray}`,
        borderRadius: 2
      }}
    >
      <Tabs
        value={activeProfile}
        onChange={onProfileChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 2 }}
      >
        <Tab 
          label="Casual" 
          value="casual"
          icon={<Chip 
            size="small" 
            label={socialFeedStore.styleTwinsFeedByProfile.get('casual')?.length || 0} 
          />}
          iconPosition="end"
        />
        <Tab 
          label="Workwear" 
          value="workwear"
          icon={<Chip 
            size="small" 
            label={socialFeedStore.styleTwinsFeedByProfile.get('workwear')?.length || 0}
          />}
          iconPosition="end"
        />
        <Tab 
          label="Evening" 
          value="evening"
          icon={<Chip 
            size="small" 
            label={socialFeedStore.styleTwinsFeedByProfile.get('evening')?.length || 0}
          />}
          iconPosition="end"
        />
        <Tab 
          label="Athletic" 
          value="athletic"
          icon={<Chip 
            size="small" 
            label={socialFeedStore.styleTwinsFeedByProfile.get('athletic')?.length || 0}
          />}
          iconPosition="end"
        />
      </Tabs>
    </Paper>
  );
});

export default FeedHeader; 