import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

interface IAuthState {
  login: string | null;
  name: string;
  phone: string;
  auth: boolean;
}

const initialState: IAuthState = {
  login: null,
  name: '',
  phone: '',
  auth: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<IAuthState['login']>) {
      state.login = action.payload;
      state.auth = true;
    },
    signOut() {
      return { ...initialState };
    },
  },
});

export const authReducer = authSlice.reducer;
export const { signIn: signInAction, signOut: signOutAction } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
