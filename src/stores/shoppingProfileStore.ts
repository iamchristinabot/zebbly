import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import type { ShoppingProfile, StyleTwin } from "../types/index";
import type { RootStore } from "./rootStore";

interface ShoppingPreference {
  category: string;
  minPrice: number;
  maxPrice: number;
  brands: string[];
  styles: string[];
}

export class ShoppingProfileStore {
  @observable private rootStore: RootStore;
  @observable profiles: ShoppingProfile[] = [];
  @observable currentProfile: ShoppingProfile | null = null;
  @observable styleTwins: StyleTwin[] = [];
  @observable isLoading = false;
  @observable error: string | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @action
  async loadProfiles() {
    try {
      this.isLoading = true;
      this.error = null;

      // Mock data for development
      const mockProfiles: ShoppingProfile[] = [
        {
          id: "husband-1",
          userId: "1",
          name: "John (Husband)",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          preferences: [
            {
              category: "Tech",
              minPrice: 100,
              maxPrice: 1000,
              brands: ["Apple", "Samsung", "Sony"],
              styles: ["Modern", "Professional"],
            },
            {
              category: "Sports",
              minPrice: 30,
              maxPrice: 200,
              brands: ["Nike", "Under Armour", "Adidas"],
              styles: ["Athletic", "Casual"],
            },
          ],
          favoriteStores: ["Best Buy", "REI", "Nike", "Amazon"],
          recentSearches: [
            "wireless headphones",
            "running shoes",
            "smart watch",
          ],
          stylePreferences: ["Athletic", "Casual", "Modern", "Professional"],
          interests: ["Technology", "Sports", "Fitness", "Outdoor Activities"],
          favoriteCategories: [
            "Electronics",
            "Sports Equipment",
            "Athletic Wear",
            "Outdoor Gear",
          ],
          lastUpdated: new Date(),
          isDefault: false,
          relationship: "self",
          gender: "",
          favoriteColors: [],
        },
        {
          id: "daughter-1",
          userId: "1",
          name: "Emma (Daughter)",
          avatar: "https://randomuser.me/api/portraits/women/67.jpg",
          preferences: [
            {
              category: "Toys",
              minPrice: 10,
              maxPrice: 100,
              brands: ["LEGO", "Disney", "Crayola"],
              styles: ["Colorful", "Educational", "Fun"],
            },
            {
              category: "Clothing",
              minPrice: 15,
              maxPrice: 75,
              brands: ["Gap Kids", "H&M Kids", "Zara Kids"],
              styles: ["Cute", "Comfortable", "Playful"],
            },
          ],
          favoriteStores: ["Target", "Disney Store", "Amazon Kids", "Gap Kids"],
          recentSearches: ["art supplies", "princess dress", "learning toys"],
          stylePreferences: ["Colorful", "Cute", "Comfortable", "Playful"],
          interests: ["Art", "Reading", "Dancing", "Learning"],
          favoriteCategories: [
            "Toys",
            "Books",
            "Art Supplies",
            "Kids Clothing",
          ],
          lastUpdated: new Date(),
          isDefault: false,
          relationship: "self",
          gender: "",
          favoriteColors: [],
        },
      ];

      runInAction(() => {
        this.profiles = mockProfiles;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error =
          error instanceof Error ? error.message : "An error occurred";
        this.isLoading = false;
      });
    }
  }

