// src/redux/StoreProvider.tsx
'use client';

import {
  AppStore,
  makeStore,
  // store 
} from '@/redux/store';
import React, { useRef } from 'react';
import { Provider } from 'react-redux';

/*export function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}*/

export default function StoreProvider({
  children,
  preloadedState
}: {
  children: React.ReactNode;
  preloadedState?: any;
}) {

  const storeRef = useRef<AppStore>(null);

  if (!storeRef.current) {
    // Initialize the store only once with the preloaded state
    storeRef.current = makeStore(preloadedState);
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}