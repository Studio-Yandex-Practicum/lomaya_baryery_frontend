import { create } from 'zustand';

interface AuthStore {
  isAuth: boolean;
  setAuth: (state: boolean) => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuth: true,
  setAuth: (state) => set(() => ({ isAuth: state })),
}));
