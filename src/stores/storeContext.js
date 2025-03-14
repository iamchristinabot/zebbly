import React, { createContext } from 'react';
import UserStore from './userStore';
import ShoppingProfileStore from './shoppingProfileStore';
import AIRecommendationStore from './aiRecommendationStore';
import ProductPlaylistStore from './productPlaylistStore';
// Import other stores as needed

// Create the context
export const StoreContext = createContext(null);

// Create a provider component
export const StoreProvider = ({ children }) => {
  // Initialize stores
  const userStore = new UserStore();
  const shoppingProfileStore = new ShoppingProfileStore();
  const aiRecommendationStore = new AIRecommendationStore();
  const productPlaylistStore = new ProductPlaylistStore();
  
  // Create the store object
  const store = {
    userStore,
    shoppingProfileStore,
    aiRecommendationStore,
    productPlaylistStore
  };
  
  // Provide the store to children components using React.createElement instead of JSX
  return React.createElement(
    StoreContext.Provider,
    { value: store },
    children
  );
};

export const useStore = () => {
  return React.useContext(StoreContext);
}; 