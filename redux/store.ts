// redux/store.ts
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { bookingSlice } from './booking/bookingSlice';
import { authSlice } from './auth/authSlice';
import { controlsSlice } from './controls/controlsSlice';

/*export const store = configureStore({
  reducer: {
    // This is where your feature reducers will live
    booking: bookingSlice.reducer,
    auth: authSlice.reducer
  },
});

// 1. Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof store.getState>;

// 2. Infer the `AppDispatch` type so your app knows which actions are valid
export type AppDispatch = typeof store.dispatch;*/

// Create a function that returns a new store instance
/*export const makeStore = (preloadedState?: any) => {
  return configureStore({
    reducer: {
      booking: bookingSlice.reducer,
      auth: authSlice.reducer
    },
    // This allows you to inject state (like your authUser) on launch
    preloadedState,
  });
};

// Infer the type from the return of makeStore
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];*/


// 1. Explicitly combine the reducers into a single reducer function
// 1. Combine reducers
const rootReducer = combineReducers({
  booking: bookingSlice.reducer,
  auth: authSlice.reducer,
  controls: controlsSlice.reducer,
});

// 2. Derive RootState
export type RootState = ReturnType<typeof rootReducer>;

// 3. Define the factory function using standard Partial
// No extra imports needed!
export const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];