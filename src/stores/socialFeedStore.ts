import { makeAutoObservable, computed } from 'mobx';
import { Playlist } from '../types';
import { RootStore } from './rootStore';

export type ShoppingProfileType = 'casual' | 'workwear' | 'evening' | 'athletic';

export interface Creator {
  id: string;
  name: string;
  avatar: string;
  styleScores?: {
    [key in ShoppingProfileType]?: number; // Similarity score per profile type (0-100)
  };
  isStyleTwin?: boolean;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  store: string;
  profileTypes: ShoppingProfileType[]; // Which shopping profiles this product is relevant for
}

export interface PlaylistContent {
  title: string;
  description: string;
  coverImage: string;
  itemCount: number;
  likes: number;
  profileTypes: ShoppingProfileType[]; // Which shopping profiles this playlist is relevant for
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
  profileTypes: ShoppingProfileType[];
}

export class SocialFeedStore {
  rootStore: RootStore;
  isLoading: boolean = false;
  error: string | null = null;
  feedItems: FeedItem[] = [];
  suggestedPlaylists: Playlist[] = [];
  styleTwinThreshold: number = 80;
  activeProfileTypes: ShoppingProfileType[] = ['casual', 'workwear', 'evening', 'athletic'];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false,
      styleTwinThreshold: false
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
            store: 'Vintage Finds',
            profileTypes: ['casual', 'evening']
          },
          likes: 42,
          comments: 7,
          isLiked: false,
          createdAt: new Date('2024-03-15T10:30:00'),
          creator: {
            id: 'user1',
            name: 'Sarah Johnson',
            avatar: 'https://picsum.photos/seed/sarah/100/100',
            styleScores: {
              casual: 85,
              evening: 78
            }
          },
          profileTypes: ['casual', 'evening']
        },
        {
          id: '2',
          type: 'playlist',
          content: {
            title: 'Office Essentials 2024',
            description: 'Modern professional wardrobe must-haves',
            coverImage: 'https://picsum.photos/seed/office/600/400',
            itemCount: 15,
            likes: 156,
            profileTypes: ['workwear']
          },
          likes: 156,
          comments: 23,
          isLiked: true,
          createdAt: new Date('2024-03-14T15:45:00'),
          creator: {
            id: 'user2',
            name: 'Alex Chen',
            avatar: 'https://picsum.photos/seed/alex/100/100',
            styleScores: {
              workwear: 92,
              casual: 75
            }
          },
          profileTypes: ['workwear']
        },
        {
          id: '3',
          type: 'product',
          content: {
            id: 'p2',
            title: 'Premium Yoga Set',
            price: 89.99,
            image: 'https://picsum.photos/seed/yoga/600/400',
            store: 'ActiveLife',
            profileTypes: ['athletic']
          },
          likes: 28,
          comments: 4,
          isLiked: false,
          createdAt: new Date('2024-03-14T09:15:00'),
          creator: {
            id: 'user3',
            name: 'Emma Wilson',
            avatar: 'https://picsum.photos/seed/emma/100/100',
            styleScores: {
              athletic: 95,
              casual: 70
            }
          },
          profileTypes: ['athletic']
        },
        {
          id: '4',
          type: 'product',
          content: {
            id: 'p3',
            title: 'Sequin Cocktail Dress',
            price: 199.99,
            image: 'https://picsum.photos/seed/dress/600/400',
            store: 'GlamBoutique',
            profileTypes: ['evening']
          },
          likes: 95,
          comments: 12,
          isLiked: false,
          createdAt: new Date('2024-03-13T14:20:00'),
          creator: {
            id: 'user4',
            name: 'Sofia Martinez',
            avatar: 'https://picsum.photos/seed/sofia/100/100',
            styleScores: {
              evening: 88,
              workwear: 82
            }
          },
          profileTypes: ['evening']
        },
        // Additional style twins that haven't posted
        {
          id: '5',
          type: 'product',
          content: {
            id: 'p4',
            title: 'Summer Casual Set',
            price: 79.99,
            image: 'https://picsum.photos/seed/summer/600/400',
            store: 'Urban Style',
            profileTypes: ['casual']
          },
          likes: 65,
          comments: 8,
          isLiked: false,
          createdAt: new Date('2024-03-12T11:20:00'),
          creator: {
            id: 'user5',
            name: 'Mike Thompson',
            avatar: 'https://picsum.photos/seed/mike/100/100',
            styleScores: {
              casual: 90,
              athletic: 85
            }
          },
          profileTypes: ['casual']
        },
        {
          id: '6',
          type: 'product',
          content: {
            id: 'p5',
            title: 'Business Suit Set',
            price: 299.99,
            image: 'https://picsum.photos/seed/suit/600/400',
            store: 'Executive Style',
            profileTypes: ['workwear']
          },
          likes: 72,
          comments: 15,
          isLiked: false,
          createdAt: new Date('2024-03-11T16:45:00'),
          creator: {
            id: 'user6',
            name: 'Rachel Kim',
            avatar: 'https://picsum.photos/seed/rachel/100/100',
            styleScores: {
              workwear: 93,
              evening: 87
            }
          },
          profileTypes: ['workwear']
        }
      ];

      // Add additional style twins that haven't posted yet
      const additionalStyleTwins = [
        {
          id: 'twin1',
          name: 'Jessica Lee',
          avatar: 'https://picsum.photos/seed/jessica/100/100',
          styleScores: {
            casual: 95,
            athletic: 88
          }
        },
        {
          id: 'twin2',
          name: 'David Wilson',
          avatar: 'https://picsum.photos/seed/david/100/100',
          styleScores: {
            workwear: 91,
            evening: 89
          }
        },
        {
          id: 'twin3',
          name: 'Emily Chen',
          avatar: 'https://picsum.photos/seed/emily/100/100',
          styleScores: {
            evening: 94,
            casual: 86
          }
        },
        {
          id: 'twin4',
          name: 'James Rodriguez',
          avatar: 'https://picsum.photos/seed/james/100/100',
          styleScores: {
            athletic: 96,
            workwear: 85
          }
        }
      ];

      // Add empty feed items for the additional style twins to make them available
      additionalStyleTwins.forEach(twin => {
        this.feedItems.push({
          id: `empty-${twin.id}`,
          type: 'product',
          content: {
            id: 'placeholder',
            title: '',
            price: 0,
            image: '',
            store: '',
            profileTypes: Object.keys(twin.styleScores) as ShoppingProfileType[]
          },
          likes: 0,
          comments: 0,
          isLiked: false,
          createdAt: new Date(),
          creator: twin,
          profileTypes: Object.keys(twin.styleScores) as ShoppingProfileType[]
        });
      });

      this.error = null;
    } catch (error) {
      console.error('Error fetching feed:', error);
      this.error = error instanceof Error ? error.message : 'Failed to fetch feed';
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
          items: [],
          profileTypes: ['casual', 'evening']
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
          items: [],
          profileTypes: ['workwear', 'casual']
        },
        {
          id: 'pl3',
          title: 'Gym to Street',
          description: 'Versatile athletic wear for any occasion',
          coverImage: 'https://picsum.photos/seed/gym/300/200',
          creator: {
            id: 'user3',
            name: 'Emma Wilson',
            avatar: 'https://picsum.photos/seed/emma/100/100'
          },
          itemCount: 12,
          likes: 156,
          isPublic: true,
          items: [],
          profileTypes: ['athletic', 'casual']
        },
        {
          id: 'pl4',
          title: 'Evening Glamour',
          description: 'Stunning pieces for special occasions',
          coverImage: 'https://picsum.photos/seed/glamour/300/200',
          creator: {
            id: 'user4',
            name: 'Sofia Martinez',
            avatar: 'https://picsum.photos/seed/sofia/100/100'
          },
          itemCount: 10,
          likes: 278,
          isPublic: true,
          items: [],
          profileTypes: ['evening']
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

  @computed
  get styleTwinsFeed() {
    return this.feedItems.filter(item => 
      (item.creator.styleScores?.[this.activeProfileTypes[0]] ?? 0) >= this.styleTwinThreshold
    );
  }

  @computed
  get styleTwins() {
    const creators = new Map<string, Creator>();
    this.feedItems.forEach(item => {
      this.activeProfileTypes.forEach(profileType => {
        if ((item.creator.styleScores?.[profileType] ?? 0) >= this.styleTwinThreshold) {
          creators.set(item.creator.id, item.creator);
        }
      });
    });
    return Array.from(creators.values());
  }

  @computed
  get styleTwinsFeedByProfile() {
    const feedByProfile = new Map<ShoppingProfileType, FeedItem[]>();
    
    this.activeProfileTypes.forEach(profileType => {
      const profileFeed = this.feedItems.filter(item => {
        const creatorScore = item.creator.styleScores?.[profileType] ?? 0;
        return creatorScore >= this.styleTwinThreshold && item.profileTypes.includes(profileType);
      });
      
      if (profileFeed.length > 0) {
        feedByProfile.set(profileType, profileFeed);
      }
    });
    
    return feedByProfile;
  }

  @computed
  get styleTwinsByProfile() {
    const twinsByProfile = new Map<ShoppingProfileType, Creator[]>();
    
    this.activeProfileTypes.forEach(profileType => {
      const profileTwins = new Map<string, Creator>();
      
      this.feedItems.forEach(item => {
        const creator = item.creator;
        const styleScore = creator.styleScores?.[profileType] ?? 0;
        
        if (styleScore >= this.styleTwinThreshold) {
          profileTwins.set(creator.id, creator);
        }
      });
      
      if (profileTwins.size > 0) {
        twinsByProfile.set(profileType, Array.from(profileTwins.values()));
      }
    });
    
    return twinsByProfile;
  }

  setActiveProfileTypes(types: ShoppingProfileType[]) {
    this.activeProfileTypes = types;
  }
} 