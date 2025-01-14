import { makeAutoObservable } from 'mobx';
import { RootStore } from './RootStore';

interface User {
  id: string;
  name: string;
  email: string;
}

export class UserStore {
  user: User | null = null;
  loading: boolean = false;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      rootStore: false
    });
  }

  setUser(user: User | null) {
    this.user = user;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  async login(email: string, password: string) {
    try {
      this.setLoading(true);
      // Add your login API call here
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      const userData = await response.json();
      this.setUser(userData);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      this.setLoading(false);
    }
  }

  logout() {
    this.setUser(null);
  }
}
