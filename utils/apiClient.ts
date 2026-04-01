import { zconfig } from "@/config/config";

export const fetchPublicData = async (
  slug: string,
  data: Record<string, any> = {},
  callback: (data: any) => void,
  method: 'GET' | 'POST' = 'GET', // Default to GET
  cacheFileName?: string
) => {
  // const baseUrl = process.env.NEXT_PUBLIC_CONTENT_API_URL || process.env.NEXT_PUBLIC_API_URL;
  const cleanSlug = slug.replace(/^\/+/, "");
  const cacheBaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1/object/public/cache";

  // Check if browser URL has ?clear-cache=true
  const isClearCache = typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get('clear-cache') === 'true';

  // console.log("baseUrl:", baseUrl);
  const cacheURL = `${cacheBaseUrl}/${cacheFileName}`;
  console.log('Checking cache:', cacheURL);
  // 1. Try Cache First (if provided)
  if (cacheFileName && !isClearCache) {
    try {
      // Direct CDN URL for 50ms speed
      // https://ertwwpehoboogemlqcry.supabase.co/storage/v1/object/public/cache/get-main-categories-and-subcategories.json

      const cacheRes = await fetch(cacheURL + '?rc=v2');
      if (cacheRes.ok) {
        const cacheData = await cacheRes.json();
        console.log('Cache Hit:', cacheFileName);
        callback(cacheData);
        return; // Exit early! No need to hit the slow Edge Function
      }
      console.warn('Cache missed or 404, falling back to API...');
    } catch (e) {
      console.error('Cache read error, falling back...', e);
    }
  }


  let url = `${zconfig.supabase.api_link}/${cleanSlug}`;
  let options: RequestInit = {
    method,
    headers: {
      'apikey': zconfig.supabase.anon || "",
      'Authorization': `Bearer ${zconfig.supabase.anon}`,
      'Content-Type': 'application/json',
    },
  };



  if (method === 'GET') {
    // For GET, append data as query parameters
    const queryParams = new URLSearchParams(data).toString();
    if (queryParams) url += `?${queryParams}`;
  } else {
    // For POST, send data in the body
    options.body = JSON.stringify({
      ...data,
      cacheFileName
    });
  }

  console.log(`${method} Fetch:`, url);

  fetch(url, options)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then(json => {
      callback(json || null);
    })
    .catch(err => {
      console.error(`${method} fetch error:`, err);
      callback(null);
    });
};