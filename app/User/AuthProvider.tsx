'use client';


import { ISupabaseUser } from '@/utils/interface/auth';
import { createClient } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';
// --- TYPES ---
// import { type User } from '@supabase/supabase-js';

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type Dispatch,
  type PropsWithChildren,
  useState,
  useRef,
} from 'react';
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// import { authReducer, initialState, type AuthState, type AuthAction } from './authReducer';

// custom User interface for the auth state supabase when will need we will add supabase user type
/*interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}*/
// The shape of your global authentication state
export interface AuthState {
  isAuthenticated: boolean;
  isInitialized?: boolean;
  user: ISupabaseUser | null;
  error?: string | null;
  stripeCustomerId: string | null;
  token: string | null;
  // dispatch?: Dispatch<AuthAction>;
}

// All possible actions that can be dispatched to the reducer
export type AuthAction =
  | { type: 'INITIALIZE'; payload: { isAuthenticated: boolean; user: ISupabaseUser | null } }
  | { type: 'LOGIN'; payload: { user: ISupabaseUser } }
  | { type: 'LOGOUT' }
  | { type: 'AUTH_ERROR'; payload: { error: string } };

// The initial state before any authentication check runs
export const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  error: null,
  stripeCustomerId: null,
  token: null,
};


// 1. Create the Context
const AuthContext = createContext<AuthState | undefined>(undefined);

// --- PROVIDER COMPONENT ---
export function AuthProvider({
  children,
  // token, userFromOut, stripeCustomerId 
}: PropsWithChildren<{
  // token: string | null, userFromOut: any | null, stripeCustomerId: string | null 
}>) {

  const supabase = createClient();
  const router = useRouter();

  console.log("Auth Provider Rendering...");

  const [authDetails, setAuthDetails] = useState<{
    token: string | null,
    user: any | null,
    stripeCustomerId: string | null,
  }>({
    token: null,
    user: null,
    stripeCustomerId: null,
  });


  const initialized = useRef(false);

  useEffect(() => {
    /*setAuthDetails({
      token: token,
      user: userFromOut,
      stripeCustomerId: stripeCustomerId,
    });*/

    const initializeSession = async () => {
      if (initialized.current) return;
      initialized.current = true;

      const { data: { session } } = await supabase.auth.getSession();

      console.log("data supabase session:", session);

      if (session) {
        // session.user.id
        // dispatch(authActions.setUser(session.user));
        // dispatch(authActions.setUser(session.user as any));
        console.log("session.user:", session.user);

        setAuthDetails({
          ...authDetails,
          // token: token,
          user: session.user,
          // stripeCustomerId: stripeCustomerId,
        });


      } else {
        // dispatch(authActions.clearAuth());
        // dispatch(authActions.setUser(null));
        setAuthDetails({
          ...authDetails,
          // token: token,
          user: null,
          // stripeCustomerId: stripeCustomerId,
        });
      }
    };

    initializeSession();

    // 2. THE EVENT LISTENER
    // This is the "Switchboard" that listens for signals from Supabase
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: string, session: any) => {
        console.log("Auth Event:", event);
        console.log("Auth Session:", session);

        // Scenario: User logs in or token is refreshed in the background
        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          if (session?.user) {
            /*dispatch(authActions.setAuth({
              user: session.user,
              isAuthenticated: true
            }));*/
            // dispatch(authActions.setUser(session.user));
            setAuthDetails({
              ...authDetails,
              // token: token,
              user: session.user,
              // stripeCustomerId: stripeCustomerId,
            });
          }
        }

        // Scenario: User logs out (from THIS tab OR another tab)
        if (event === "SIGNED_OUT") {
          /*dispatch(authActions.clearAuth());*/

          // router.refresh clears the Next.js server-side cache for the current page
          // dispatch(authActions.setUser(null));
          setAuthDetails({
            ...authDetails,
            // token: token,
            user: null,
            // stripeCustomerId: stripeCustomerId,
          });
          router.refresh();
          // router.push("/login");
        }

        // Scenario: Password changed or user deleted
        if (event === "USER_UPDATED") {
          if (session?.user) {
            // dispatch(authActions.setAuth({ user: session.user, isAuthenticated: true }));
            // dispatch(authActions.setUser(session.user));
            setAuthDetails({
              ...authDetails,
              // token: token,
              user: session.user,
              // stripeCustomerId: stripeCustomerId,
            });
          }
        }
      }
    );


    return () => {
      subscription.unsubscribe();
    }


  }, [authDetails.token, authDetails.user, authDetails.stripeCustomerId]);


  return <AuthContext.Provider value={{
    user: authDetails.user,
    token: authDetails.token,
    stripeCustomerId: authDetails.stripeCustomerId,
    isAuthenticated: authDetails.user !== null,
    //isInitialized: true,
    /*error: null,
    dispatch: () => { },*/
  }}>{children}</AuthContext.Provider>;
}

// --- CUSTOM HOOK ---
// 4. Custom hook for simple consumption in components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};