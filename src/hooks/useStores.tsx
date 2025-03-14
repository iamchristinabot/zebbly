import React, { createContext, useContext } from 'react';
import type { TRootStore } from '../stores/rootStore';
import type { ShoppingProfile, StyleTwin } from '../stores/shoppingProfileStore';
import { UserStore } from '../stores/userStore';
import { AIRecommendationStore } from '../stores/aiRecommendationStore';
import { ProductPlaylistStore } from '../stores/productPlaylistStore';
import { SocialFeedStore } from '../stores/socialFeedStore';

export interface ShoppingProfileStore {
  profiles: ShoppingProfile[];
  styleTwins: StyleTwin[];
  isLoading: boolean;
  currentProfile: ShoppingProfile | null;
  loadProfiles: () => Promise<void>;
  loadStyleTwins: (profileId: string) => Promise<void>;
  toggleFollowTwin: (twinId: string) => void;
  deleteProfile: (id: string) => void;
  setDefaultProfile: (id: string) => void;
  setCurrentProfile: (profile: ShoppingProfile) => void;
}

export interface RootStore {
  userStore: UserStore;
  shoppingProfileStore: ShoppingProfileStore;
  aiRecommendationStore: AIRecommendationStore;
  productPlaylistStore: ProductPlaylistStore;
  socialFeedStore: SocialFeedStore;
}

const StoresContext = createContext<RootStore | null>(null);

export const useStores = () => {
  const context = useContext(StoresContext);
  if (!context) {
    throw new Error('useStores must be used within a StoresProvider');
  }
  return context;
};

export const StoresProvider: React.FC<{
  children: React.ReactNode;
  store: RootStore;
}> = ({ children, store }) => {
  return (
    <StoresContext.Provider value={store}>
      {children}
    </StoresContext.Provider>
  );
};

export function useProductPlaylistStore() {
  const { productPlaylistStore } = useStores();
  return productPlaylistStore;
}

export function useShoppingProfileStore() {
  const { shoppingProfileStore } = useStores();
  return shoppingProfileStore;
}

export function useAIRecommendationStore() {
  const { aiRecommendationStore } = useStores();
  return aiRecommendationStore;
}

export function useUserStore() {
  const { userStore } = useStores();
  return userStore;
}