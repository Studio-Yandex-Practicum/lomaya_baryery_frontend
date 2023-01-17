import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import { authReducer } from './auth';
import { rootShiftsReducer } from './root-shifts';
import { tasksSliderReducer } from './tasks-slider';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    rootShifts: rootShiftsReducer,
    tasks: tasksSliderReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
