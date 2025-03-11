import { createContext } from 'react';
import UserStore from './userStore';
import RewardsStore from './rewardsStore';

class RootStore {
  constructor() {
    this.userStore = new UserStore();
    this.rewardsStore = new RewardsStore();
    // Add other stores here as needed
  }
}

const rootStore = new RootStore();
export default rootStore; 