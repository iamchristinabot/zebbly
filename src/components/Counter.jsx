import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/storeContext';
import { Typography, Button, ButtonGroup, Box } from '@mui/material';

const Counter = observer(() => {
  const { counterStore } = useStore();
  
  return (
    <Box sx={{ textAlign: 'center', my: 2 }}>
      <Typography variant="h5" component="div" gutterBottom>
        Count: {counterStore.count}
      </Typography>
      
      <ButtonGroup variant="contained" aria-label="counter controls">
        <Button 
          color="primary"
          onClick={() => counterStore.increment()}
        >
          Increment
        </Button>
        <Button 
          color="secondary"
          onClick={() => counterStore.decrement()}
        >
          Decrement
        </Button>
        <Button 
          color="error"
          onClick={() => counterStore.reset()}
        >
          Reset
        </Button>
      </ButtonGroup>
    </Box>
  );
});

export default Counter; 