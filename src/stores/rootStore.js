import { createContext } from 'react';
import UserStore from './userStore';

class RootStore {
  constructor() {
    this.userStore = new UserStore();
    // Add other stores here as needed
  }
}

const rootStore = new RootStore();
export default rootStore; 