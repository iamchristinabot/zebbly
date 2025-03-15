import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CategoryIcon from '@mui/icons-material/Category';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import StyleIcon from '@mui/icons-material/Style';
import { AppBar, Avatar, Badge, Box, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ZebblyLogo from '../ZebblyLogo';
import SearchBar from '../header/SearchBar';

interface AuthenticatedDesktopNavProps {}

const AuthenticatedDesktopNav: React.FC<AuthenticatedDesktopNavProps> = () => {
  const theme = useTheme();
  const location = useLocation();
  const [browseMenuAnchorEl, setBrowseMenuAnchorEl] = useState<HTMLElement | null>(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<HTMLElement | null>(null);
  
  const isBrowseMenuOpen = Boolean(browseMenuAnchorEl);
  const isUserMenuOpen = Boolean(userMenuAnchorEl);
  
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };
  
  const handleBrowseMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setBrowseMenuAnchorEl(event.currentTarget);
  };
  
  const handleBrowseMenuClose = () => {
    setBrowseMenuAnchorEl(null);
  };
  
  const handleUserMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setUserMenuAnchorEl(event.currentTarget);
  };
  
  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  return (
    <AppBar 
      position="static" 
      color="default" 
      elevation={0} 
      sx={{ 
        borderBottom: `1px solid ${theme.palette.brand.lightGray}`,
        display: { xs: 'none', sm: 'block' }
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <ZebblyLogo width={100} height={32} />
          </Link>
          
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 4 }}>
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
          </Box>
        </Box>

        <Box sx={{ flexGrow: 1 }} />
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            variant="text"
            color={isActive('/shopping-assistant') ? 'primary' : 'inherit'}
            startIcon={<SmartToyIcon />}
            component={Link}
            to="/shopping-assistant"
            sx={{ ml: 1, display: { xs: 'none', sm: 'flex' } }}
          >
            Shopping Assistant
          </Button>

          <Button
            variant="text"
            color={isActive('/communities') ? 'primary' : 'inherit'}
            startIcon={<PeopleIcon />}
            component={Link}
            to="/communities"
            sx={{ ml: 1, display: { xs: 'none', sm: 'flex' } }}
          >
            Communities
          </Button>
          
          <Button
            variant="text"
            color={isActive('/style-twins') ? 'primary' : 'inherit'}
            startIcon={<StyleIcon />}
            component={Link}
            to="/style-twins"
            sx={{ ml: 1, display: { xs: 'none', sm: 'flex' } }}
          >
            Style Twins
          </Button>

          <Button
            variant="text"
            color={isActive('/style-playlists') ? 'primary' : 'inherit'}
            startIcon={<PlaylistAddIcon />}
            component={Link}
            to="/style-playlists"
            sx={{ ml: 1, display: { xs: 'none', sm: 'flex' } }}
          >
            Style Playlists
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
      </Menu>

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
    </AppBar>
  );
};

export default AuthenticatedDesktopNav; 