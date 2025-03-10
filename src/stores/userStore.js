import { makeAutoObservable } from 'mobx';

// Sample user data for hard-coded profiles
const sampleUsers = {
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

class UserStore {
  currentUser = {
    id: 'me',
    name: 'Your Name',
    username: '@username',
    bio: 'Your bio will appear here',
    avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
    followers: 0,
    following: 0,
    interests: ['Add your interests'],
    isVerified: false,
    productsShared: 0
  };
  
  users = sampleUsers;
  followingStatus = {}; // Track which users the current user is following
  
  constructor() {
    makeAutoObservable(this);
  }
  
  getUserById(userId) {
    if (userId === 'me' || !userId) {
      return this.currentUser;
    }
    return this.users[userId] || null;
  }
  
  getAllUsers() {
    return Object.values(this.users);
  }
  
  updateCurrentUser(userData) {
    this.currentUser = { ...this.currentUser, ...userData };
  }
  
  isFollowing(userId) {
    return !!this.followingStatus[userId];
  }
  
  toggleFollow(userId) {
    this.followingStatus[userId] = !this.followingStatus[userId];
    
    // In a real app, this would make an API call to update the follow status
    if (this.followingStatus[userId]) {
      this.currentUser.following += 1;
      if (this.users[userId]) {
        this.users[userId].followers += 1;
      }
    } else {
      this.currentUser.following = Math.max(0, this.currentUser.following - 1);
      if (this.users[userId]) {
        this.users[userId].followers = Math.max(0, this.users[userId].followers - 1);
      }
    }
  }
  
  // Method to get suggested users (users the current user is not following)
  getSuggestedUsers(limit = 5) {
    return Object.values(this.users)
      .filter(user => !this.followingStatus[user.id])
      .slice(0, limit);
  }
  
  // Method to get filtered users based on search query and interests
  getFilteredUsers(searchQuery = '', selectedInterests = []) {
    return Object.values(this.users).filter(user => {
      // Filter by search query
      const matchesSearch = searchQuery === '' || 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by interests
      const matchesInterests = selectedInterests.length === 0 || 
        selectedInterests.some(interest => user.interests.includes(interest));
      
      return matchesSearch && matchesInterests;
    });
  }
}

export default UserStore; 