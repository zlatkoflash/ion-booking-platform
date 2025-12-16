import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./User/AuthProvider";
import { getAuthToken, getUserDetailsFromServer } from "./User/api/add-custom-token";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "World Insight Tours",
  description: "World Insight Tours",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  let logedUser = null;
  const token = await getAuthToken();
  // console.log("token:", token);


  const detailsForUser = await getUserDetailsFromServer();
  console.log("detailsForUser:", detailsForUser);

  if (detailsForUser !== null) {
    logedUser = detailsForUser.user;
  }
  // return null;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider token={token} userFromOut={logedUser}>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
