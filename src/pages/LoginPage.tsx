import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Divider,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const LoginPage = ({ onLogin }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, this would validate credentials
    if (onLogin) {
      onLogin();
    }
    navigate('/');
  };
  
  return (
    <>
      <Header isAuthenticated={false} />
      
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            border: `1px solid ${theme.palette.brand.lightGray}`,
            borderRadius: 2
          }}
        >
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Log In to Zebbly
          </Typography>
          
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Welcome back! Log in to continue discovering products you'll love.
          </Typography>
          
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email Address"
              margin="normal"
              required
              autoFocus
            />
            
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              required
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
          </form>
          
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>
          
          <Button
            fullWidth
            variant="outlined"
            size="large"
            onClick={() => navigate('/signup')}
          >
            Create New Account
          </Button>
        </Paper>
      </Container>
    </>
  );
};

export default LoginPage; 