  @action
  async loadStyleTwins(profileId: string) {
    try {
      this.isLoading = true;
      const profile = this.profiles.find((p) => p.id === profileId);

      if (!profile) {
        throw new Error("Profile not found");
      }

      // Mock style twins data
      const mockTwins: StyleTwin[] = [
        {
          id: "user1",
          name: "Emma Thompson",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          matchScore: 0.92,
          bio: "Fashion enthusiast with a love for minimalist design and sustainable brands.",
          location: "New York, NY",
          followers: 1243,
          following: 567,
          styleTraits: profile.stylePreferences || [
            "Minimalist",
            "Sustainable",
            "Modern",
            "Casual Chic",
          ],
          favoriteCategories: profile.favoriteCategories || [
            "Fashion",
            "Home Decor",
            "Accessories",
          ],
          favoriteBrands: ["Everlane", "Reformation", "Muji", "IKEA"],
          recentProducts: [
            {
              id: "p1",
              title: "Linen Shirt Dress",
              image: "https://picsum.photos/seed/product1/300/200",
              price: 89.99,
            },
            {
              id: "p2",
              title: "Ceramic Planter",
              image: "https://picsum.photos/seed/product2/300/200",
              price: 34.99,
            },
            {
              id: "p3",
              title: "Minimalist Watch",
              image: "https://picsum.photos/seed/product3/300/200",
              price: 129.99,
            },
          ],
          commonInterests: profile.interests || [
            "Sustainable Fashion",
            "Indoor Plants",
            "Scandinavian Design",
          ],
        },
        {
          id: "user2",
          name: "Michael Chen",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          matchScore: 0.87,
          bio: "Tech enthusiast and design lover. Always looking for smart home gadgets and sleek accessories.",
          location: "San Francisco, CA",
          followers: 892,
          following: 345,
          styleTraits: ["Modern", "Tech-Forward", "Minimalist", "Urban"],
          favoriteCategories: ["Electronics", "Smart Home", "Accessories"],
          favoriteBrands: ["Apple", "Samsung", "Bose", "Philips Hue"],
          recentProducts: [
            {
              id: "p4",
              title: "Wireless Earbuds",
              image: "https://picsum.photos/seed/product4/300/200",
              price: 149.99,
            },
            {
              id: "p5",
              title: "Smart Desk Lamp",
              image: "https://picsum.photos/seed/product5/300/200",
              price: 79.99,
            },
            {
              id: "p6",
              title: "Minimalist Backpack",
              image: "https://picsum.photos/seed/product6/300/200",
              price: 89.99,
            },
          ],
          commonInterests: [
            "Smart Home Tech",
            "Minimalist Design",
            "Productivity Gadgets",
          ],
        },
      ];

      runInAction(() => {
        this.styleTwins = mockTwins;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error =
          error instanceof Error ? error.message : "An error occurred";
        this.isLoading = false;
      });
    }
  }

  @action
  toggleFollowTwin(twinId: string) {
    this.styleTwins = this.styleTwins.map((twin) =>
      twin.id === twinId ? { ...twin, isFollowing: !twin.isFollowing } : twin
    );
  }

  @action
  loadMoreStyleTwins() {
    // Implementation for loading more style twins
    // This would typically be an API call in a real application
  }

  @action
  setCurrentProfile(profile: ShoppingProfile) {
    this.currentProfile = profile;
  }

  @action
  updatePreference(
    profileId: string,
    categoryId: string,
    preference: Partial<ShoppingPreference>
  ) {
    const profile = this.profiles.find((p) => p.id === profileId);
    if (!profile) return;

    if (!profile.preferences) {
      profile.preferences = [];
    }

    const index = profile.preferences.findIndex(
      (p) => p.category === categoryId
    );
    if (index !== -1) {
      profile.preferences[index] = {
        ...profile.preferences[index],
        ...preference,
      };
    } else {
      profile.preferences.push({
        category: categoryId,
        minPrice: 0,
        maxPrice: 1000,
        brands: [],
        styles: [],
        ...preference,
      });
    }
  }

  @action
  addRecentSearch(profileId: string, search: string) {
    const profile = this.profiles.find((p) => p.id === profileId);
    if (!profile) return;

    const searches = new Set([search, ...(profile.recentSearches || [])]);
    profile.recentSearches = Array.from(searches).slice(0, 10);
  }

  @action
  clearRecentSearches(profileId: string) {
    const profile = this.profiles.find((p) => p.id === profileId);
    if (profile) {
      profile.recentSearches = [];
    }
  }

  @action
  setDefaultProfile(profileId: string) {
    this.profiles = this.profiles.map((profile) => ({
      ...profile,
      isDefault: profile.id === profileId,
    }));
  }

  @action
  deleteProfile(profileId: string) {
    this.profiles = this.profiles.filter((profile) => profile.id !== profileId);
  }

  @computed
  get hasProfiles() {
    return this.profiles.length > 0;
  }

  @computed
  get defaultProfile() {
    return this.profiles.find((p) => p.isDefault) || this.profiles[0] || null;
  }
}
