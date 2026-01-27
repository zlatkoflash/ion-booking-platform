import { configureStore } from '@reduxjs/toolkit';
// import editorReducer from './features/editor/editorSlice';
// import templateReducer from './features/templates/templatesSlice';
// import shopReducer from './features/shop/shopSlice';
import bookingCalendarReducer from './features/BookingCalendar/bookingCalendarSlice'

export const makeStore = () => {

  return configureStore({
    reducer: {
      // editor: editorReducer,
      // template: templateReducer,
      // shop: shopReducer,
      bookingCalendar: bookingCalendarReducer,
    },
  });
};

// 2. Create the ACTUAL store instance (the object)
export const store = makeStore();

// Types to help TypeScript know what's in your store
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];