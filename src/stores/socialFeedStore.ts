import { makeAutoObservable, computed } from 'mobx';
import { Playlist } from '../types';
import { RootStore } from './rootStore';

export interface Creator {
  id: string;
  name: string;
  avatar: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  store: string;
}

export interface PlaylistContent {
  title: string;
  description: string;
  coverImage: string;
  itemCount: number;
  likes: number;
}

export interface FeedItem {
  id: string;
  type: 'product' | 'playlist';
  content: Product | PlaylistContent;
  likes: number;
  comments: number;
  isLiked: boolean;
  createdAt: Date;
  creator: Creator;
}

export class SocialFeedStore {
  rootStore: RootStore;
  isLoading: boolean = false;
  error: string | null = null;
  feedItems: FeedItem[] = [];
  suggestedPlaylists: Playlist[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false
    });
  }

  async fetchFeed() {
    try {
      this.isLoading = true;
      // Simulating API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.feedItems = [
        {
          id: '1',
          type: 'product',
          content: {
            id: 'p1',
            title: 'Vintage Leather Jacket',
            price: 129.99,
            image: 'https://picsum.photos/seed/jacket/600/400',
            store: 'Vintage Finds'
          },
          likes: 42,
          comments: 7,
          isLiked: false,
          createdAt: new Date('2024-03-15T10:30:00'),
          creator: {
            id: 'user1',
            name: 'Sarah Johnson',
            avatar: 'https://picsum.photos/seed/sarah/100/100'
          }
        },
        {
          id: '2',
          type: 'playlist',
          content: {
            title: 'Summer Essentials',
            description: 'My must-have items for the perfect summer wardrobe',
            coverImage: 'https://picsum.photos/seed/summer/600/400',
            itemCount: 12,
            likes: 156
          },
          likes: 156,
          comments: 23,
          isLiked: true,
          createdAt: new Date('2024-03-14T15:45:00'),
          creator: {
            id: 'user2',
            name: 'Alex Chen',
            avatar: 'https://picsum.photos/seed/alex/100/100'
          }
        },
        {
          id: '3',
          type: 'product',
          content: {
            id: 'p2',
            title: 'Minimalist Watch',
            price: 89.99,
            image: 'https://picsum.photos/seed/watch/600/400',
            store: 'TimeKeepers'
          },
          likes: 28,
          comments: 4,
          isLiked: false,
          createdAt: new Date('2024-03-14T09:15:00'),
          creator: {
            id: 'user3',
            name: 'Mike Smith',
            avatar: 'https://picsum.photos/seed/mike/100/100'
          }
        }
      ];
      
      this.error = null;
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Failed to fetch feed';
    } finally {
      this.isLoading = false;
    }
  }

  async fetchSuggestedPlaylists() {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.suggestedPlaylists = [
        {
          id: 'pl1',
          title: 'Spring Collection 2024',
          description: 'Fresh picks for the new season',
          coverImage: 'https://picsum.photos/seed/spring/300/200',
          creator: {
            id: 'user1',
            name: 'Sarah Johnson',
            avatar: 'https://picsum.photos/seed/sarah/100/100'
          },
          itemCount: 15,
          likes: 234,
          isPublic: true,
          items: []
        },
        {
          id: 'pl2',
          title: 'Minimalist Wardrobe',
          description: 'Essential pieces for a timeless look',
          coverImage: 'https://picsum.photos/seed/minimal/300/200',
          creator: {
            id: 'user2',
            name: 'Alex Chen',
            avatar: 'https://picsum.photos/seed/alex/100/100'
          },
          itemCount: 8,
          likes: 189,
          isPublic: true,
          items: []
        }
      ];
    } catch (err) {
      console.error('Failed to fetch suggested playlists:', err);
    }
  }

  toggleLike(itemId: string) {
    const item = this.feedItems.find(item => item.id === itemId);
    if (item) {
      item.isLiked = !item.isLiked;
      item.likes += item.isLiked ? 1 : -1;
    }
  }

  @computed
  get followingFeed() {
    return this.feedItems.filter(item => 
      this.rootStore.userStore.isFollowing(item.creator.id)
    );
  }
} 