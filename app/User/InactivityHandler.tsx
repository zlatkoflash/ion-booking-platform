'use client';

import { createClient } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback, useRef } from 'react';

export const InactivityHandler = () => {
  const [showModal, setShowModal] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  // Refs to keep track of timers across re-renders
  const warnTimerRef = useRef<NodeJS.Timeout | null>(null);
  const logoutTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  // Times in Milliseconds
  const WARN_TIME = 13 * 60 * 1000;    // Show modal at 13 mins
  const LOGOUT_TIME = 15 * 60 * 1000;  // Final logout at 15 mins

  const logout = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error);
    }
    setShowModal(false);
    router.refresh();
    // router.push('/login'); // Force redirect after logout
  }, [supabase, router]);

  const startTimers = useCallback(() => {
    // Clear any existing timers
    if (warnTimerRef.current) clearTimeout(warnTimerRef.current);
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);

    // Set timer for the warning modal
    warnTimerRef.current = setTimeout(() => {
      setShowModal(true);
    }, WARN_TIME);

    // Set timer for the final logout
    logoutTimerRef.current = setTimeout(() => {
      logout();
    }, LOGOUT_TIME);
  }, [logout]);

  const handleActivity = useCallback(() => {
    // Throttling: Only reset timers if 2 seconds have passed since last activity
    // This saves CPU/Performance during heavy mouse movement
    const now = Date.now();
    if (now - lastActivityRef.current < 2000) return;

    lastActivityRef.current = now;

    if (!showModal) {
      startTimers();
    }
  }, [showModal, startTimers]);

  useEffect(() => {
    const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, handleActivity));

    startTimers();

    return () => {
      events.forEach(event => window.removeEventListener(event, handleActivity));
      if (warnTimerRef.current) clearTimeout(warnTimerRef.current);
      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    };
  }, [handleActivity, startTimers]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 transform transition-all animate-in fade-in zoom-in duration-300">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-amber-100 rounded-full">
          <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h3 className="text-xl font-bold text-center text-gray-900">
          Your session is expiring
        </h3>
        <p className="mt-3 text-center text-gray-600">
          For your security, you'll be logged out in <span className="font-bold text-gray-900">2 minutes</span> due to inactivity. Would you like to stay?
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={() => {
              setShowModal(false);
              startTimers(); // Restart both timers
            }}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-200"
          >
            Yes, keep me logged in
          </button>
          <button
            onClick={logout}
            className="w-full py-2 text-sm font-medium text-gray-400 hover:text-red-500 transition-colors"
          >
            Log out now
          </button>
        </div>
      </div>
    </div>
  );
};