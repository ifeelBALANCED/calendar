import { configureStore } from '@reduxjs/toolkit';
import { CalendarReducer } from './slices';

export const store = configureStore({
  reducer: {
    calendar: CalendarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type TypeRootState = ReturnType<typeof store.getState>;
