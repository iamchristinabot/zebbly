import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  InputBase, 
  Box, 
  Button, 
  IconButton, 
  Avatar,
  useTheme,
  Container,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  List,
  ListItem,
  Divider
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import CategoryIcon from '@mui/icons-material/Category';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import ZebblyLogo from './ZebblyLogo';
import PeopleIcon from '@mui/icons-material/People';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.08),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(3),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const NavButton = styled(Button)(({ theme, active }) => ({
  marginRight: theme.spacing(2),
  fontWeight: 500,
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
  },
}));

const AuthenticatedNav = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const handleNavigate = (path) => {
    navigate(path);
    handleMenuClose();
    setMobileOpen(false);
  };
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  const menuId = 'primary-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
          mt: 1.5,
          width: 200,
          '& .MuiMenuItem-root': {
            px: 2,
            py: 1.5,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem onClick={() => handleNavigate('/profile')}>
        <ListItemIcon>
          <PersonIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Profile</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleNavigate('/settings')}>
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Settings</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={() => handleNavigate('/logout')}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Logout</ListItemText>
      </MenuItem>
    </Menu>
  );
  
  const drawer = (
    <Box sx={{ width: 280, pt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <ZebblyLogo width={100} height={32} />
      </Box>
      <Divider />
      <List>
        <ListItem button component={Link} to="/" selected={isActive('/')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/feed" selected={isActive('/feed')}>
          <ListItemIcon>
            <ExploreIcon />
          </ListItemIcon>
          <ListItemText primary="Feed" />
        </ListItem>
        <ListItem button component={Link} to="/categories" selected={isActive('/categories')}>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItem>
        <ListItem button component={Link} to="/people" selected={isActive('/people')}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="People" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button component={Link} to="/profile" selected={isActive('/profile')}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button component={Link} to="/settings" selected={isActive('/settings')}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button component={Link} to="/logout">
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );
  
  return (
    <>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
      </Box>
      
      <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
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
          startIcon={<ExploreIcon />}
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
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AutoAwesomeIcon />}
          component={Link}
          to="/ai-create"
          sx={{ ml: 1 }}
        >
          AI Create
        </Button>
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <Avatar 
            alt="User" 
            src="/avatar.jpg" 
            sx={{ 
              width: 40,
              height: 40,
              bgcolor: theme.palette.brand.lightTeal 
            }}
          >
            U
          </Avatar>
        </IconButton>
      </Box>
      
      {renderMenu}
      
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

const UnauthenticatedNav = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <Button 
        color="inherit" 
        component={Link}
        to="/login"
        sx={{ 
          mr: 2, 
          fontWeight: 500,
          fontSize: '1rem'
        }}
      >
        Log In
      </Button>
      <Button 
        variant="contained"
        color="primary"
        component={Link}
        to="/signup"
        sx={{ 
          borderRadius: 20,
          px: 3,
          py: 1,
          fontWeight: 600
        }}
      >
        Sign Up
      </Button>
    </>
  );
};

const Header = ({ isAuthenticated = true }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search?q=${e.target.value}`);
    }
  };
  
  return (
    <AppBar position="static" color="default" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ mr: 2 }}>
              <ZebblyLogo 
                width={120} 
                height={40} 
                sx={{ 
                  color: theme.palette.text.primary,
                  cursor: 'pointer'
                }}
                onClick={() => navigate('/')}
              />
            </Box>
            
            {isAuthenticated && (
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search Target, Amazon, Walmart..."
                  inputProps={{ 'aria-label': 'search' }}
                  onKeyPress={handleSearchSubmit}
                />
              </Search>
            )}
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isAuthenticated ? <AuthenticatedNav /> : <UnauthenticatedNav />}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header; 