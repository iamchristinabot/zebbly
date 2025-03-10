import counterStore from './counterStore';

class RootStore {
  constructor() {
    this.counterStore = counterStore;
    // Add other stores here as your application grows
    // this.userStore = userStore;
    // this.productStore = productStore;
  }
}

export default new RootStore(); 