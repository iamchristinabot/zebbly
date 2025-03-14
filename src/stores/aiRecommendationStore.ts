import { makeObservable, observable, action, runInAction } from 'mobx';
import type { RootStore } from './rootStore';

interface Recommendation {
  id: string;
  productId: string;
  score: number;
  reason: string;
  timestamp: Date;
}

export class AIRecommendationStore {
  @observable private rootStore: RootStore;
  @observable recommendations: Recommendation[] = [];
  @observable isLoading = false;
  @observable error: string | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  async fetchRecommendations(userId: string) {
    try {
      this.isLoading = true;
      this.error = null;
      
      // Implement your recommendation fetching logic here
      // const response = await api.getRecommendations(userId);
      
      runInAction(() => {
        // this.recommendations = response.recommendations;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'An error occurred';
        this.isLoading = false;
      });
    }
  }

  addRecommendation(recommendation: Recommendation) {
    this.recommendations.push(recommendation);
  }

  removeRecommendation(recommendationId: string) {
    this.recommendations = this.recommendations.filter(rec => rec.id !== recommendationId);
  }

  get hasRecommendations() {
    return this.recommendations.length > 0;
  }

  get sortedRecommendations() {
    return [...this.recommendations].sort((a, b) => b.score - a.score);
  }
} 