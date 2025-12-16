'use server'

import { SupabaseEdgeFetchPost } from '@/utils/supabase';
import { cookies } from 'next/headers';

const CUSTOM_AUTH_COOKIE_NAME = 'auth_token';

// ⚠️ Function MUST run on the server
export async function saveCustomTokenToCookie(myCustomToken: string) {

  console.log("myCustomToken:", myCustomToken);

  const cookieStore = await cookies();


  console.log("cookieStore:", cookieStore);

  // Set the token securely
  cookieStore.set(CUSTOM_AUTH_COOKIE_NAME, myCustomToken, {
    httpOnly: true,                 // Security: Prevents client-side JS access (XSS)
    secure: process.env.NODE_ENV === 'production', // Security: Requires HTTPS in production
    // the token is 2 hours valid but i will add here 30 minutes less
    maxAge: 1.5 * 60 * 60,       // Expires in 1.5 hours (adjust as needed)
    path: '/',                      // Available throughout the app
    sameSite: 'lax',                // CSRF mitigation
  });

  // You would typically redirect the user after a successful login here:
  // redirect('/dashboard'); 
}

/**
 * Retrieves the custom JWT from the secure HTTP-Only cookie.
 * This function must ONLY run on the server (Server Component, Server Action, or Route Handler).
 * * @returns The JWT string if present, otherwise returns null.
 */
export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();

  // 1. Get the cookie object from the store
  const tokenCookie = cookieStore.get(CUSTOM_AUTH_COOKIE_NAME);

  // 2. Return the value if the cookie exists, otherwise return null
  return tokenCookie ? tokenCookie.value : null;
}
export async function getUserDetailsFromServer(): Promise<{
  token: string,
  user: {
    email: string,
    name: string,
    role: string,
    id: string,
  }
} | null> {


  const token = await getAuthToken();
  if (token === null) {
    return null;
  }
  // const user = await getUserDetailsFromServer();
  // return { token, user };

  const details = await SupabaseEdgeFetchPost('/bokun/GetUserDetailsByToken', {
    token: token,
  });
  const detailsText = await details.text();
  const detailsJSON = JSON.parse(detailsText);
  console.log("details user loading:", detailsJSON);

  if (detailsJSON.data === null || detailsJSON.data === undefined || detailsJSON.data.user === undefined || detailsJSON.data.user === null) {
    return null;
  }

  return {
    token: token,
    user: detailsJSON.data.user
  }
}


/**
 * Deletes the custom JWT from the secure HTTP-Only cookie and redirects the user.
 * This function must ONLY run on the server / route handler
 */
export async function handleLogout() {
  const cookieStore = await cookies();

  // 1. Delete the cookie.
  // This sends a 'Set-Cookie: auth_token=; Max-Age=0;' header to the browser.
  cookieStore.set(CUSTOM_AUTH_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0, // Setting maxAge to 0 causes the browser to delete the cookie immediately
    path: '/',
    sameSite: 'lax',
  });

  // 2. Redirect the user to a public page.
  // redirect('/login');
}