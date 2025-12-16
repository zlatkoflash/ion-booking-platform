'use client';


// --- TYPES ---
// import { type User } from '@supabase/supabase-js';

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type Dispatch,
  type PropsWithChildren,
} from 'react';
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// import { authReducer, initialState, type AuthState, type AuthAction } from './authReducer';

// custom User interface for the auth state supabase when will need we will add supabase user type
interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}
// The shape of your global authentication state
export interface AuthState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: User | null;
  error: string | null;
}

// All possible actions that can be dispatched to the reducer
export type AuthAction =
  | { type: 'INITIALIZE'; payload: { isAuthenticated: boolean; user: User | null } }
  | { type: 'LOGIN'; payload: { user: User } }
  | { type: 'LOGOUT' }
  | { type: 'AUTH_ERROR'; payload: { error: string } };

// The initial state before any authentication check runs
export const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  error: null,
};

// --- REDUCER FUNCTION ---
export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'INITIALIZE':
      // Called on app load to set the initial state from cookies/storage
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
        error: null,
      };

    case 'LOGIN':
      // Called after successful verification (e.g., via verifyOtp)
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        error: null,
      };

    case 'LOGOUT':
      // Called after successful logout
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
      };

    case 'AUTH_ERROR':
      // Called if an API or authentication error occurs
      return {
        ...state,
        error: action.payload.error,
      };

    default:
      return state;
  }
};



// --- CONTEXT TYPES ---
// The full context value includes the state and the dispatch function
interface AuthContextType extends AuthState {
  dispatch: Dispatch<AuthAction>;
}

// 1. Create the Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- PROVIDER COMPONENT ---
export function AuthProvider({ children, token, userFromOut }: PropsWithChildren<{ token: string | null, userFromOut: any | null }>) {

  console.log("Auth Provider Rendering...");

  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: userFromOut !== null,
    user: userFromOut,
    error: null,
    isInitialized: true,
  });

  // const supabase = createClientComponentClient();

  // Initial check runs only once when the provider is mounted
  /*
  supabase auth login
  useEffect(() => {
    // 2. Initializing the state from Supabase's stored session
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // If a session exists, initialize with the user data
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user: session.user,
            },
          });
        } else {
          // If no session, initialize as unauthenticated
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error('Auth initialization failed:', err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };
 
    initializeAuth();
 
    // 3. Listen for real-time changes (e.g., manual logout in another tab)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
            if (event === 'SIGNED_OUT') {
                dispatch({ type: 'LOGOUT' });
            } else if (event === 'SIGNED_IN' && session) {
                dispatch({ type: 'LOGIN', payload: { user: session.user } });
            }
        }
    );
 
    return () => {
        // Clean up subscription on unmount
        subscription?.unsubscribe();
    };
  }, [supabase.auth]);*/



  // The value provided to all consumers
  const contextValue: AuthContextType = {
    ...state,
    dispatch,
  };


  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
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