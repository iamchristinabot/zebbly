import { makeObservable, observable, action, runInAction } from 'mobx';
import type { RootStore } from './rootStore';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

interface Playlist {
  id: string;
  name: string;
  description: string;
  products: Product[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class ProductPlaylistStore {
  @observable private rootStore: RootStore;
  @observable playlists: Playlist[] = [];
  @observable currentPlaylist: Playlist | null = null;
  @observable isLoading = false;
  @observable error: string | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
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
} 