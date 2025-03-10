import React from 'react';
import rootStore from './rootStore';

export const StoreContext = React.createContext(rootStore);

export const useStore = () => {
  return React.useContext(StoreContext);
}; 