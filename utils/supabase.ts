"use server"

// import { getAuthToken } from "@/app/User/api/add-custom-token";
import { zconfig } from "@/config/config";
// import { createClient } from '@supabase/supabase-js'
/// import { createBrowserClient, createServerClient } from '@supabase/ssr'
import { createServerSupabase } from "./supabaseServer";

export const SupabaseEdgeFetchPost = async (path: string, body: any, useToken: boolean = false): Promise<any> => {

  console.log("SupabaseEdgeFetchPost init...");
  console.log("SupabaseEdgeFetchPost path:", path);
  console.log("body:", body);
  console.log("useToken:", useToken);

  const supabase = await createServerSupabase();

  console.log("Afetr creating supabase");


  const headers: any = {
    "Content-Type": "application/json",
    // for live need "Authorization"
    // "Authorization": `Bearer sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH`,
    // for localhost need "apikey"
    // "apikey": "sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH"

    // 1. Authorization Header: Used for compatibility and typically expects Bearer [JWT].
    // For anon keys, Supabase client libraries send Bearer + key value.
    // "Authorization": `Bearer ${zconfig.supabase.anon}`,

    // 2. apikey Header: The original header for the raw API key value.
    // This is often required for local/CLI compatibility.
    // "apikey": zconfig.supabase.api_key

  };

  /*let token: any = null;
  if (useToken) {
    token = await getAuthToken();
    console.log("token for:", token);
  }*/

  /*if (token !== null && token !== "") {
    // headers.Authorization = `Bearer ${token}`;
    headers['X-Custom-Z-Auth'] = token;
  }*/



  console.log("supabase.auth.getSession before");
  let authToken = "";
  // 1. Get the session
  const { data: { session }, error } = await supabase.auth.getSession();

  console.log("supabase.auth.getSession after");
  console.log("session:", session);

  if (session) {
    authToken = session.access_token;
  } else {
    // 2. If session is null, try to "force" a refresh by getting the user
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      // Re-run getSession as it might have refreshed now
      const { data: { session: refreshedSession } } = await supabase.auth.getSession();
      authToken = refreshedSession?.access_token as string;
    }
  }

  const BarrerAuthorization = `Bearer ${authToken !== "" ? authToken : zconfig.supabase.anon}`;


  /*if (zconfig.supabase.isForLive === true) {
    headers.Authorization = `Bearer ${zconfig.supabase.anon}`
  }
  else {
    headers.apikey = zconfig.supabase.api_key;
  }*/

  // headers.Authorization = `Bearer ${zconfig.supabase.anon}`
  headers.Authorization = BarrerAuthorization;
  headers.apikey = zconfig.supabase.api_key;
  // headers.Authorization = `Bearer ${zconfig.supabase.anon}`

  console.log("api supabase headers before fetch:", headers);
  const FetchingPath = `${zconfig.supabase.api_link}${path}`;
  console.log("api supabase FetchingPath before fetch:", FetchingPath);
  const results = await fetch(FetchingPath,
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });

  console.log("api supabase results:", results);

  let json = {
  };
  try {
    json = await results.json();
  }
  catch (error) {
    console.log("error parsing json:", error);
  }

  return json;
}







