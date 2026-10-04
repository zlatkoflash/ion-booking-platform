"use client";

import ButtonDefault from "@/components/buttons/ButtonDefault";
import { useAppSelector } from "@/redux/hooks";
import { getApiData } from "@/utils/api";
// import { getCartSessionId } from "@/utils/cart-server";

export default function BtnCartGetContent() {
  return <>
    <BtnGetContent />
    <BtnAddActivity />
    <BtnRemoveProoduct />
  </>
}


function BtnGetContent() {

  /// cart.json/{sessionId}

  const cart = useAppSelector((state) => state.booking.cart)

  const action = async () => {
    const result = await getApiData(`/administrator/test-get-cart-content`, "POST", {
      sessionId: cart.cart_session_id
    }, "authorize", "application/json");
    console.log("result: ", result);
  }

  return <>
    <ButtonDefault label="Get Cart Content" onClick={() => {
      action();
    }} />
  </>
}
function BtnAddActivity() {

  // /cart.json/{sessionId}/activity
  const cart = useAppSelector((state) => state.booking.cart)

  const action = async () => {
    const result = await getApiData(`/administrator/test-add-activity-to-cart`, "POST", {
      sessionId: cart.cart_session_id,
      details: {
        activityId: 914000,
        /*
        "rateId": 0,
        "startTimeId": 0,
        "date": "string",
        */
        rateId: 1762438,
        startTimeId: 3218822,
        date: "2026-11-10",

        "passengers": [
          {
            "pricingCategoryId": 753166,
            quantity: 5,
            // "groupSize": 20,
          },
          {
            "pricingCategoryId": 753166,
            // "groupSize": 20,
          },
          {
            "pricingCategoryId": 753166,
            // "groupSize": 20,
          },
          {
            "pricingCategoryId": 753166,
            // "groupSize": 20,
          },
          {
            "pricingCategoryId": 753166,
            // "groupSize": 20,
          }
        ]
      }
    }, "authorize", "application/json");
    console.log("result: ", result);
  }

  return <>
    <ButtonDefault label="Add Activity To Cart" onClick={() => {
      action();
    }} />
  </>
}


function BtnRemoveProoduct() {

  // /cart.json/{sessionId}/remove/{productBookingConfirmationCode}

  const cart = useAppSelector((state) => state.booking.cart)

  const action = async () => {
    const result = await getApiData(`/administrator/test-remove-product-from-cart`, "POST", {
      sessionId: cart.cart_session_id,
      productBookingConfirmationCode: "WAL-T146677761"
    }, "authorize", "application/json");
    console.log("result: ", result);
  }

  return <>

    <ButtonDefault label="Remove Product From Cart" onClick={() => {
      action();
    }} />
  </>
}