import { makeObservable, observable, action, runInAction, computed } from 'mobx';
import type { RootStore } from './rootStore';
import { samplePlaylists } from '../data/samplePlaylists';
import { Product } from '../types';

interface Playlist {
  id: string;
  userId: string;
  name: string;
  description: string;
  products: Product[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  featured?: boolean;
  popular?: boolean;
}

export class ProductPlaylistStore {
  @observable private rootStore: RootStore;
  @observable playlists: Playlist[] = [];
  @observable currentPlaylist: Playlist | null = null;
  @observable isLoading = false;
  @observable error: string | null = null;
  @observable selectedCategory: string | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    // Initialize with sample data
    this.playlists = samplePlaylists;
  }

  @action
  setSelectedCategory(categoryId: string | null) {
    this.selectedCategory = categoryId;
  }

  @computed
  get filteredPlaylists() {
    if (!this.selectedCategory) {
      return this.playlists;
    }
    return this.playlists.filter(playlist => 
      playlist.products.some(product => product.category.toLowerCase() === this.selectedCategory)
    );
  }

  async fetchPlaylists(userId: string) {
    try {
      this.isLoading = true;
      this.error = null;
      
      // Implement your playlist fetching logic here
      // const response = await api.getPlaylists(userId);
      
      runInAction(() => {
        // this.playlists = response.playlists;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'An error occurred';
        this.isLoading = false;
      });
    }
  }

  async createPlaylist(playlist: Omit<Playlist, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      this.isLoading = true;
      this.error = null;
      
      // Implement your playlist creation logic here
      // const response = await api.createPlaylist(playlist);
      
      runInAction(() => {
        // this.playlists.push(response.playlist);
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'An error occurred';
        this.isLoading = false;
      });
    }
  }

  setCurrentPlaylist(playlistId: string) {
    this.currentPlaylist = this.playlists.find(p => p.id === playlistId) ?? null;
  }

  addProductToPlaylist(playlistId: string, product: Product) {
    const playlist = this.playlists.find(p => p.id === playlistId);
    if (playlist) {
      playlist.products.push(product);
      playlist.updatedAt = new Date();
    }
  }

  removeProductFromPlaylist(playlistId: string, productId: string) {
    const playlist = this.playlists.find(p => p.id === playlistId);
    if (playlist) {
      playlist.products = playlist.products.filter(p => p.id !== productId);
      playlist.updatedAt = new Date();
    }
  }

  get publicPlaylists() {
    return this.playlists.filter(p => p.isPublic);
  }

  get privatePlaylists() {
    return this.playlists.filter(p => !p.isPublic);
  }

  @action
  async loadPlaylist(playlistId: string) {
    try {
      this.isLoading = true;
      this.error = null;
      
      // Find the playlist in the store
      const playlist = this.playlists.find(p => p.id === playlistId);
      if (!playlist) {
        throw new Error('Playlist not found');
      }
      
      runInAction(() => {
        this.currentPlaylist = playlist;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'An error occurred';
        this.isLoading = false;
      });
    }
  }

  @action
  async updatePlaylistProducts(playlistId: string, productIds: string[]) {
    try {
      this.isLoading = true;
      this.error = null;
      
      // Find the playlist in the store
      const playlist = this.playlists.find(p => p.id === playlistId);
      if (!playlist) {
        throw new Error('Playlist not found');
      }
      
      // Update the playlist's products
      runInAction(() => {
        playlist.products = playlist.products.filter(p => productIds.includes(p.id));
        playlist.updatedAt = new Date();
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'An error occurred';
        this.isLoading = false;
      });
    }
  }
} 