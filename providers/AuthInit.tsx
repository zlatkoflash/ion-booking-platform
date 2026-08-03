"use client";

import { setAuthState, setBrowserUserId } from "@/redux/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { getOrGenerateGuestId } from "@/utils/guest";
import { ISupabaseUser } from "@/utils/interface-auth";
import { createClient } from "@/utils/supabaseClient";
import { useEffect, useLayoutEffect } from "react";

export default function AuthInitializer(
  { children, initialUser }:
    {
      children: React.ReactNode,
      initialUser: ISupabaseUser | null
    }) {
  const dispatch = useAppDispatch();
  const supabase = createClient();

  // 1. Synchronous initialization (No flicker)
  useLayoutEffect(() => {
    // dispatch(setAuthState(initialUser)); // this is happening from layout.tsx
    dispatch(setBrowserUserId(getOrGenerateGuestId()));

    console.log("AuthInitializer useLayoutEffect completed");

  }, [dispatch, initialUser]);

  useEffect(() => {
    // dispatch(setBrowserUserId(getOrGenerateGuestId()));
    // 1. Check for an active session immediately when application loads
    /*supabase.auth.getSession().then(({ data: { session } }) => {
      let userFor = null;
      if (session !== null && session.user !== null) {
        userFor = session?.user as ISupabaseUser;
      }
      // dispatch(setAuthState(session?.user ?? null));
      dispatch(setAuthState(userFor));
      console.log("AuthInitializergetSession effect completed");
    });
    */
    // 2. Listen to real-time changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {

      // console.log("supabase onAuthStateChange event:", event);
      // console.log("supabase onAuthStateChange session:", session);

      let userFor = null;
      if (session !== null && session.user !== null) {
        userFor = session?.user as ISupabaseUser;
      }
      // dispatch(setAuthState(session?.user ?? null));
      dispatch(setAuthState(userFor));
    });


    console.log("AuthInitializer onAuthStateChange effect completed");

    // dispatch(setAuthState(initialUser))

    // Clean up subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch, supabase]);

  return <>{children}</>;
}