import { useContext } from 'react';
import { MobXProviderContext } from 'mobx-react';
import type { RootStore } from '../App';

export function useStores(): RootStore {
  const context = useContext(MobXProviderContext);
  if (!context) {
    throw new Error('useStores must be used within a Provider');
  }
  return context as RootStore;
}

export function useProductPlaylistStore() {
  const { productPlaylistStore } = useStores();
  return productPlaylistStore;
} 