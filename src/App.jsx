import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Typography, Box } from '@mui/material';
import { StoreContext } from './stores/storeContext';
import rootStore from './stores/rootStore';
import Counter from './components/Counter';
import theme from './theme';

function App() {
  return (
    <StoreContext.Provider value={rootStore}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="sm">
          <Box sx={{ my: 4, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              React + Vite + Material UI + MobX
            </Typography>
            
            <Counter />
            
            <Typography variant="body1">
              Edit <code>src/stores/counterStore.js</code> to modify the state logic
            </Typography>
          </Box>
        </Container>
      </ThemeProvider>
    </StoreContext.Provider>
  );
}

export default App; 