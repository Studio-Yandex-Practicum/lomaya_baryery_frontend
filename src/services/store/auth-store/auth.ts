import { create } from 'zustand';

interface AuthStore {
  isAuth: boolean;
  setAuth: (state: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(function implementStore(set) {
  return {
    isAuth: true,
    setAuth: (state) => set(() => ({ isAuth: state })),
  };
});
