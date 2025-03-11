import { createContext } from 'react';
import UserStore from './userStore';
import AIRecommendationStore from './aiRecommendationStore';

class RootStore {
  constructor() {
    this.userStore = new UserStore();
    this.aiRecommendationStore = new AIRecommendationStore();
    // Add other stores here as needed
  }
}

const rootStore = new RootStore();
export default rootStore; 