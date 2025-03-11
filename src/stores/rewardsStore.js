import { makeAutoObservable } from 'mobx';

class RewardsStore {
  userPoints = 250; // Starting points for new users
  userLevel = 1;
  userBadges = [
    { id: 'welcome', name: 'Welcome', icon: '🎉', earned: true, description: 'Joined Zebbly' },
    { id: 'first_share', name: 'First Share', icon: '🛍️', earned: false, description: 'Shared your first product' },
    { id: 'trendsetter', name: 'Trendsetter', icon: '🔥', earned: false, description: 'One of your products reached 50+ likes' },
    { id: 'collector', name: 'Collector', icon: '📚', earned: false, description: 'Created 5 product lists' },
    { id: 'influencer', name: 'Influencer', icon: '⭐', earned: false, description: 'Reached 100 followers' },
    { id: 'expert', name: 'Category Expert', icon: '🏆', earned: false, description: 'Shared 20+ products in one category' }
  ];
  
  // Rewards that can be redeemed with points
  availableRewards = [
    { id: 'discount_10', name: '10% Discount', icon: '💰', cost: 100, description: '10% off your next purchase at partner stores' },
    { id: 'free_shipping', name: 'Free Shipping', icon: '🚚', cost: 150, description: 'Free shipping on your next order' },
    { id: 'exclusive_access', name: 'Early Access', icon: '🔑', cost: 300, description: 'Early access to new features and products' },
    { id: 'verified_badge', name: 'Verified Status', icon: '✓', cost: 500, description: 'Get a verified badge on your profile' },
    { id: 'gift_card', name: '$10 Gift Card', icon: '🎁', cost: 1000, description: '$10 gift card to a store of your choice' }
  ];
  
  // Point history
  pointsHistory = [
    { id: 1, amount: 50, reason: 'Completed profile', date: '2023-05-15' },
    { id: 2, amount: 100, reason: 'Shared 5 products', date: '2023-05-20' },
    { id: 3, amount: 25, reason: 'Daily login streak: 5 days', date: '2023-05-25' },
    { id: 4, amount: 75, reason: 'Product reached 25 likes', date: '2023-06-01' }
  ];
  
  constructor() {
    makeAutoObservable(this);
  }
  
  get totalPoints() {
    return this.userPoints;
  }
  
  get earnedBadges() {
    return this.userBadges.filter(badge => badge.earned);
  }
  
  get unearnedBadges() {
    return this.userBadges.filter(badge => !badge.earned);
  }
  
  addPoints(amount, reason) {
    this.userPoints += amount;
    this.pointsHistory.push({
      id: this.pointsHistory.length + 1,
      amount,
      reason,
      date: new Date().toISOString().split('T')[0]
    });
    
    // Check if user should level up
    this.checkLevelUp();
    
    return amount;
  }
  
  checkLevelUp() {
    const newLevel = Math.floor(this.userPoints / 500) + 1;
    if (newLevel > this.userLevel) {
      this.userLevel = newLevel;
      return true;
    }
    return false;
  }
  
  earnBadge(badgeId) {
    const badge = this.userBadges.find(b => b.id === badgeId);
    if (badge && !badge.earned) {
      badge.earned = true;
      this.addPoints(50, `Earned ${badge.name} badge`);
      return badge;
    }
    return null;
  }
  
  redeemReward(rewardId) {
    const reward = this.availableRewards.find(r => r.id === rewardId);
    if (reward && this.userPoints >= reward.cost) {
      this.userPoints -= reward.cost;
      this.pointsHistory.push({
        id: this.pointsHistory.length + 1,
        amount: -reward.cost,
        reason: `Redeemed ${reward.name}`,
        date: new Date().toISOString().split('T')[0]
      });
      return reward;
    }
    return null;
  }
}

export default RewardsStore; 