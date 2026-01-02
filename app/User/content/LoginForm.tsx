'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send2HoursTokenForSignInWithEmail, SendTestEmail, TryToLoginWithTheCode } from '@/utils/bokun';
import { getAuthToken, saveCustomTokenToCookie } from '../api/add-custom-token';
import { useAuth } from '../AuthProvider';
// Assuming your Supabase client is initialized and imported here
// import { supabase } from '@/lib/supabaseClient'; 


// NOTE: Replace this placeholder with your actual Supabase client setup
const supabase = {
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
}


export const UserLoginForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loginCode, setLoginCode] = useState('');

  const [enteringCodeState, set_enteringCodeState] = useState(false);

  /*const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!email || !password) {
      setError('Please fill in both the email and password fields.');
      setIsLoading(false);
      return;
    }

    try {
      // 1. Call the Supabase sign-in method
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (authError) {
        // Handle Supabase-specific errors (e.g., rate limits, invalid user)
        setError(authError.message);
      } else {
        // 2. Success: Redirect the user to the dashboard or profile page
        router.push('/dashboard');
      }

    } catch (err) {
      // Handle unexpected network errors
      console.error(err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };*/

  const {
    dispatch,
    user,
    isAuthenticated,
    // error,
    isInitialized,
  } = useAuth();



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
    if (result.data === undefined || result.data === null || result.data.token === undefined || result.data.token === "") {
      setError("Invalid code, Please Try Again");
    } else {
      // here we set the token in the server cookies
      console.log("result.data.token:", result.data.token);
      await saveCustomTokenToCookie(result.data.token);

      // router.refresh();

      window.location.reload();

      /*dispatch({
        type: "LOGIN",
        payload: {
          user: {
            id: result.data.user.id,
            email: result.data.user.email,
            name: result.data.user.name,
            role: result.data.user.role
          }
        }
      });

      const token = await getAuthToken();
      console.log("token cookie:", token);
      router.refresh();*/
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