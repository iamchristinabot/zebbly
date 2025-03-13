import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Avatar,
  Badge,
  InputBase,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import StyleIcon from '@mui/icons-material/Style';
import ZebblyLogo from './ZebblyLogo';

// Search bar component
const SearchBar = () => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: 20,
        backgroundColor: theme.palette.brand.lightGray,
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
        marginRight: 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: 3,
          width: 'auto',
        },
        display: { xs: 'none', sm: 'block' }
      }}
    >
      <Box sx={{ padding: '0 16px', height: '100%', position: 'absolute', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <SearchIcon />
      </Box>
      <InputBase
        placeholder="Search…"
        sx={{
          color: 'inherit',
          padding: '8px 8px 8px 0',
          paddingLeft: `calc(1em + 32px)`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('md')]: {
            width: '20ch',
          },
        }}
      />
    </Box>
  );
};

// Navigation button component
const NavButton = ({ children, active, startIcon, ...props }) => {
  const theme = useTheme();
  
  return (
    <Button
      fullWidth
      sx={{
        justifyContent: 'flex-start',
        padding: '8px 16px',
        marginBottom: 1,
        borderRadius: 2,
        color: active ? theme.palette.primary.main : theme.palette.text.primary,
        backgroundColor: active ? theme.palette.primary.light + '20' : 'transparent',
        '&:hover': {
          backgroundColor: active ? theme.palette.primary.light + '30' : theme.palette.action.hover,
        },
      }}
      startIcon={startIcon}
      {...props}
    >
      {children}
    </Button>
  );
};

// Authenticated navigation component
const AuthenticatedNav = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const drawer = (
    <Box sx={{ width: 280, pt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <ZebblyLogo width={100} height={32} />
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <NavButton 
          component={Link}
          to="/"
          active={isActive('/') ? 1 : 0}
          startIcon={<HomeIcon />}
        >
          Home
        </NavButton>
        
        <NavButton 
          component={Link}
          to="/feed"
          active={isActive('/feed') ? 1 : 0}
          startIcon={<DynamicFeedIcon />}
        >
          Feed
        </NavButton>
        
        <NavButton 
          component={Link}
          to="/categories"
          active={isActive('/categories') ? 1 : 0}
          startIcon={<CategoryIcon />}
        >
          Categories
        </NavButton>
        
        <NavButton 
          component={Link}
          to="/people"
          active={isActive('/people') ? 1 : 0}
          startIcon={<PeopleIcon />}
        >
          People
        </NavButton>
        
        <NavButton 
          component={Link}
          to="/ai-chat"
          active={isActive('/ai-chat') ? 1 : 0}
          startIcon={<SmartToyIcon />}
        >
          AI Chat
        </NavButton>
        
        <NavButton 
          component={Link}
          to="/style-twins"
          active={isActive('/style-twins') ? 1 : 0}
          startIcon={<StyleIcon />}
        >
          Style Twins
        </NavButton>
        
        <NavButton 
          component={Link}
          to="/ai-discover"
          active={isActive('/ai-discover') ? 1 : 0}
          startIcon={<AutoAwesomeIcon />}
        >
          AI Discovery
        </NavButton>
        
        <Divider sx={{ my: 2 }} />
        
        <NavButton 
          component={Link}
          to="/profile"
          active={isActive('/profile') ? 1 : 0}
          startIcon={<PersonIcon />}
        >
          Profile
        </NavButton>
        
        <NavButton 
          component={Link}
          to="/settings"
          active={isActive('/settings') ? 1 : 0}
          startIcon={<SettingsIcon />}
        >
          Settings
        </NavButton>
      </Box>
    </Box>
  );
  
  return (
    <>
      <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: `1px solid ${theme.palette.brand.lightGray}` }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <ZebblyLogo width={100} height={32} />
          </Box>
          
          <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 4 }}>
            <Button 
              component={Link} 
              to="/"
              color="inherit"
              sx={{ 
                mx: 1,
                fontWeight: isActive('/') ? 'bold' : 'normal',
                borderBottom: isActive('/') ? `2px solid ${theme.palette.primary.main}` : 'none'
              }}
            >
              Home
            </Button>
            <Button 
              component={Link} 
              to="/feed"
              color="inherit"
              sx={{ 
                mx: 1,
                fontWeight: isActive('/feed') ? 'bold' : 'normal',
                borderBottom: isActive('/feed') ? `2px solid ${theme.palette.primary.main}` : 'none'
              }}
            >
              Feed
            </Button>
            <Button 
              component={Link} 
              to="/categories"
              color="inherit"
              sx={{ 
                mx: 1,
                fontWeight: isActive('/categories') ? 'bold' : 'normal',
                borderBottom: isActive('/categories') ? `2px solid ${theme.palette.primary.main}` : 'none'
              }}
            >
              Categories
            </Button>
            <Button 
              component={Link} 
              to="/people"
              color="inherit"
              sx={{ 
                mx: 1,
                fontWeight: isActive('/people') ? 'bold' : 'normal',
                borderBottom: isActive('/people') ? `2px solid ${theme.palette.primary.main}` : 'none'
              }}
            >
              People
            </Button>
          </Box>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SearchBar />
            
            <IconButton color="inherit" sx={{ ml: 1 }}>
              <Badge badgeContent={3} color="primary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              component={Link}
              to="/create"
              sx={{ ml: 2, display: { xs: 'none', sm: 'flex' } }}
            >
              Create
            </Button>
            
            <Button
              variant="contained"
              color="primary"
              startIcon={<AutoAwesomeIcon />}
              component={Link}
              to="/ai-create"
              sx={{ ml: 1, display: { xs: 'none', sm: 'flex' } }}
            >
              AI Create
            </Button>
            
            <Button
              variant="contained"
              color="secondary"
              startIcon={<SmartToyIcon />}
              component={Link}
              to="/ai-chat"
              sx={{ ml: 1, display: { xs: 'none', sm: 'flex' } }}
            >
              AI Chat
            </Button>
            
            <Button
              variant="outlined"
              color="primary"
              startIcon={<StyleIcon />}
              component={Link}
              to="/style-twins"
              sx={{ ml: 1, display: { xs: 'none', sm: 'flex' } }}
            >
              Style Twins
            </Button>
            
            <IconButton 
              sx={{ ml: 2 }}
              onClick={() => navigate('/profile')}
            >
              <Avatar sx={{ width: 32, height: 32 }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

// Unauthenticated navigation component
const UnauthenticatedNav = () => {
  const theme = useTheme();
  
  return (
    <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: `1px solid ${theme.palette.brand.lightGray}` }}>
      <Toolbar>
        <ZebblyLogo width={100} height={32} />
        
        <Box sx={{ flexGrow: 1 }} />
        
        <Button color="inherit" component={Link} to="/login">
          Log In
        </Button>
        <Button variant="contained" color="primary" component={Link} to="/login" sx={{ ml: 2 }}>
          Sign Up
        </Button>
      </Toolbar>
    </AppBar>
  );
};

// Main header component
const Header = ({ isAuthenticated }) => {
  return isAuthenticated ? <AuthenticatedNav /> : <UnauthenticatedNav />;
};

export default Header; 