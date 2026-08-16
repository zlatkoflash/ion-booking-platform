"use client";

import ModalCancelEdit from "@/app/[locale]/Client/CancelTour/components/ModalCancelEdit";
import { useCallback, useEffect, useRef, useState } from "react";
import Title from "../typography/Title";
import ButtonDefault from "../buttons/ButtonDefault";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutAction } from "@/redux/auth/authThunks";




export default function LogoutTimer() {
  const [modalIsOpened, setModalIsOpened] = useState(false);
  const SECONDS_TO_LOGOUT = 2 * 60; // 120 seconds for testing (change as needed)
  const [secondsRemaining, setSecondsRemaining] = useState(SECONDS_TO_LOGOUT);

  const INACTIVITY_LIMIT = 15 * 60 * 1000; // 15 minutes inactivity timeout
  const modalTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  const userAuth = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const DoLogoutFinally = () => {
    console.log("🔒 [LogoutTimer] Executing Redux dispatch(logoutAction())...");
    dispatch(logoutAction());
  };

  // EVENT: Triggered when the countdown hits zero
  const handleAutoLogout = useCallback(() => {
    console.log("⏰ [LogoutTimer] 2-minute countdown expired. Auto-logging out...");
    setModalIsOpened(false);
    if (modalTimerRef.current) clearTimeout(modalTimerRef.current);
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);

    DoLogoutFinally();
  }, []);

  // EVENT: Triggered when user manually clicks "Log out now"
  const handleManualLogout = () => {
    console.log("🖱️ [LogoutTimer] User clicked 'Log out now'. Manual logout...");
    setModalIsOpened(false);
    if (modalTimerRef.current) clearTimeout(modalTimerRef.current);
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);

    DoLogoutFinally();
  };

  // Function to start or reset the inactivity countdown
  const setTimerForSession = useCallback(() => {
    if (!userAuth) return;

    if (modalTimerRef.current) {
      clearTimeout(modalTimerRef.current);
    }

    console.log(`⏱️ [LogoutTimer] Inactivity timer started. Modal will pop up in ${INACTIVITY_LIMIT / 1000}s.`);
    modalTimerRef.current = setTimeout(() => {
      console.log("🚨 [LogoutTimer] Inactivity limit reached! Opening expiration modal.");
      setModalIsOpened(true);
      setSecondsRemaining(SECONDS_TO_LOGOUT);
    }, INACTIVITY_LIMIT);
  }, [INACTIVITY_LIMIT, userAuth, SECONDS_TO_LOGOUT]);

  // Handle user activity events (mouse movement, clicks, keypresses, scrolling) & cleanup
  useEffect(() => {


    const handleUserActivity = () => {
      if (!modalIsOpened && userAuth) {
        // Uncomment the line below if you want to see every mousemove/scroll reset log (warning: can be noisy)
        // console.log("🔄 [LogoutTimer] User activity detected. Resetting inactivity timer.");
        setTimerForSession();
      }
    };

    const cleanupListeners = () => {
      const events = ["mousemove", "mousedown", "keypress", "scroll", "touchstart"];
      events.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
      console.log("🧹 [LogoutTimer] Activity event listeners REMOVED from window.");
    };

    const clearAllTimers = () => {
      if (modalTimerRef.current) clearTimeout(modalTimerRef.current);
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    };

    // If user logs out, instantly clean up everything and exit early
    if (!userAuth) {
      console.log("👤 [LogoutTimer] User is NOT logged in. Skipping event listener registration and clearing states.");
      setModalIsOpened(false);
      clearAllTimers();
      cleanupListeners();
      return;
    }


    const events = ["mousemove", "mousedown", "keypress", "scroll", "touchstart"];

    events.forEach((event) => {
      window.addEventListener(event, handleUserActivity);
    });
    console.log("🔌 [LogoutTimer] Activity event listeners ADDED to window.");

    setTimerForSession();

    // Cleanup when component unmounts or userAuth changes
    return () => {
      console.log("🛑 [LogoutTimer] Running effect cleanup function...");
      clearAllTimers();
      cleanupListeners();
    };
  }, [modalIsOpened, setTimerForSession, userAuth]);

  // Handle the countdown timer when the modal is open
  useEffect(() => {
    if (modalIsOpened && userAuth) {
      console.log("⏳ [LogoutTimer] Modal countdown interval STARTED.");
      countdownTimerRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
            handleAutoLogout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
      }
    }

    return () => {
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
      }
    };
  }, [modalIsOpened, handleAutoLogout, userAuth]);

  // Handler when user clicks "Yes, keep me logged in"
  const handleStayLoggedIn = () => {
    console.log("✅ [LogoutTimer] User clicked 'Yes, keep me logged in'. Session extended.");
    setModalIsOpened(false);
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
    }
    setTimerForSession();
  };

  // Format seconds remaining into MM:SS
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <>
      <ModalCancelEdit
        show={modalIsOpened && !!userAuth}
        handleClose={handleStayLoggedIn}
        illustration_type="coffee"
        title=""
        description=""
        bodyContent={
          <>
            <Title headingType="h5" headingStyle="Display-xs-Medium" color="--color-text-fg" className="text-center">
              Your session is expiring
            </Title>
            <Title headingType="p" headingStyle="Text-lg-Regular" color="--color-text-fg-subtle" className="text-center">
              For your security, you'll be logged out in {formatTime(secondsRemaining)} due to inactivity. Would you like to stay?
            </Title>
          </>
        }
        footerContent={
          <>
            <ButtonDefault
              label="Yes, keep me logged in"
              variant="primary"
              onClick={handleStayLoggedIn}
            />
            <ButtonDefault
              label="Log out now"
              variant="light"
              onClick={handleManualLogout}
            />
          </>
        }
      />
    </>
  );
}