import { AppBar, Box, Button, Toolbar, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import ZebblyLogo from '../ZebblyLogo';

export const UnauthenticatedNav = () => {
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

export default UnauthenticatedNav; 