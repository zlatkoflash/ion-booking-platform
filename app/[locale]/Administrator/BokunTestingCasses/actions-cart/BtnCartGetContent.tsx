"use client";

import ButtonDefault from "@/components/buttons/ButtonDefault";
import { getApiData } from "@/utils/api";

export default function BtnCartGetContent() {
  return <>
    <BtnGetContent />
    <BtnAddActivity />
    <BtnRemoveProoduct />
  </>
}


function BtnGetContent() {

  /// cart.json/{sessionId}

  const action = async () => {
    const result = await getApiData(`/administrator/test-get-cart-content`, "POST", {
      sessionId: "Example"
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

  const action = async () => {
    const result = await getApiData(`/administrator/test-add-activity-to-cart`, "POST", {
      sessionId: "Example",
      details: {
        activityId: 914000,
        /*
        "rateId": 0,
        "startTimeId": 0,
        "date": "string",
        */
        rateId: 1762438,
        startTimeId: 3218822,
        date: "2026-07-07",

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

  const action = async () => {
    const result = await getApiData(`/administrator/test-remove-product-from-cart`, "POST", {
      sessionId: "Example",
      productBookingConfirmationCode: "WAL-T136790557"
    }, "authorize", "application/json");
    console.log("result: ", result);
  }

  return <>

    <ButtonDefault label="Remove Product From Cart" onClick={() => {
      action();
    }} />
  </>
}