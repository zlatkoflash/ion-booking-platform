"use client";

import ButtonDefault from "@/components/buttons/ButtonDefault"
import { getApiData } from "@/utils/api";

export default function ButtonsForStripeTesting() {
  return <>
    <BtnRetriveIntent />
    <BtnRetriveRefunds />
    <BtnDoRefund />
    <BtnDoRefundForBookingPaymentItem />
    <BtnCallToMuchStripeAPIRequests />
    <BtnRefundAmountFromMoreIntents />
  </>
}


function BtnRetriveIntent() {

  const intenetId = 'pi_3TxBpVKhVoChiPYn0I5R62OD';

  const action = async () => {
    try {
      const data = await getApiData('/administrator/stripe-retrive-payment-intent', 'POST', {
        paymentIntentId: intenetId
      }, 'authorize', 'application/json');
      console.log("data stripe retrive payment intent: ", data);
    } catch (err) {
      console.log(err)
    }
  }

  return <>
    <ButtonDefault label={`Retrieve PaymentIntent for intent ${intenetId}`} variant="primary" onClick={() => {
      action();
    }} />
  </>
}


function BtnRetriveRefunds() {

  const paymentIntentId = 'pi_3Tv42kKhVoChiPYn1vTG0kp9';

  const action = async () => {
    try {
      const data = await getApiData('/administrator/stripe-retrive-refund-items', 'POST', {
        paymentIntentId: paymentIntentId
      }, 'authorize', 'application/json');
      console.log("data stripe retrive refund items: ", data);
    } catch (err) {
      console.log(err)
    }
  }

  return <>
    <ButtonDefault label={`Retrieve Refunds for ${paymentIntentId}`} variant="primary" onClick={() => {
      action();
    }} />
  </>
}


function BtnDoRefund() {

  const paymentIntentId = 'pi_3Tv42kKhVoChiPYn1vTG0kp9';
  const amount_cents = 157;

  const action = async () => {
    try {
      const data = await getApiData('/administrator/stripe-do-refund', 'POST', {
        paymentIntentId: paymentIntentId,
        amount_cents: amount_cents
      }, 'authorize', 'application/json');
      console.log("data stripe do refund: ", data);
    } catch (err) {
      console.log(err)
    }
  }

  return <>
    <ButtonDefault label={`Do Refund for booking ${paymentIntentId} amount_cents ${amount_cents}`} variant="primary" onClick={() => {
      action();
    }} />
  </>
}


function BtnDoRefundForBookingPaymentItem() {

  const payment_intent_id = 'pi_3Tv42kKhVoChiPYn1vTG0kp9';
  const amount_cents = 10;

  const action = async () => {
    try {
      const data = await getApiData('/administrator/stripe-do-refund-for-booking-payment-item', 'POST', {
        paymentIntentId: payment_intent_id,
        amount_cents: amount_cents
      }, 'authorize', 'application/json');
      console.log("data stripe do refund for booking payment item: ", data);
    } catch (err) {
      console.log(err)
    }
  }

  return <>
    <ButtonDefault label={`Do Refund for booking payment item ${payment_intent_id} amount_cents ${amount_cents}`} variant="primary" onClick={() => {
      action();
    }} />
  </>
}


function BtnCallToMuchStripeAPIRequests() {


  const payment_intent_id = 'pi_3Tv42kKhVoChiPYn1vTG0kp9';

  const action = async () => {
    try {
      const data = await getApiData('/administrator/stripe-call-to-much-api-requests', 'POST', {
        paymentIntentId: payment_intent_id,
      }, 'authorize', 'application/json');
      console.log("data stripe do refund for booking payment item: ", data);
    } catch (err) {
      console.log(err)
    }
  }

  return <>
    <ButtonDefault label={`Call To Much Stripe API Requests ${payment_intent_id}`} variant="primary" onClick={() => {
      action();
    }} />
  </>
}

function BtnRefundAmountFromMoreIntents() {

  const amountCentsToBeRefunded = 36271 * 100;
  const intents = [
    // "pi_3TwoUFKhVoChiPYn0iGVD8Q0", // done 
    // "pi_3Tv3NxKhVoChiPYn1GXnD3Oc", // done
    // "pi_3Tx80YKhVoChiPYn1b1Q18Me", // done
    'pi_3TxBpVKhVoChiPYn0I5R62OD'
  ];

  const action = async () => {
    try {
      const data = await getApiData('/administrator/test-stripe-refund-amount-from-more-intents', 'POST', {
        intents,
        amountCentsToBeRefunded
      },
        'authorize', 'application/json');
      console.log("data stripe refund amount from more intents: ", data);
    } catch (err) {
      console.log(err)
    }
  }

  return <>
    <ButtonDefault label={`Refund amount from more intents: ${intents.join(", ")}`} variant="primary" onClick={() => {
      action();
    }} />
  </>
}