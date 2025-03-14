// User types
export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio?: string;
  followers: number;
  following: number;
}

// Shopping Profile types
export interface ShoppingProfile {
  id: string;
  name: string;
  relationship: string;
  age?: number;
  gender: string;
  bio?: string;
  interests?: string;
  stylePreferences?: string;
  favoriteColors?: string;
  favoriteCategories?: string;
  favoriteStores?: string;
  sizingInfo?: string;
  avatar?: string | null;
}

// Product types
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  store: string;
  link: string;
  category: string;
  liked?: boolean;
  saved?: boolean;
}

// Playlist types
export interface PlaylistCreator {
  id: string;
  name: string;
  avatar: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  creator: PlaylistCreator;
  itemCount: number;
  likes: number;
  isPublic: boolean;
  liked?: boolean;
  items?: Product[];
}

// AI Recommendation types
export interface AIRecommendation {
  id: string;
  query: string;
  products: Product[];
  timestamp: Date;
} 