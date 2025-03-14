import { makeAutoObservable } from 'mobx';
import { UserStore } from './userStore';
import { AIRecommendationStore } from './aiRecommendationStore';
import { ShoppingProfileStore } from './shoppingProfileStore';
import { ProductPlaylistStore } from './productPlaylistStore';

export class RootStore {
  userStore: UserStore;
  aiRecommendationStore: AIRecommendationStore;
  shoppingProfileStore: ShoppingProfileStore;
  productPlaylistStore: ProductPlaylistStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.aiRecommendationStore = new AIRecommendationStore(this);
    this.shoppingProfileStore = new ShoppingProfileStore(this);
    this.productPlaylistStore = new ProductPlaylistStore(this);
    
    makeAutoObservable(this);
  }
}

// Create a single instance of the root store
const rootStore = new RootStore();

// Export the store instance as default
export default rootStore;

// Export the store type
export type TRootStore = typeof rootStore; 