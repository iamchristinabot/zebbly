import React from 'react';
import UserStore from './userStore';
import ShoppingProfileStore from './shoppingProfileStore';
// Import other stores as needed

// Create store instances
const userStore = new UserStore();
const shoppingProfileStore = new ShoppingProfileStore();
// Create other store instances as needed

// Create the context with the stores
export const StoreContext = React.createContext({
  userStore,
  shoppingProfileStore,
  // Add other stores here
});

// Optional: Create a provider component for easier usage
export const StoreProvider = function(props) {
  return React.createElement(
    StoreContext.Provider,
    { 
      value: { 
        userStore, 
        shoppingProfileStore,
        // Add other stores here 
      } 
    },
    props.children
  );
};

export const useStore = () => {
  return React.useContext(StoreContext);
}; 