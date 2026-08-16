import type { Metadata } from "next";
import {
  // Geist, Geist_Mono,
  Inter,
} from "next/font/google";
// import "./globals.css";

// Import Bootstrap Style
import "bootstrap/dist/css/bootstrap.min.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Import Main Style
import "@/assets/css/Style.scss";

import ScrollListener from "@/client-events/ScrollListener";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
// import { StoreProvider } from "@/providers/StoreProvider";
import AuthInitializer from "@/providers/AuthInit";
import ModalAuth from "@/components/modals/ModalAuth";
import { getLoggedUser } from "@/utils/supabaseServer";
import StoreProvider from "@/providers/StoreProvider";
import { getApiData } from "@/utils/api";
import ServerIsDown from "./ServerStatusScreens/ServerIsDown";
import ZToasterGlobal from "@/components/toaster/ZToasterGlobal";
import LogoutTimer from "@/components/LogoutTimer/LogoutTimer";

/*const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});*/

// Configure the Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter", // Defines the custom CSS variable
});

export const metadata: Metadata = {
  title: "Walks In Town",
  description: "Walks In Town",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/android-chrome-512x512.png',
    apple: '/apple-touch-icon.png',
  },
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {

  // 1. Await the parameters to get the real, active URL token ('it', 'en', etc.)

  console.log("Layout init...");
  const { locale } = await params;
  console.log("Layout init: locale", locale);
  const messages = await getMessages();
  // console.log("Layout init: messages", messages);
  const authUser = await getLoggedUser();

  // console.log("Layout init: authUser", authUser);
  console.log("Layout, Before serverStatus....");
  const serverStatus = await getApiData<{
    ok: boolean;
    message: string;
  }>(
    "/booking-public/health", "POST", {},
    "not-authorize", "application/json"
  );
  console.log("after serverStatus:", serverStatus);
  console.log("server status is working.... ");

  // Build the exact initial state structure
  const preloadedState = {
    auth: {
      user: authUser,
      loading: false, // We already have the answer, so loading is done!
      error: null,
      browser_user_id: null, // Will be set by AuthInitializer
      modalAuth: { show: false, contentType: "" as const }
    },

    // You can initialize booking state here too if needed
    // booking: { /* ... */ }
  };

  return (
    <html lang={locale} className={`${inter.variable} `}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {
            !serverStatus.ok && <>
              <StoreProvider preloadedState={preloadedState}>
                <ServerIsDown />
              </StoreProvider>
            </>
          }
          {
            serverStatus.ok && <>
              <StoreProvider preloadedState={preloadedState}>
                <AuthInitializer initialUser={authUser}>
                  {children}
                </AuthInitializer>
                <ModalAuth />
                <ZToasterGlobal />
                <LogoutTimer />
              </StoreProvider>
            </>
          }
        </NextIntlClientProvider>
        <ScrollListener />
      </body>
    </html>
  );
}




