import { ShoppingProfileType } from './stores/socialFeedStore';

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
}

export interface PlaylistItem {
  id: string;
  productId: string;
  product: Product;
  addedAt: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  creator: User;
  itemCount: number;
  likes: number;
  isPublic: boolean;
  items: PlaylistItem[];
  profileTypes: ShoppingProfileType[];
} 