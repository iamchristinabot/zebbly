import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CategoryIcon from '@mui/icons-material/Category';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import StyleIcon from '@mui/icons-material/Style';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  useTheme
} from '@mui/material';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ZebblyLogo from '../ZebblyLogo';
import NavButton from './NavButton';
import SearchBar from './SearchBar';

export const AuthenticatedNav = () => {
  const theme = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [browseMenuAnchorEl, setBrowseMenuAnchorEl] = useState<HTMLElement | null>(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<HTMLElement | null>(null);
  const isBrowseMenuOpen = Boolean(browseMenuAnchorEl);
  const isUserMenuOpen = Boolean(userMenuAnchorEl);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
          href="/"
          active={isActive('/')}
          startIcon={<HomeIcon />}
        >
          Home
        </NavButton>
        
        <NavButton 
          component={Link}
          href="/feed"
          active={isActive('/feed')}
          startIcon={<DynamicFeedIcon />}
        >
          Feed
        </NavButton>
        
        <NavButton 
          component={Link}
          href="/categories"
          active={isActive('/categories')}
          startIcon={<CategoryIcon />}
        >
          Categories
        </NavButton>
        
        <NavButton 
          component={Link}
          href="/people"
          active={isActive('/people')}
          startIcon={<PeopleIcon />}
        >
          People
        </NavButton>
        
        <NavButton 
          component={Link}
          href="/shopping-assistant"
          active={isActive('/shopping-assistant')}
          startIcon={<SmartToyIcon />}
        >
          Shopping Assistant
        </NavButton>
        
        <NavButton 
          component={Link}
          href="/style-twins"
          active={isActive('/style-twins')}
          startIcon={<StyleIcon />}
        >
          Style Twins
        </NavButton>
        
        <NavButton 
          component={Link}
          href="/ai-discover"
          active={isActive('/ai-discover')}
          startIcon={<AutoAwesomeIcon />}
        >
          AI Discovery
        </NavButton>
        
        <NavButton 
          component={Link}
          href="/product-playlists"
          active={isActive('/product-playlists')}
          startIcon={<DynamicFeedIcon />}
        >
          Product Playlists
        </NavButton>
        
        <NavButton 
          component={Link}
          href="/shopping-profiles"
          active={isActive('/shopping-profiles')}
          startIcon={<AccountBoxIcon />}
        >
          Shopping Profiles
        </NavButton>
        
        <Divider sx={{ my: 2 }} />
        
        <NavButton 
          component={Link}
          href="/profile"
          active={isActive('/profile')}
          startIcon={<PersonIcon />}
        >
          Profile
        </NavButton>
        
        <NavButton 
          component={Link}
          href="/settings"
          active={isActive('/settings')}
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

export default AuthenticatedNav; 