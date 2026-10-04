"use client";

import ButtonDefault from "@/components/buttons/ButtonDefault";
import { useAppSelector } from "@/redux/hooks";
import { getApiData } from "@/utils/api";
// import { getCartSessionId } from "@/utils/cart-server";

export default function BtnShoppingCartGetContent() {
  return <>
    <BTNGetSessionShoppingCart />
    <BtnAddActivityToCart />
  </>
}



function BTNGetSessionShoppingCart() {

  const cart = useAppSelector((state) => state.booking.cart);

  const action = async () => {
    const details = await getApiData("/administrator/test-bokun-shopping-cart", "POST", {
      sessionId: cart.cart_session_id,
      type: "get-shopping-cart"
    }, "authorize");

    console.log("details:", details);
  }

  return <>
    <ButtonDefault label="Get Session" onClick={() => {
      action();
    }} />
  </>
}



function BtnAddActivityToCart() {

  const cart = useAppSelector((state) => state.booking.cart);

  const action = async () => {
    const details = await getApiData("/administrator/test-bokun-shopping-cart", "POST", {
      sessionId: cart.cart_session_id,
      type: "add-activity",
      detailsActivityForAadding: {
        activityId: 914000,
        rateId: 1762438,
        startTimeId: 3218822,
        date: "2026-11-20",
        pricingCategoryBookings: [
          {
            pricingCategoryId: 753166,
            quantity: 1
          },
          {
            pricingCategoryId: 753166,
            quantity: 1
          }
        ]
      }
    }, "authorize");

    console.log("details:", details);
  }

  return <>
    <ButtonDefault label="Add Activity To Cart" onClick={() => {
      action();
    }} />
  </>
}