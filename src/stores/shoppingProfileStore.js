import { makeAutoObservable, runInAction } from "mobx";

class ShoppingProfileStore {
  profiles = [];
  loading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  loadProfiles = async () => {
    this.loading = true;
    this.error = null;
    
    try {
      // In a real app, this would be an API call
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock profiles data
      const mockProfiles = [
        {
          id: "profile1",
          name: "My Style",
          relationship: "self",
          age: 32,
          gender: "Female",
          interests: [
            "Minimalist design",
            "Sustainable fashion",
            "Outdoor activities",
          ],
          stylePreferences: ["Casual chic", "Business casual", "Athleisure"],
          favoriteColors: ["Navy", "Beige", "Olive green"],
          favoriteCategories: ["Clothing", "Home decor", "Accessories"],
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          isDefault: true,
        },
        {
          id: "profile2",
          name: "Michael (Husband)",
          relationship: "spouse",
          age: 34,
          gender: "Male",
          interests: ["Technology", "Hiking", "Cooking"],
          stylePreferences: ["Casual", "Sporty", "Classic"],
          favoriteColors: ["Blue", "Gray", "Black"],
          favoriteCategories: [
            "Electronics",
            "Outdoor gear",
            "Kitchen gadgets",
          ],
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          isDefault: false,
        },
        {
          id: "profile3",
          name: "Emma (Daughter)",
          relationship: "child",
          age: 7,
          gender: "Female",
          interests: ["Art", "Animals", "Reading"],
          stylePreferences: ["Colorful", "Comfortable", "Fun"],
          favoriteColors: ["Pink", "Purple", "Yellow"],
          favoriteCategories: ["Toys", "Books", "Clothing"],
          avatar: "https://randomuser.me/api/portraits/women/67.jpg",
          isDefault: false,
        },
      ];
      
      runInAction(() => {
        this.profiles = mockProfiles;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error.message;
        this.loading = false;
      });
    }
  };

  addProfile = async (profile) => {
    this.loading = true;
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Generate a unique ID
      const newProfile = {
        ...profile,
        id: `profile${Date.now()}`,
        isDefault: this.profiles.length === 0 ? true : profile.isDefault
      };
      
      runInAction(() => {
        // If this is set as default, update other profiles
        if (newProfile.isDefault) {
          this.profiles = this.profiles.map(p => ({
            ...p,
            isDefault: false
          }));
        }
        
        this.profiles.push(newProfile);
        this.loading = false;
      });
      
      return newProfile;
    } catch (error) {
      runInAction(() => {
        this.error = error.message;
        this.loading = false;
      });
      throw error;
    }
  };

  updateProfile = async (profileId, updatedData) => {
    this.loading = true;
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      runInAction(() => {
        // If setting as default, update other profiles
        if (updatedData.isDefault) {
          this.profiles = this.profiles.map(p => ({
            ...p,
            isDefault: false
          }));
        }
        
        this.profiles = this.profiles.map(profile => 
          profile.id === profileId ? { ...profile, ...updatedData } : profile
        );
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error.message;
        this.loading = false;
      });
    }
  };

  deleteProfile = async (profileId) => {
    this.loading = true;
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const deletedProfile = this.profiles.find(p => p.id === profileId);
      
      runInAction(() => {
        this.profiles = this.profiles.filter(profile => profile.id !== profileId);
        
        // If we deleted the default profile and have other profiles, set a new default
        if (deletedProfile?.isDefault && this.profiles.length > 0) {
          this.profiles[0].isDefault = true;
        }
        
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error.message;
        this.loading = false;
      });
    }
  };

  setDefaultProfile = async (profileId) => {
    this.loading = true;
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      runInAction(() => {
        this.profiles = this.profiles.map(profile => ({
          ...profile,
          isDefault: profile.id === profileId
        }));
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error.message;
        this.loading = false;
      });
    }
  };
}

export default ShoppingProfileStore; 