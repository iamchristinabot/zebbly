import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Grid } from '@mui/material';
import Header from '../components/header/Header';
import { useStores } from '../hooks/useStores';
import { ShoppingProfileType } from '../stores/socialFeedStore';
import CreatePost from '../components/feed/CreatePost';
import FeedList from '../components/feed/FeedList';
import StyleTwinsSidebar from '../components/feed/StyleTwinsSidebar';
import PlaylistsSidebar from '../components/feed/PlaylistsSidebar';
import FeedHeader from 'src/components/feed/FeedHeader';
import CompleteYourProfile from 'src/components/feed/CompleteYourProfile';

interface ProductFeedPageProps {
  isAuthenticated?: boolean;
}

const ProductFeedPage = observer(({ isAuthenticated = true }: ProductFeedPageProps) => {
  const { socialFeedStore } = useStores();
  const [activeProfile, setActiveProfile] = useState<ShoppingProfileType>('casual');
  
  useEffect(() => {
    socialFeedStore.fetchFeed();
    socialFeedStore.fetchSuggestedPlaylists();
  }, [socialFeedStore]);
  
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Main Feed */}
          <Grid item xs={12} md={8}>
            <CompleteYourProfile/>

            <CreatePost activeProfile={activeProfile} />

            <FeedList activeProfile={activeProfile} />
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <StyleTwinsSidebar activeProfile={activeProfile} />
            <PlaylistsSidebar activeProfile={activeProfile} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
});

export default ProductFeedPage; 