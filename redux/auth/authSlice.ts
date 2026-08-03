import { ISupabaseUser } from "@/utils/interface-auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@supabase/supabase-js";

interface IAuthSlice {
  browser_user_id: string | null;
  user: ISupabaseUser | null;
  loading: boolean;
  error: string | null;

  modalAuth: {
    show: boolean;
    contentType: "login" | "signup" | "forgot-password" | "";
  }
}

const initialState: IAuthSlice = {
  browser_user_id: null,
  user: null,
  loading: true, // true by default so your UI shows a spinner while checking the initial session
  error: null,
  modalAuth: {
    show: false,
    contentType: "login",
  }
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Syncs Supabase state to Redux
    setAuthState: (state, action: PayloadAction<ISupabaseUser | null>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    // Allows you to set an auth error manually if a login attempt fails
    setAuthError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    // Set loading explicitly during manual transitions
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setShowModalAuth: (state, action: PayloadAction<{ show: boolean, contentType: "login" | "signup" | "forgot-password" | "" }>) => {
      state.modalAuth.show = action.payload.show;
      state.modalAuth.contentType = action.payload.contentType;
    },

    setBrowserUserId: (state, action: PayloadAction<string>) => {
      state.browser_user_id = action.payload;
    }
  },
});

export const { setAuthState, setAuthError, setAuthLoading, setShowModalAuth, setBrowserUserId } = authSlice.actions;
export default authSlice.reducer;