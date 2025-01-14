import { createContext, useContext } from 'react';
import { RootStore } from './RootStore';

export const RootStoreContext = createContext<RootStore | null>(null);

export const RootStoreProvider = RootStoreContext.Provider;

export const useRootStore = () => {
  const context = useContext(RootStoreContext);
  if (context === null) {
    throw new Error('useRootStore must be used within a RootStoreProvider');
  }
  return context;
};

export const useUserStore = () => {
  const { userStore } = useRootStore();
  return userStore;
};