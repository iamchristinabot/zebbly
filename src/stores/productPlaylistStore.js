import { makeAutoObservable } from 'mobx';

class ProductPlaylistStore {
  playlists = [];
  featuredPlaylists = [];
  popularPlaylists = [];
  loading = false;
  
  constructor() {
    makeAutoObservable(this);
    this.loadInitialData();
  }
  
  loadInitialData() {
    this.setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Sample featured playlists
      this.setFeaturedPlaylists([
        {
          id: 'f1',
          title: '10 Electronics I Couldn\'t Live Without',
          description: 'My essential tech gadgets for everyday life',
          coverImage: 'https://picsum.photos/seed/electronics/300/300',
          creator: {
            id: 'user1',
            name: 'Tech Enthusiast',
            avatar: 'https://picsum.photos/seed/user1/100/100'
          },
          itemCount: 10,
          likes: 245,
          isPublic: true
        },
        {
          id: 'f2',
          title: 'Minimalist Home Essentials',
          description: 'Everything you need for a clutter-free living space',
          coverImage: 'https://picsum.photos/seed/minimal/300/300',
          creator: {
            id: 'user2',
            name: 'Minimal Living',
            avatar: 'https://picsum.photos/seed/user2/100/100'
          },
          itemCount: 15,
          likes: 189,
          isPublic: true
        },
        {
          id: 'f3',
          title: 'Ultimate WFH Setup',
          description: 'Create the perfect home office with these products',
          coverImage: 'https://picsum.photos/seed/wfh/300/300',
          creator: {
            id: 'user3',
            name: 'Remote Worker',
            avatar: 'https://picsum.photos/seed/user3/100/100'
          },
          itemCount: 12,
          likes: 156,
          isPublic: true
        },
        {
          id: 'f4',
          title: 'Kitchen Gadgets That Actually Work',
          description: 'No more useless unitaskers - only the best kitchen tools',
          coverImage: 'https://picsum.photos/seed/kitchen/300/300',
          creator: {
            id: 'user4',
            name: 'Home Chef',
            avatar: 'https://picsum.photos/seed/user4/100/100'
          },
          itemCount: 8,
          likes: 132,
          isPublic: true
        }
      ]);
      
      // Sample user playlists
      this.setUserPlaylists([
        {
          id: 'u1',
          title: 'My Fitness Gear',
          description: 'Equipment for my home gym setup',
          coverImage: 'https://picsum.photos/seed/fitness/300/300',
          creator: {
            id: 'me',
            name: 'You',
            avatar: null
          },
          itemCount: 7,
          likes: 12,
          isPublic: true
        },
        {
          id: 'u2',
          title: 'Gift Ideas',
          description: 'Products I\'m considering for holiday gifts',
          coverImage: 'https://picsum.photos/seed/gifts/300/300',
          creator: {
            id: 'me',
            name: 'You',
            avatar: null
          },
          itemCount: 5,
          likes: 3,
          isPublic: false
        }
      ]);
      
      // Sample popular playlists
      this.setPopularPlaylists([
        {
          id: 'p1',
          title: 'Sustainable Kitchen Products',
          description: 'Eco-friendly alternatives for everyday kitchen items',
          coverImage: 'https://picsum.photos/seed/eco/300/300',
          creator: {
            id: 'user5',
            name: 'EcoLiving',
            avatar: 'https://picsum.photos/seed/user5/100/100'
          },
          itemCount: 12,
          likes: 342,
          isPublic: true
        },
        {
          id: 'p2',
          title: 'Budget Gaming Setup',
          description: 'Create an awesome gaming space without breaking the bank',
          coverImage: 'https://picsum.photos/seed/gaming/300/300',
          creator: {
            id: 'user6',
            name: 'Gamer Pro',
            avatar: 'https://picsum.photos/seed/user6/100/100'
          },
          itemCount: 9,
          likes: 287,
          isPublic: true
        },
        {
          id: 'p3',
          title: 'Smart Home Starter Kit',
          description: 'Essential devices to begin your smart home journey',
          coverImage: 'https://picsum.photos/seed/smarthome/300/300',
          creator: {
            id: 'user7',
            name: 'Tech Home',
            avatar: 'https://picsum.photos/seed/user7/100/100'
          },
          itemCount: 6,
          likes: 215,
          isPublic: true
        },
        {
          id: 'p4',
          title: 'Productivity Boosters',
          description: 'Tools that help me stay focused and get more done',
          coverImage: 'https://picsum.photos/seed/productivity/300/300',
          creator: {
            id: 'user8',
            name: 'Efficiency Expert',
            avatar: 'https://picsum.photos/seed/user8/100/100'
          },
          itemCount: 10,
          likes: 198,
          isPublic: true
        }
      ]);
      
      this.setLoading(false);
    }, 1500);
  }
  
  getPlaylistById(id) {
    // First check user playlists
    let playlist = this.playlists.find(p => p.id === id);
    
    // Then check featured playlists
    if (!playlist) {
      playlist = this.featuredPlaylists.find(p => p.id === id);
    }
    
    // Finally check popular playlists
    if (!playlist) {
      playlist = this.popularPlaylists.find(p => p.id === id);
    }
    
    return playlist;
  }
  
  getPlaylistItems(playlistId) {
    // This would be an API call in a real app
    return new Promise((resolve) => {
      setTimeout(() => {
        // Sample playlist items for the "10 Electronics" playlist
        if (playlistId === 'f1') {
          resolve([
            {
              id: 'item1',
              rank: 1,
              title: 'Noise-Cancelling Wireless Headphones',
              description: 'Perfect for focusing on work or enjoying music without distractions.',
              image: 'https://picsum.photos/seed/headphones/300/200',
              price: 249.99,
              store: 'Amazon',
              rating: 4.8,
              link: '#'
            },
            {
              id: 'item2',
              rank: 2,
              title: 'Ultra-Wide Curved Monitor',
              description: 'Transformed my productivity with its immersive screen real estate.',
              image: 'https://picsum.photos/seed/monitor/300/200',
              price: 399.99,
              store: 'Best Buy',
              rating: 4.7,
              link: '#'
            },
            {
              id: 'item3',
              rank: 3,
              title: 'Smart Home Hub',
              description: 'Controls all my smart devices from one central system.',
              image: 'https://picsum.photos/seed/smarthome/300/200',
              price: 129.99,
              store: 'Amazon',
              rating: 4.5,
              link: '#'
            },
            {
              id: 'item4',
              rank: 4,
              title: 'Mechanical Keyboard',
              description: 'The tactile feedback makes typing a joy rather than a chore.',
              image: 'https://picsum.photos/seed/keyboard/300/200',
              price: 149.99,
              store: 'Newegg',
              rating: 4.6,
              link: '#'
            },
            {
              id: 'item5',
              rank: 5,
              title: 'Wireless Charging Pad',
              description: 'Eliminated cable clutter from my desk and nightstand.',
              image: 'https://picsum.photos/seed/charger/300/200',
              price: 39.99,
              store: 'Amazon',
              rating: 4.4,
              link: '#'
            },
            {
              id: 'item6',
              rank: 6,
              title: 'E-Reader',
              description: 'Helped me rediscover my love for reading with its paper-like display.',
              image: 'https://picsum.photos/seed/ereader/300/200',
              price: 129.99,
              store: 'Amazon',
              rating: 4.7,
              link: '#'
            },
            {
              id: 'item7',
              rank: 7,
              title: 'Smart Watch',
              description: 'Keeps me on track with fitness goals and notifications.',
              image: 'https://picsum.photos/seed/smartwatch/300/200',
              price: 299.99,
              store: 'Apple',
              rating: 4.8,
              link: '#'
            },
            {
              id: 'item8',
              rank: 8,
              title: 'Portable SSD',
              description: 'Fast, reliable storage that fits in my pocket.',
              image: 'https://picsum.photos/seed/ssd/300/200',
              price: 179.99,
              store: 'Amazon',
              rating: 4.9,
              link: '#'
            },
            {
              id: 'item9',
              rank: 9,
              title: 'Wireless Earbuds',
              description: 'Perfect for calls and music on the go.',
              image: 'https://picsum.photos/seed/earbuds/300/200',
              price: 159.99,
              store: 'Best Buy',
              rating: 4.6,
              link: '#'
            },
            {
              id: 'item10',
              rank: 10,
              title: 'Smart Lighting System',
              description: 'Creates the perfect ambiance for any situation.',
              image: 'https://picsum.photos/seed/lighting/300/200',
              price: 199.99,
              store: 'Home Depot',
              rating: 4.5,
              link: '#'
            }
          ]);
        } else {
          // Generic items for other playlists
          resolve([
            {
              id: 'item1',
              rank: 1,
              title: 'Product 1',
              description: 'Description for product 1',
              image: `https://picsum.photos/seed/${playlistId}-1/300/200`,
              price: 99.99,
              store: 'Amazon',
              rating: 4.5,
              link: '#'
            },
            {
              id: 'item2',
              rank: 2,
              title: 'Product 2',
              description: 'Description for product 2',
              image: `https://picsum.photos/seed/${playlistId}-2/300/200`,
              price: 149.99,
              store: 'Target',
              rating: 4.3,
              link: '#'
            },
            {
              id: 'item3',
              rank: 3,
              title: 'Product 3',
              description: 'Description for product 3',
              image: `https://picsum.photos/seed/${playlistId}-3/300/200`,
              price: 79.99,
              store: 'Walmart',
              rating: 4.7,
              link: '#'
            }
          ]);
        }
      }, 1000);
    });
  }
  
  // Actions
  setLoading(status) {
    this.loading = status;
  }
  
  setFeaturedPlaylists(playlists) {
    this.featuredPlaylists = playlists;
  }
  
  setUserPlaylists(playlists) {
    this.playlists = playlists;
  }
  
  setPopularPlaylists(playlists) {
    this.popularPlaylists = playlists;
  }
  
  createPlaylist(playlist) {
    const newPlaylist = {
      ...playlist,
      id: `u${this.playlists.length + 1}`,
      creator: {
        id: 'me',
        name: 'You',
        avatar: null
      },
      likes: 0,
      itemCount: 0
    };
    
    this.playlists = [newPlaylist, ...this.playlists];
    return newPlaylist;
  }
  
  updatePlaylist(id, updates) {
    this.playlists = this.playlists.map(playlist => 
      playlist.id === id ? { ...playlist, ...updates } : playlist
    );
  }
  
  deletePlaylist(id) {
    this.playlists = this.playlists.filter(playlist => playlist.id !== id);
  }
  
  toggleLike(id) {
    // Check in user playlists
    let found = false;
    this.playlists = this.playlists.map(playlist => {
      if (playlist.id === id) {
        found = true;
        return { 
          ...playlist, 
          likes: playlist.liked ? playlist.likes - 1 : playlist.likes + 1,
          liked: !playlist.liked
        };
      }
      return playlist;
    });
    
    if (!found) {
      // Check in featured playlists
      this.featuredPlaylists = this.featuredPlaylists.map(playlist => {
        if (playlist.id === id) {
          return { 
            ...playlist, 
            likes: playlist.liked ? playlist.likes - 1 : playlist.likes + 1,
            liked: !playlist.liked
          };
        }
        return playlist;
      });
      
      // Check in popular playlists
      this.popularPlaylists = this.popularPlaylists.map(playlist => {
        if (playlist.id === id) {
          return { 
            ...playlist, 
            likes: playlist.liked ? playlist.likes - 1 : playlist.likes + 1,
            liked: !playlist.liked
          };
        }
        return playlist;
      });
    }
  }
}

export default ProductPlaylistStore; 