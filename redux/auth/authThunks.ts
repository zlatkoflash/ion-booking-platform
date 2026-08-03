import { createClient } from "@/utils/supabaseClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthError, setAuthLoading, setAuthState } from "./authSlice"; // 👈 1. Import setAuthState

// 🌟 THE ASYNC THUNK THAT HANDLES BOTH SUPABASE AND REDUX
export const logoutAction = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch, rejectWithValue }) => {
    const supabase = createClient();
    try {
      dispatch(setAuthLoading(true));

      // 1. Destroys the session token inside Supabase and browser storage
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // 2. Explicitly clear your Redux auth state by passing null 
      dispatch(setAuthState(null)); // 👈 2. Add this line right here!


      return null;
    } catch (err: any) {
      dispatch(setAuthError(err.message));
      return rejectWithValue(err.message);
    }
  }
);