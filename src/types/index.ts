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
export interface ShoppingPreference {
  category: string;
  minPrice: number;
  maxPrice: number;
  brands: string[];
  styles: string[];
}

export interface ShoppingProfile {
  id: string;
  userId?: string;
  name: string;
  relationship: 'self' | 'spouse' | 'child' | 'parent' | 'other';
  age?: number;
  gender: string;
  bio?: string;
  interests: string[];
  stylePreferences: string[];
  favoriteColors: string[];
  favoriteCategories: string[];
  favoriteStores: string[];
  sizingInfo?: string;
  avatar?: string | null;
  isDefault?: boolean;
  preferences?: ShoppingPreference[];
  recentSearches?: string[];
  lastUpdated?: Date;
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

export interface StyleTwin {
  id: string;
  name: string;
  avatar: string;
  matchScore: number;
  bio: string;
  location: string;
  followers: number;
  following: number;
  styleTraits: string[];
  favoriteCategories: string[];
  favoriteBrands: string[];
  recentProducts: {
    id: string;
    title: string;
    image: string;
    price: number;
  }[];
  commonInterests: string[];
  isFollowing?: boolean;
}