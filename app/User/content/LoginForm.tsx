'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send2HoursTokenForSignInWithEmail, SendTestEmail, TryToLoginWithTheCode } from '@/utils/bokun';
import { getAuthToken, saveCustomTokenToCookie } from '../api/add-custom-token';
import { useAuth } from '../AuthProvider';
import { createClient } from '@/utils/supabaseClient';
import { ISupabaseUser } from '@/utils/interface/auth';
// Assuming your Supabase client is initialized and imported here
// import { supabase } from '@/lib/supabaseClient'; 


// NOTE: Replace this placeholder with your actual Supabase client setup
/*const supabase = {
  auth: {
    signInWithPassword: async (credentials: { email: string, password: string }) => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate success for a test user
      if (credentials.email === 'admin@billing.com') {
        // Return data structure mimicking Supabase success
        return { data: { session: {}, user: {} }, error: null };
      }
      // Simulate failure
      return { data: { session: null, user: null }, error: { message: 'Invalid credentials or user is inactive.' } };
    }
  }
}*/


export const UserLoginForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loginCode, setLoginCode] = useState('');

  const [enteringCodeState, set_enteringCodeState] = useState(false);

  const clientSupabase = createClient();

  /*const {
    dispatch,
    user,
    isAuthenticated,
    // error,
    isInitialized,
  } = useAuth();*/



  const ___SendTestEmail = async () => {
    const result = await SendTestEmail();
    console.log("SendTestEmail result: ", result);
  }

  const ___Send2HoursTokenForSignInWithEmail = async () => {
    const result = await Send2HoursTokenForSignInWithEmail(email);
    console.log("Send2HoursTokenForSignInWithEmail result: ", result);
    set_enteringCodeState(true);
    setError("");
  }
  const __TryToLoginWithTheCode = async () => {
    setIsLoading(true)
    const result = await TryToLoginWithTheCode(email, loginCode);
    console.log("TryToLoginWithTheCode result: ", result);
    setIsLoading(false)
    // if (result.data === undefined || result.data === null || result.data.token === undefined || result.data.token === "") {
    if (result.data === null || result.data.session === undefined || result.data.session === null) {
      setError("Invalid code, Please Try Again");
    } else {
      // here we set the token in the server cookies
      /*console.log("result.data.token:", result.data.token);
      await saveCustomTokenToCookie(result.data.token);
      // router.refresh();
      window.location.reload();*/

      console.log("result.data.session:", result.data.session);
      const userAuth = result.data.session.user as ISupabaseUser;
      const { data, error } = await clientSupabase.auth.setSession({
        access_token: result.data.session.access_token,
        refresh_token: result.data.session.refresh_token,
      })
      console.log("After trying to login:");
      console.log("data:", data);
      console.log("error:", error);
      /*if (userAuth.user_metadata.role === 'administrator') {
        router.push('/User/AdministratorBookings');
      }
      else if (userAuth.user_metadata.role === "client") {
        router.push('/User/ManageMyBooking');
      }
      router.refresh();*/
      if (userAuth.user_metadata.role === 'administrator') {
        // Hard redirect to Admin area
        window.location.href = '/User/AdministratorBookings';
      }
      else if (userAuth.user_metadata.role === 'client') {
        // Hard redirect to Client area
        window.location.href = '/User/ManageMyBooking';
      }
      else {
        // Fallback if role is missing (optional but recommended)
        // window.location.href = '/User/Login';
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          Sign In to WIT-3.0.
        </h2>

        <form
          // onSubmit={handleSubmit} 
          className="space-y-6">
          {/* Error Display */}
          {error && (
            <div className="p-3 bg-red-100 text-red-700 border border-red-300 rounded-lg text-sm transition-opacity duration-300">
              {error}
            </div>
          )}

          {
            !enteringCodeState && <>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-sm"
                />
              </div>

              {/* Password Input */}
              {/*<div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-sm"
            />
          </div>*/}

              {/* Submit Button */}
              {/*<button
            type="button"
            disabled={isLoading}
            onClick={() => {
              ___SendTestEmail()
            }}
            className="w-full py-2.5 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400 transition duration-150 transform hover:scale-[1.01] cursor-pointer"
          >
            Send Test Email
          </button>*/}
              <button
                type="button"
                disabled={isLoading}
                onClick={() => {
                  ___Send2HoursTokenForSignInWithEmail()
                }}
                className="w-full py-2.5 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400 transition duration-150 transform hover:scale-[1.01] cursor-pointer"
              >
                {isLoading ? 'Sending Code...' : 'Send Code'}
              </button>
              {/* Optional: Password Reset Link */}
              {/*<div className="text-center">
            <a href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition duration-150">
              Forgot your password?
            </a>
          </div>*/}
            </>
          }




          {
            enteringCodeState && <>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Sign In Code
                </label>
                <input
                  type="text"
                  id="loginCode"
                  placeholder="Enter the code sent to your email"
                  value={loginCode}
                  onChange={(e) => setLoginCode(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-sm"
                />
                <div className="flex items-center justify-center p-4">
                  <p className="text-center font-semibold text-lg   dark:text-green-400">
                    Code Sent! Check Your Email and Enter the code to login.
                  </p>
                </div>
              </div>


              <button
                type="button"
                disabled={isLoading}
                onClick={() => {
                  __TryToLoginWithTheCode()
                }}
                className="w-full py-2.5 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400 transition duration-150 transform hover:scale-[1.01] cursor-pointer"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>

            </>
          }



        </form>
      </div>
    </div>
  );
};