import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes, useParams } from 'react-router-dom';
import { StoresProvider } from './hooks/useStores';
import { rootStore } from './stores/rootStore';
import theme from './theme';

// Pages
import AddToPlaylistPage from './pages/AddToPlaylistPage';
import AIProductDiscoveryPage from './pages/AIProductDiscoveryPage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryPlaylistsPage from './pages/CategoryPlaylistsPage';
import CommunitiesPage from './pages/CommunitiesPage';
import CommunityDetailPage from './pages/CommunityDetailPage';
import CreateProductPlaylistPage from './pages/CreateProductPlaylistPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MarketingPage from './pages/MarketingPage';
import PeopleYouMightLikePage from './pages/PeopleYouMightLikePage';
import PostCreationPage from './pages/PostCreationPage';
import ProductFeedPage from './pages/ProductFeedPage';
import ProductPlaylistDetailPage from './pages/ProductPlaylistDetailPage';
import ProductPlaylistsPage from './pages/ProductPlaylistsPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import SettingsPage from './pages/SettingsPage';
import AddProfilePage from './pages/shopping-profiles/AddProfilePage';
import EditProfilePage from './pages/shopping-profiles/EditProfilePage';
import ShoppingAssistantPage from './pages/ShoppingAssistantPage';
import ShoppingProfilesPage from './pages/ShoppingProfilesPage';
import StyleTwinsPage from './pages/StyleTwinsPage';

// Wrapper component to handle user profile routes
const UserProfileWrapper = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const { userId } = useParams();
  if (!userId) return null;
  return <ProfilePage isAuthenticated={isAuthenticated} userId={userId} />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to true for development
  
  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    return <Navigate to="/" replace />;
  };

  return (
    <StoresProvider store={rootStore}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            {isAuthenticated ? (
              <>
                <Route path="/" element={<HomePage isAuthenticated={true} />} />
                <Route path="/profile" element={<ProfilePage isAuthenticated={true} userId="me" />} />
                <Route path="/profile/:userId" element={<UserProfileWrapper isAuthenticated={true} />} />
                <Route path="/feed" element={<ProductFeedPage isAuthenticated={true} />} />
                <Route path="/categories" element={<CategoriesPage isAuthenticated={true} />} />
                <Route path="/search" element={<SearchPage isAuthenticated={true} />} />
                <Route path="/create" element={<PostCreationPage isAuthenticated={true} />} />
                <Route path="/ai-discover" element={<AIProductDiscoveryPage isAuthenticated={true} />} />
                <Route path="/style-twins" element={<StyleTwinsPage isAuthenticated={true} />} />
                <Route path="/style-twins/:profileId" element={<StyleTwinsPage isAuthenticated={true} />} />
                <Route path="/shopping-profiles" element={<ShoppingProfilesPage isAuthenticated={true} />} />
                <Route path="/shopping-profiles/add" element={<AddProfilePage isAuthenticated={true} />} />
                <Route path="/shopping-profiles/edit/:profileId" element={<EditProfilePage />} />
                <Route path="/settings" element={<SettingsPage isAuthenticated={true} />} />
                <Route path="/people" element={<PeopleYouMightLikePage isAuthenticated={true} />} />
                <Route path="/communities" element={<CommunitiesPage isAuthenticated={true} />} />
                <Route path="/communities/:communityId" element={<CommunityDetailPage isAuthenticated={true} />} />
                <Route path="/logout" element={<LoginPage onLogin={handleLogin} />} action={handleLogout} />
                <Route path="/shopping-assistant" element={<ShoppingAssistantPage isAuthenticated={true} />} />
                <Route path="/product-playlists" element={
                  <ProductPlaylistsPage 
                    isAuthenticated={isAuthenticated} 
                    productPlaylistStore={rootStore.productPlaylistStore}
                  />
                } />
                <Route path="/product-playlists/:playlistId" element={
                  <ProductPlaylistDetailPage 
                    isAuthenticated={isAuthenticated}
                    productPlaylistStore={rootStore.productPlaylistStore}
                  />
                } />
                <Route path="/product-playlists/create" element={
                  <CreateProductPlaylistPage 
                    isAuthenticated={isAuthenticated} 
                    productPlaylistStore={rootStore.productPlaylistStore} 
                  />
                } />
                <Route path="/product-playlists/:playlistId/add" element={
                  <AddToPlaylistPage 
                    isAuthenticated={isAuthenticated} 
                    productPlaylistStore={rootStore.productPlaylistStore} 
                  />
                } />
                <Route 
                  path="/categories/:categoryId" 
                  element={
                    <CategoryPlaylistsPage 
                      productPlaylistStore={rootStore.productPlaylistStore}
                      isAuthenticated={true}
                    />
                  } 
                />
              </>
            ) : (
              <>
                <Route path="/" element={<MarketingPage />} />
                <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Routes>
        </Router>
      </ThemeProvider>
    </StoresProvider>
  );
}

export default App; 