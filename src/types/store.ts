export interface User {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  followers?: number;
  following?: number;
}

export interface UserStore {
  getUserById: (id: string) => User;
  getSuggestedUsers: (limit: number) => User[];
}

export interface StoreContextType {
  userStore: UserStore;
  productPlaylistStore: any; // We'll type this properly later
} 