import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/storeContext';
import { Typography, Button, Box } from '@mui/material';

const Counter = observer(() => {
  const { counterStore } = useStore();
  
  return (
    <Box sx={{ textAlign: 'center', my: 4 }}>
      <Typography variant="h5" component="div" gutterBottom>
        Count: {counterStore.count}
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center',
        '& > button': {
          mx: 0.5,
          borderRadius: 1,
          minWidth: 120
        }
      }}>
        <Button 
          variant="contained"
          color="primary"
          onClick={() => counterStore.increment()}
          sx={{ bgcolor: theme => theme.palette.brand.blue }}
        >
          Increment
        </Button>
        <Button 
          variant="contained"
          color="secondary"
          onClick={() => counterStore.decrement()}
          sx={{ bgcolor: theme => theme.palette.brand.lightTeal }}
        >
          Decrement
        </Button>
        <Button 
          variant="contained"
          color="error"
          onClick={() => counterStore.reset()}
          sx={{ bgcolor: theme => theme.palette.brand.pink }}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
});

export default Counter; 