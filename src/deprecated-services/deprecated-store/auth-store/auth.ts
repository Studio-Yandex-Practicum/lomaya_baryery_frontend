import { create } from 'zustand';
import { createStore, createEvent } from 'effector';

interface AuthStore {
  isAuth: boolean;
  setAuth: (state: boolean) => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuth: true,
  setAuth: (state) => set(() => ({ isAuth: state })),
}));

export const $auth = createStore(true);

export const authEvent = createEvent<boolean>();

$auth.on(authEvent, (_, isAuth) => isAuth);
