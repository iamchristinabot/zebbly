import { makeAutoObservable } from 'mobx';
import { UserStore } from './userStore';
import { AIRecommendationStore } from './aiRecommendationStore';
import { ShoppingProfileStore } from './shoppingProfileStore';
import { ProductPlaylistStore } from './productPlaylistStore';
import { SocialFeedStore } from './socialFeedStore';

export class RootStore {
  userStore: UserStore;
  aiRecommendationStore: AIRecommendationStore;
  shoppingProfileStore: ShoppingProfileStore;
  productPlaylistStore: ProductPlaylistStore;
  socialFeedStore: SocialFeedStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.aiRecommendationStore = new AIRecommendationStore(this);
    this.shoppingProfileStore = new ShoppingProfileStore(this);
    this.productPlaylistStore = new ProductPlaylistStore(this);
    this.socialFeedStore = new SocialFeedStore(this);
    
    makeAutoObservable(this);
  }
}

// Create a single instance
export const rootStore = new RootStore();

// Export the store type
export type TRootStore = typeof rootStore; 