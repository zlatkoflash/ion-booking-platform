import { cookies } from 'next/headers';
import { IBokunCart } from './interface-bokun';
import { getApiData } from './api';
import { BOOKING_CART_SESSION_COOKIE } from './cart';



export async function getCartSessionId(): Promise<string> {
  const cookieStore = await cookies();
  const cookieName = BOOKING_CART_SESSION_COOKIE;

  let sessionId = cookieStore.get(cookieName)?.value;

  return sessionId || "not-defined";
}

export async function getCartSessionId_single_product_check_price(): Promise<string> {
  const cartSession = await getCartSessionId();
  return `${cartSession}_single-product-price-check`;
}


