import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { StoreContext } from './stores/storeContext';
import rootStore from './stores/rootStore';
import theme from './theme';

// Pages
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ProductFeedPage from './pages/ProductFeedPage';
import CategoriesPage from './pages/CategoriesPage';
import MarketingPage from './pages/MarketingPage';
import SearchPage from './pages/SearchPage';
import PostCreationPage from './pages/PostCreationPage';
import AIEnhancedPostCreationPage from './pages/AIEnhancedPostCreationPage';
import AIProductDiscoveryPage from './pages/AIProductDiscoveryPage';
import AIChatDiscoveryPage from './pages/AIChatDiscoveryPage';
import AIStyleTwinPage from './pages/AIStyleTwinPage';
import ShoppingProfilesPage from './pages/ShoppingProfilesPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import PeopleYouMightLikePage from './pages/PeopleYouMightLikePage';
import CommunitiesPage from './pages/CommunitiesPage';
import CommunityDetailPage from './pages/CommunityDetailPage';

// Wrapper component to handle user profile routes
const UserProfileWrapper = ({ isAuthenticated }) => {
  const { userId } = useParams();
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
    <StoreContext.Provider value={rootStore}>
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
                <Route path="/ai-create" element={<AIEnhancedPostCreationPage isAuthenticated={true} />} />
                <Route path="/ai-discover" element={<AIProductDiscoveryPage isAuthenticated={true} />} />
                <Route path="/ai-chat" element={<AIChatDiscoveryPage isAuthenticated={true} />} />
                <Route path="/style-twins" element={<AIStyleTwinPage isAuthenticated={true} />} />
                <Route path="/shopping-profiles" element={<ShoppingProfilesPage isAuthenticated={true} />} />
                <Route path="/settings" element={<SettingsPage isAuthenticated={true} />} />
                <Route path="/people" element={<PeopleYouMightLikePage isAuthenticated={true} />} />
                <Route path="/communities" element={<CommunitiesPage isAuthenticated={true} />} />
                <Route path="/communities/:communityId" element={<CommunityDetailPage isAuthenticated={true} />} />
                <Route path="/logout" element={<LoginPage onLogin={handleLogin} />} action={handleLogout} />
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
    </StoreContext.Provider>
  );
}

export default App; 