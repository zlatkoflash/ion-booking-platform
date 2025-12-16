import { getAuthToken } from "@/app/User/api/add-custom-token";
import { zconfig } from "@/config/config";

export const SupabaseEdgeFetchPost = async (path: string, body: any, useToken: boolean = false) => {

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

  let token: any = null;
  if (useToken) {
    token = await getAuthToken();
    console.log("token for:", token);
  }

  if (token !== null && token !== "") {
    // headers.Authorization = `Bearer ${token}`;
    headers['X-Custom-Z-Auth'] = token;
  }

  /*if (zconfig.supabase.isForLive === true) {
    headers.Authorization = `Bearer ${zconfig.supabase.anon}`
  }
  else {
    headers.apikey = zconfig.supabase.api_key;
  }*/

  headers.Authorization = `Bearer ${zconfig.supabase.anon}`
  headers.apikey = zconfig.supabase.api_key;
  // headers.Authorization = `Bearer ${zconfig.supabase.anon}`

  const results = await fetch(`${zconfig.supabase.api_link}${path}`,
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });

  return results;
}




