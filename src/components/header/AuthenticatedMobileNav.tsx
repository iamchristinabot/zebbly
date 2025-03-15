import { Button, ButtonProps, useTheme, Box, Drawer, IconButton, AppBar, Toolbar, Divider } from '@mui/material';
import React, { useState } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleIcon from '@mui/icons-material/People';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import StyleIcon from '@mui/icons-material/Style';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import ZebblyLogo from '../ZebblyLogo';
import { useLocation } from 'react-router-dom';

interface MobileNavButtonProps extends Omit<ButtonProps, 'startIcon'> {
  children: React.ReactNode;
  active: boolean;
  startIcon: React.ReactNode;
  to?: LinkProps['to'];
  component?: React.ElementType;
  href?: string;
}

export const MobileNavButton = ({ children, active, startIcon, ...props }: MobileNavButtonProps) => {
  
  return (
    <Button
      fullWidth
      sx={{
        justifyContent: 'flex-start',
        padding: '8px 16px',
        marginBottom: 1,
        borderRadius: 2,
        color: active ? 'primary.main' : 'text.primary',
        bgcolor: active ? 'primary.lighter' : 'transparent',
        '&:hover': {
          bgcolor: active ? 'primary.light' : 'action.hover',
        },
      }}
      startIcon={startIcon}
      {...props}
    >
      {children}
    </Button>
  );
};


const MobileDrawer = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <Box sx={{ width: 280, pt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <ZebblyLogo width={100} height={32} />
        </Link>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <MobileNavButton 
          component={Link}
          to="/"
          active={isActive('/')}
          startIcon={<HomeIcon />}
        >
          Home
        </MobileNavButton>
        
        <MobileNavButton 
          component={Link}
          to="/categories"
          active={isActive('/categories')}
          startIcon={<CategoryIcon />}
        >
          Categories
        </MobileNavButton>
        
        <MobileNavButton 
          component={Link}
          to="/people"
          active={isActive('/people')}
          startIcon={<PeopleIcon />}
        >
          People
        </MobileNavButton>
        
        <MobileNavButton 
          component={Link}
          to="/shopping-assistant"
          active={isActive('/shopping-assistant')}
          startIcon={<SmartToyIcon />}
        >
          Shopping Assistant
        </MobileNavButton>
        
        <MobileNavButton 
          component={Link}
          to="/style-twins"
          active={isActive('/style-twins')}
          startIcon={<StyleIcon />}
        >
          Style Twins
        </MobileNavButton>
        
        <MobileNavButton 
          component={Link}
          to="/ai-discover"
          active={isActive('/ai-discover')}
          startIcon={<AutoAwesomeIcon />}
        >
          AI Discovery
        </MobileNavButton>
        
        <Divider sx={{ my: 2 }} />
        
        <MobileNavButton 
          component={Link}
          to="/profile"
          active={isActive('/profile')}
          startIcon={<PersonIcon />}
        >
          Profile
        </MobileNavButton>
        
        <MobileNavButton 
          component={Link}
          to="/settings"
          active={isActive('/settings')}
          startIcon={<SettingsIcon />}
        >
          Settings
        </MobileNavButton>
      </Box>
    </Box>
  );
};

const AuthenticatedMobileNav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar 
        position="static" 
        color="default" 
        elevation={0} 
        sx={{ 
          borderBottom: `1px solid ${theme.palette.brand.lightGray}`,
          display: { sm: 'none' }
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <ZebblyLogo width={100} height={32} />
          </Link>
        </Toolbar>
      </AppBar>
      
      <Box component="nav" sx={{ display: { sm: 'none' } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
          }}
        >
          <MobileDrawer />
        </Drawer>
      </Box>
    </>
  );
};

export default AuthenticatedMobileNav; 