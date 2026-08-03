"use server"

import { createServerSupabase } from "./supabaseServer";
import { zconfig } from "@/config/config";

/**
 * Simplified API Fetcher
 * Targets a single base URL with built-in Supabase Auth and Next.js Caching
 */
export const getApiData = async <T = any>(
  slug: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data: any = {},
  authorize: "not-authorize" | "authorize" = "not-authorize",
  contentType: "application/json" | "multipart/form-data" = "application/json",
  searchParams: any = {}
): Promise<T> => {

  // 1. Setup Base URL
  // Priority: zconfig.supabase.url -> Environment Variable -> Fallback
  // const baseUrl = (zconfig.supabase.url || process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/\/+$/, "");
  // const apiUrl = `${baseUrl}/functions/v1`;
  const normalizedSlug = slug.startsWith("/") ? slug : `/${slug}`;
  const targetRouteUrl = `${zconfig.supabase.api_link}${normalizedSlug}`;

  // 2. Custom Storage Cache Check (Bypass API if file exists)
  const isClearCache = searchParams['clear-cache'] === "true";
  if (data.cacheFileName && !isClearCache) {
    const cacheURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/cache/${data.cacheFileName}`;
    const cacheRes = await fetch(cacheURL + '?rc=v4424');
    if (cacheRes.ok) {
      console.log('Cache Hit:', data.cacheFileName);
      return await cacheRes.json();
    }
  }

  const supabase = await createServerSupabase();
  const options: RequestInit = {
    method,
    headers: {
      "X-Client-Info": "supabase-js-my-app",
    },
  };

  try {
    // 3. Handle Authentication
    const anonKey = (zconfig.supabase.anon || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").trim();
    let authHeaderValue = anonKey;

    if (authorize === "authorize") {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        authHeaderValue = session.access_token;
      }
    }

    // @ts-ignore - Dynamic headers assignment
    options.headers["apikey"] = anonKey;
    // @ts-ignore
    options.headers["Authorization"] = `Bearer ${authHeaderValue}`;

    // 4. Handle Body
    if (method !== "GET" && method !== "DELETE") {
      if (contentType === "application/json") {
        options.headers = { ...options.headers, "Content-Type": "application/json" };
        options.body = JSON.stringify(data);
      } else {
        options.body = data; // FormData
      }
    }

    // 5. Next.js Cache Tagging logic
    const cacheTags: Record<string, string> = {
      'get-main-categories-and-subcategories': 'main-categories-and-subcategories',
      'get-categories-for-browser-covers-menu': 'get-categories-for-browser-covers-menu',
      'templates': 'templates'
    };

    for (const [key, tag] of Object.entries(cacheTags)) {
      if (slug.includes(key)) {
        options.next = { revalidate: false, tags: [tag] };
        break;
      }
    }

    // 6. Execution
    console.log("targetRouteUrl:", targetRouteUrl);
    const response = await fetch(targetRouteUrl, options);

    // Handle empty or non-json responses gracefully
    const text = await response.text();
    let json;
    try {
      json = text ? JSON.parse(text) : {};
    } catch (e) {
      // throw new Error(`Invalid JSON response: ${text.substring(0, 100)}`);
      return {
        ok: false,
        status: 400,
        message: `Invalid JSON response: ${text.substring(0, 100)}`,
        errorDetails: text
      } as T
    }

    // 7. Standard Error Mapping
    if (!response.ok || json.status === 404 || json.status === 500) {
      return {
        ok: false,
        status: json.status || response.status,
        message: json.message || "API Error",
        errorDetails: json
      } as T;
    }

    return json;

  } catch (error: any) {
    console.error("Fetch error:", error);
    return {
      ok: false,
      status: 501,
      message: error.message || "Internal network error",
    } as T;
  }
};