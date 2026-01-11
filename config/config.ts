export const zconfig: {
  supabase: {
    api_link: string,
    isForLive: boolean,
    anon: string,
    api_key: string
  },
  stripe: {
    pk: string,
    // sk?: string,
  }
} = {
  supabase: {
    api_link: process.env.NEXT_PUBLIC_SUPABASE_EDGE_API as string,
    isForLive: process.env.NODE_ENV === "production",
    anon: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
    api_key: process.env.NEXT_PUBLIC_SUPABASE_API_KEY as string
  },
  stripe: {
    pk: process.env.NEXT_PUBLIC_STRIPE_PK as string,
    // sk: process.env.STRIPE_SK as string
  }
};