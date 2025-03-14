import { makeObservable, observable, action, computed, runInAction } from 'mobx';
import type { RootStore } from './rootStore';

export interface SampleUser {
  id: string;
  name: string;
  username: string;
  bio: string;
  avatar: string;
  followers: number;
  following: number;
  interests: string[];
  isVerified: boolean;
  productsShared: number;
  mutualInterests: string[];
}

interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  bio?: string;
  avatar?: string;
  followers: number;
  following: number;
  interests: string[];
  isVerified: boolean;
  productsShared: number;
}

type SampleUsers = {
  [key: string]: SampleUser;
};

type FollowingStatus = {
  [key: string]: boolean;
};

// Sample user data for hard-coded profiles
const sampleUsers: SampleUsers = {
  '1': {
    id: '1',
    name: 'Jessica Anderson',
    username: '@jessicaanderson',
    bio: 'Home decor enthusiast and DIY lover. Always on the lookout for unique finds!',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    followers: 1243,
    following: 567,
    interests: ['Home Decor', 'DIY', 'Minimalism', 'Plants'],
    isVerified: true,
    productsShared: 87,
    mutualInterests: ['Home Decor', 'DIY']
  },
  '2': {
    id: '2',
    name: 'Michael Chen',
    username: '@michaelchen',
    bio: 'Tech reviewer and gadget collector. Sharing the latest and greatest in consumer electronics.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    followers: 3456,
    following: 421,
    interests: ['Tech', 'Gadgets', 'Photography', 'Smart Home'],
    isVerified: true,
    productsShared: 156,
    mutualInterests: ['Tech', 'Photography']
  },
  '3': {
    id: '3',
    name: 'Sophia Rodriguez',
    username: '@sophiarodriguez',
    bio: 'Fashion stylist and trend spotter. Helping you build a wardrobe you love.',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    followers: 5678,
    following: 834,
    interests: ['Fashion', 'Accessories', 'Sustainable Style', 'Vintage'],
    isVerified: false,
    productsShared: 243,
    mutualInterests: ['Fashion', 'Accessories']
  },
  '4': {
    id: '4',
    name: 'David Johnson',
    username: '@davidjohnson',
    bio: 'Fitness enthusiast and nutrition coach. Sharing products that help me stay in shape.',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    followers: 2345,
    following: 653,
    interests: ['Fitness', 'Nutrition', 'Workout Gear', 'Wellness'],
    isVerified: false,
    productsShared: 112,
    mutualInterests: ['Fitness', 'Wellness']
  },
  '5': {
    id: '5',
    name: 'Emma Wilson',
    username: '@emmawilson',
    bio: 'Beauty blogger and skincare addict. Reviewing products so you dont have to.',
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    followers: 4567,
    following: 732,
    interests: ['Beauty', 'Skincare', 'Makeup', 'Self-Care'],
    isVerified: true,
    productsShared: 198,
    mutualInterests: ['Beauty', 'Skincare']
  }
};

export class UserStore {
  @observable private rootStore: RootStore;
  @observable currentUser: SampleUser | null = null;
  @observable isLoading = false;
  @observable error: string | null = null;
  @observable users: SampleUsers = sampleUsers;
  @observable followingStatus: FollowingStatus = {};

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
    
    // Initialize with a default user for development
    this.currentUser = {
      id: '1',
      name: 'Jessica Anderson',
      username: '@jessicaanderson',
      bio: 'Home decor enthusiast and DIY lover. Always on the lookout for unique finds!',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      followers: 1243,
      following: 567,
      interests: ['Home Decor', 'DIY', 'Minimalism', 'Plants'],
      isVerified: true,
      productsShared: 87,
      mutualInterests: ['Home Decor', 'DIY']
    };
  }
  
  @action getUserById(userId: string): SampleUser | null {
    if (userId === 'me' || !userId) {
      return this.currentUser;
    }
    return this.users[userId] || null;
  }
  
  @action getAllUsers(): SampleUser[] {
    return Object.values(this.users);
  }
  
  @action updateCurrentUser(userData: Partial<SampleUser>) {
    if (!this.currentUser) return;
    this.currentUser = { ...this.currentUser, ...userData };
  }
  
  @action isFollowing(userId: string): boolean {
    return !!this.followingStatus[userId];
  }
  
  @action toggleFollow(userId: string) {
    if (!this.currentUser) return;
    
    this.followingStatus[userId] = !this.followingStatus[userId];
    
    if (this.followingStatus[userId]) {
      this.currentUser.followers += 1;
      if (this.users[userId]) {
        this.users[userId].followers += 1;
      }
    } else {
      this.currentUser.followers = Math.max(0, this.currentUser.followers - 1);
      if (this.users[userId]) {
        this.users[userId].followers = Math.max(0, this.users[userId].followers - 1);
      }
    }
  }
  
  @action getSuggestedUsers(limit = 5): SampleUser[] {
    return Object.values(this.users)
      .filter(user => !this.followingStatus[user.id])
      .slice(0, limit);
  }
  
  @action getFilteredUsers(searchQuery = '', selectedInterests: string[] = []): SampleUser[] {
    return Object.values(this.users).filter(user => {
      const matchesSearch = searchQuery === '' || 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesInterests = selectedInterests.length === 0 || 
        selectedInterests.some(interest => user.interests.includes(interest));
      
      return matchesSearch && matchesInterests;
    });
  }

  @action setUser(user: SampleUser | null) {
    this.currentUser = user;
  }

  @action async login(email: string, password: string) {
    try {
      this.isLoading = true;
      this.error = null;
      
      // Implement your login logic here
      // const response = await api.login(email, password);
      
      runInAction(() => {
        // this.currentUser = response.user;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'An error occurred';
        this.isLoading = false;
      });
    }
  }

  @action logout() {
    this.currentUser = null;
  }

  @computed get isAuthenticated() {
    return !!this.currentUser;
  }
} 