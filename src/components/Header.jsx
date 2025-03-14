import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddIcon from '@mui/icons-material/Add';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CategoryIcon from '@mui/icons-material/Category';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import StyleIcon from '@mui/icons-material/Style';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  useTheme
} from '@mui/material';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  const [browseMenuAnchorEl, setBrowseMenuAnchorEl] = useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const isBrowseMenuOpen = Boolean(browseMenuAnchorEl);
  const isUserMenuOpen = Boolean(userMenuAnchorEl);
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const handleBrowseMenuOpen = (event) => {
    setBrowseMenuAnchorEl(event.currentTarget);
  };
  
  const handleBrowseMenuClose = () => {
    setBrowseMenuAnchorEl(null);
  };
  
  const handleUserMenuOpen = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };
  
  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };
  
  const drawer = (
    <Box sx={{ width: 280, pt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <ZebblyLogo width={100} height={32} />
        </Link>
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
          to="/shopping-assistant"
          active={isActive('/shopping-assistant') ? 1 : 0}
          startIcon={<SmartToyIcon />}
        >
          Shopping Assistant
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
        
        <NavButton 
          component={Link}
          to="/product-playlists"
          active={isActive('/product-playlists') ? 1 : 0}
          startIcon={<DynamicFeedIcon />}
        >
          Product Playlists
        </NavButton>
        
        <NavButton 
          component={Link}
          to="/shopping-profiles"
          active={isActive('/shopping-profiles') ? 1 : 0}
          startIcon={<AccountBoxIcon />}
        >
          Shopping Profiles
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
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <ZebblyLogo width={100} height={32} />
            </Link>
          </Box>
          
          <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 4 }}>
            <SearchBar />
            <Button 
              color="inherit"
              onClick={handleBrowseMenuOpen}
              endIcon={<KeyboardArrowDownIcon />}
              sx={{ 
                mx: 1,
                fontWeight: 'medium',
              }}
            >
              Browse
            </Button>
            <Menu
              anchorEl={browseMenuAnchorEl}
              open={isBrowseMenuOpen}
              onClose={handleBrowseMenuClose}
              MenuListProps={{
                'aria-labelledby': 'browse-button',
              }}
            >
              <MenuItem 
                component={Link} 
                to="/"
                onClick={handleBrowseMenuClose}
                sx={{ 
                  fontWeight: isActive('/') ? 'bold' : 'normal',
                }}
              >
                <ListItemIcon>
                  <HomeIcon fontSize="small" color={isActive('/') ? 'primary' : 'inherit'} />
                </ListItemIcon>
                Home
              </MenuItem>
              <MenuItem 
                component={Link} 
                to="/feed"
                onClick={handleBrowseMenuClose}
                sx={{ 
                  fontWeight: isActive('/feed') ? 'bold' : 'normal',
                }}
              >
                <ListItemIcon>
                  <DynamicFeedIcon fontSize="small" color={isActive('/feed') ? 'primary' : 'inherit'} />
                </ListItemIcon>
                Feed
              </MenuItem>
              <MenuItem 
                component={Link} 
                to="/categories"
                onClick={handleBrowseMenuClose}
                sx={{ 
                  fontWeight: isActive('/categories') ? 'bold' : 'normal',
                }}
              >
                <ListItemIcon>
                  <CategoryIcon fontSize="small" color={isActive('/categories') ? 'primary' : 'inherit'} />
                </ListItemIcon>
                Categories
              </MenuItem>
              <MenuItem 
                component={Link} 
                to="/people"
                onClick={handleBrowseMenuClose}
                sx={{ 
                  fontWeight: isActive('/people') ? 'bold' : 'normal',
                }}
              >
                <ListItemIcon>
                  <PeopleIcon fontSize="small" color={isActive('/people') ? 'primary' : 'inherit'} />
                </ListItemIcon>
                People
              </MenuItem>
              
              <MenuItem 
                component={Link} 
                to="/communities"
                onClick={handleBrowseMenuClose}
                sx={{ 
                  fontWeight: isActive('/communities') ? 'bold' : 'normal',
                }}
              >
                <ListItemIcon>
                  <PeopleIcon fontSize="small" color={isActive('/communities') ? 'primary' : 'inherit'} />
                </ListItemIcon>
                Communities
              </MenuItem>
            </Menu>
          </Box>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
          
            <Button
              variant="text"
              color="primary"
              startIcon={<SmartToyIcon />}
              component={Link}
              to="/shopping-assistant"
              sx={{ ml: 1, display: { xs: 'none', sm: 'flex' } }}
            >
              Shopping Assistant
            </Button>
            
            <Button
              variant="text"
              color="primary"
              startIcon={<StyleIcon />}
              component={Link}
              to="/style-twins"
              sx={{ ml: 1, display: { xs: 'none', sm: 'flex' } }}
            >
              Style Twins
            </Button>
            
            <Button
              variant="text"
              color="primary"
              startIcon={<PeopleIcon />}
              component={Link}
              to="/communities"
              sx={{ ml: 1, display: { xs: 'none', sm: 'flex' } }}
            >
              Communities
            </Button>

            <Button
              variant="text"
              color="primary"
              startIcon={<PlaylistAddIcon />}
              component={Link}
              to="/product-playlists"
              sx={{ ml: 1, display: { xs: 'none', sm: 'flex' } }}
            >
              Product Playlists
            </Button>

            <IconButton color="inherit" sx={{ ml: 1 }}>
              <Badge badgeContent={3} color="primary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            
            <IconButton 
              sx={{ ml: 2 }}
              onClick={handleUserMenuOpen}
              aria-controls={isUserMenuOpen ? 'user-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={isUserMenuOpen ? 'true' : undefined}
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

      <Menu
        id="user-menu"
        anchorEl={userMenuAnchorEl}
        open={isUserMenuOpen}
        onClose={handleUserMenuClose}
        MenuListProps={{
          'aria-labelledby': 'user-button',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem 
          component={Link} 
          to="/profile"
          onClick={handleUserMenuClose}
        >
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem 
          component={Link} 
          to="/shopping-profiles"
          onClick={handleUserMenuClose}
        >
          <ListItemIcon>
            <AccountBoxIcon fontSize="small" />
          </ListItemIcon>
          Shopping Profiles
        </MenuItem>
        <MenuItem 
          component={Link} 
          to="/settings"
          onClick={handleUserMenuClose}
        >
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleUserMenuClose}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

// Unauthenticated navigation component
const UnauthenticatedNav = () => {
  const theme = useTheme();
  
  return (
    <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: `1px solid ${theme.palette.brand.lightGray}` }}>
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <ZebblyLogo width={100} height={32} />
        </Link>
        
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