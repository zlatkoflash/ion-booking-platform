"use client";

import ButtonDefault from "@/components/buttons/ButtonDefault";
import IconText from "@/components/buttons/IconText";
import Title from "@/components/typography/Title";
import { IBookedOrderPrice, setPayWith, TPayWithMethod } from "@/redux/booking/bookingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "@/translations-engine/routing";
import { getApiData } from "@/utils/api";
import { AttachDefaultPaymentForBooking, ConfirmReservedBooking } from "@/utils/booking-client";
import { attachPaymentMethodToCustomer, checkCardDetails, getCustomerIntent, setupCustomerPaymentMethod_card, setupCustomerPaymentMethod_paypal } from "@/utils/checkout-client";
import { EBookingStatus, IDBBookingDetails } from "@/utils/interface-database";
import { getStripeCustomerId_ByBooking } from "@/utils/stripe";
import { CardCvcElement, CardExpiryElement, CardNumberElement, ExpressCheckoutElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { SetupIntent, StripeCardNumberElement } from "@stripe/stripe-js";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";

export default function BookingCheckoutFooter(
  { price_booking, parentBooking }
    :
    { price_booking: IBookedOrderPrice, parentBooking: IDBBookingDetails }
) {

  // const price = useAppSelector((state) => state.booking.price_active_product);
  // const booking = useAppSelector((state) => state.booking.booked_product);
  const whenToPay = useAppSelector((state) => state.booking.whenToPay);
  const payWith = useAppSelector((state) => state.booking.payWith);
  const cardHolderName = useAppSelector((state) => state.booking.cardHolderName);
  const authUser = useAppSelector((state) => state.auth.user);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const tForms = useTranslations("Forms");
  const tValidations = useTranslations("Validation");
  const locale = useLocale();

  const searchParams = useSearchParams();

  const get_payWith: TPayWithMethod | null = searchParams.get('payWith') as TPayWithMethod | null;
  const get_redirectStatus = searchParams.get('redirect_status') as null | "succeeded" | "failed";
  const get_setupIntentId = searchParams.get('setup_intent');
  const setup_intent_client_secret = searchParams.get('setup_intent_client_secret');

  /**
   * Effect for executing the payment when is paypal or apple pay
   */
  const hasExecutedRef = useRef(false);
  useEffect(() => {

    if (stripe === null) return;

    if (hasExecutedRef.current === true) return;
    hasExecutedRef.current = true;

    if (get_redirectStatus === "succeeded" && get_setupIntentId != null && setup_intent_client_secret !== null && get_payWith !== null) {
      dispatch(setPayWith(get_payWith));
      setSuccessMessage("Payment method is validated, confirming the booking...")

      continueWithPaypalExecution();

    }
    if (get_redirectStatus === "failed") {
      // show error message
      if (get_payWith === "paypal") {
        setErrorMessage("Paypal payment method not approved, please try again!")
      } else if (get_payWith === "apple-pay") {
        setErrorMessage("Apple Pay payment method not approved, please try again!")
      } else {
        setErrorMessage("Payment method not approved, please try again!")
      }
    }
  }, [stripe]);

  // cards functions
  /*const checkCardDetails = async (): Promise<{
    ok: boolean;
    cardElement: StripeCardNumberElement | null;
  }> => {
    if (elements === null) {
      return { ok: false, cardElement: null };
    }
    const cardElement = elements.getElement(CardNumberElement);
    // const cvcElement = elements.getElement(CardCvcElement);
    // const expiryElement = elements.getElement(CardExpiryElement);
    if (!cardElement) {
      setLoading(false);
      setErrorMessage(tValidations("cardInfoNotAvailable"))
      return { ok: false, cardElement: null };
    }
    return { ok: true, cardElement };
  }*/
  /*const setupCustomerPaymentMethod_card = async (
    customerIntent: { clientSecret: string },
    cardElementDetails: { cardElement: StripeCardNumberElement | null },
    billing_details: any
  ): Promise<{
    ok: boolean,
    setupIntent: SetupIntent | null
  }> => {

    if (stripe === null) {
      return {
        ok: false,
        setupIntent: null
      }
    }

    const { setupIntent, error: setupError } = await stripe.confirmCardSetup(customerIntent.clientSecret, {
      payment_method: {

        card: cardElementDetails.cardElement as StripeCardNumberElement,
        billing_details: billing_details
      },
    });
    console.log("setupIntent:", setupIntent);
    if (setupError !== null && setupError !== undefined) {
      setLoading(false);
      setErrorMessage(setupError.message || tValidations("paymentGatewayNotAvailable"))
      return {
        ok: false,
        setupIntent: null
      };
    }

    return {
      ok: true,
      setupIntent
    };
  }*/

  /*const setupCustomerPaymentMethod_paypal = async (
    customerIntent: {
      clientSecret: string
    },
    billing_details: any
  ): Promise<{
    ok: boolean,
    setupIntent: SetupIntent | null
  }> => {
    if (stripe === null) {
      return { ok: false, setupIntent: null };
    }
    if (elements === null) return { ok: false, setupIntent: null };
    const { error } = await stripe.confirmPayPalSetup(customerIntent.clientSecret, {
      payment_method: {
        billing_details: billing_details
      },
      return_url: `${window.location.origin}/booking/${parentBooking?.id}/checkout?payWith=${payWith}`,
    });


    if (error) {
      setErrorMessage(error.message ?? "An unexpected error occurred.");
      setLoading(false);
      return { ok: false, setupIntent: null };
    }
    return { ok: true, setupIntent: null };
  }*/

  /*const getCustomerIntent = async (stripe_customer_id: string): Promise<{ ok: boolean, message: string, clientSecret: string }> => {
    const customerIntentDetails = await getApiData<{
      ok: boolean,
      message: string,
      clientSecret: string
    }>(`/booking-public/setup-intent-for-payment-method`, "POST", {
      customer_id: stripe_customer_id,
      payment_method_type: (() => {
        if (payWith === "debit-credit-card") {
          return "card";
        } else if (payWith === "paypal") {
          return "paypal";
        } else if (payWith === "apple-pay") {
          return "apple_pay";
        }
      })(),
    }, "not-authorize", "application/json");

    if (typeof customerIntentDetails.clientSecret !== "string" || customerIntentDetails.clientSecret === "") {
      setLoading(false);
      setErrorMessage(tValidations("paymentGatewayNotAvailable"))
      customerIntentDetails.ok = false;
      // return false;
    }

    if (customerIntentDetails.ok !== true) {
      setLoading(false);
      setErrorMessage(customerIntentDetails.message)
      // return false;
    }

    return customerIntentDetails;
  }*/

  /*const attachPaymentMethodToCustomer = async (
    stripeCustomerId_details: {
      stripe_customer_id: string;
    },
    paymentMethodIntentDetails: {
      ok: boolean,
      setupIntent: SetupIntent | null
    }
  ): Promise<{
    ok: boolean,
    message: string
  }> => {



    const details = await getApiData<{
      ok: boolean,
      message: string
    }>(
      // `/booking-public/set-payment-method-for-booking`, 
      `/booking-public/attach-payment-method-to-customer`,
      "POST", {
      booking_id: parentBooking?.id,
      customer_id: stripeCustomerId_details?.stripe_customer_id,
      payment_method_id: paymentMethodIntentDetails.setupIntent?.payment_method,
      // payment_method_details: paymentMethodIntentDetails.setupIntent
    },
      authUser === null ? "not-authorize" : "authorize"
      , "application/json");

    console.log("Details after updating the payment method:", details);
    // stripeCustomerId_details.
    console.log("stripeCustomerId_details:", stripeCustomerId_details);

    if (details.ok !== true) {
      setLoading(false);
      setErrorMessage(details.message || tValidations("paymentGatewayNotAvailable"))
      return {
        ok: false,
        message: details.message
      };
    }
    return {
      ok: true,
      message: details.message
    };
  }*/

  const bookTheExperience = async () => {

    const resultAfterConfirmation = await ConfirmReservedBooking(
      parentBooking?.id as string,
      whenToPay,
      locale,
      authUser
    );

    console.log("resultAfterReservation:", resultAfterConfirmation);
    if (resultAfterConfirmation.ok === false) {
      setLoading(false);
      setErrorMessage(resultAfterConfirmation.message || tValidations("paymentGatewayNotAvailable"))
      return;
    }
    if (resultAfterConfirmation.ok === true && resultAfterConfirmation.bookingHash !== null && typeof resultAfterConfirmation.bookingHash === "string" && resultAfterConfirmation.bookingHash !== "") {
      router.push(`/booking/${parentBooking?.id}/confirm`);
      // setLoading(false);// debugging
    }
    else {

      // now do reservation for the booking 
      setErrorMessage(tValidations('booking_not_created'));
      setLoading(false);
    }
  }

  const continueWithPaypalExecution = async () => {
    setLoading(true);



    console.log("stripe:", stripe);

    if (stripe === null || setup_intent_client_secret === null) {
      setLoading(false);
      setErrorMessage(tValidations("paymentGatewayNotAvailable"))
      return;
    }

    const { setupIntent, error } = await stripe.retrieveSetupIntent(
      setup_intent_client_secret
    );

    if (error) {
      console.error("Error retrieving setup intent:", error.message);
      setLoading(false);
      setErrorMessage(error.message || tValidations("paymentGatewayNotAvailable"))
      return;
    }

    const stripeCustomerId_details = await getStripeCustomerId_ByBooking(parentBooking?.id as string);

    const details_setPaymentMethod = await attachPaymentMethodToCustomer(
      stripeCustomerId_details as {
        stripe_customer_id: string;
      },
      /*{
        ok: true,
        setupIntent: setupIntent
      },*/
      setupIntent.payment_method as string,
      authUser
    );
    if (details_setPaymentMethod.ok !== true) {
      setErrorMessage(details_setPaymentMethod.message)
      setLoading(false);
      return;
    }

    const resultAttachPMToBooking = await AttachDefaultPaymentForBooking(
      parentBooking?.id as string,
      setupIntent?.payment_method as string,
      authUser
    );
    if (resultAttachPMToBooking.ok !== true) {
      setErrorMessage(resultAttachPMToBooking.message)
      setLoading(false);
      return;
    }

    await bookTheExperience();

    console.log("setupIntent:", setupIntent);

  }

  const processPayment = async () => {

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");


    if (stripe === null || elements === null) {
      setLoading(false);
      setErrorMessage(tValidations("paymentGatewayNotAvailable"))
      return;
    }



    const billing_details = {
      name: cardHolderName,
      email: parentBooking?.customer_details.email_address,
      address: {
        line1: parentBooking?.customer_details.address,
        city: parentBooking?.customer_details.city,
      }
    };

    // getting stripe customer id
    const stripeCustomerId_details = await getStripeCustomerId_ByBooking(parentBooking?.id as string);

    console.log("stripeCustomerId_details:", stripeCustomerId_details);

    const customerIntent = await getCustomerIntent(
      payWith,
      stripeCustomerId_details?.stripe_customer_id as string
    );
    if (customerIntent.ok === false) {
      setLoading(false);
      setErrorMessage(customerIntent.message);
      return;
    }

    let paymentMethodIntentDetails: {
      ok: boolean,
      setupIntent: SetupIntent | null,
      message?: string
    } | null = null;

    if (payWith === "debit-credit-card") {
      const cardElementDetails = await checkCardDetails(
        elements,
        CardNumberElement
      );
      if (cardElementDetails.ok !== true) {
        setLoading(false);
        setErrorMessage(tValidations("cardInfoNotAvailable"))
        return;
      }



      paymentMethodIntentDetails = await setupCustomerPaymentMethod_card(
        stripe,
        customerIntent,
        cardElementDetails,
        billing_details
      );
      // if (paymentMethodIntentDetails.ok !== true) return;

    }
    else if (payWith === "paypal") {
      paymentMethodIntentDetails = await setupCustomerPaymentMethod_paypal(
        stripe,
        `${window.location.origin}/booking/${parentBooking?.id}/checkout?payWith=${payWith}`,
        elements,
        customerIntent,
        billing_details
      );
      // because we need approve from paypal after this - we do not stop here and we do return
      return;
      // if(paymentMethodIntentDetails?.ok!==true)return;
    }

    if (paymentMethodIntentDetails === null || paymentMethodIntentDetails.ok !== true) {
      setLoading(false);
      setErrorMessage(paymentMethodIntentDetails?.message || tValidations("paymentGatewayNotAvailable"))
      return;
    }


    const details_setPaymentMethod = await attachPaymentMethodToCustomer(
      stripeCustomerId_details as {
        stripe_customer_id: string;
      },
      paymentMethodIntentDetails.setupIntent?.payment_method as string,
      authUser
    );
    if (details_setPaymentMethod.ok !== true) {
      setErrorMessage(details_setPaymentMethod.message);
      setLoading(false);
      return;
    };



    const resultAttachPMToBooking = await AttachDefaultPaymentForBooking(
      parentBooking?.id as string,
      // setupIntent?.payment_method as string,
      paymentMethodIntentDetails.setupIntent?.payment_method as string,
      authUser
    );
    if (resultAttachPMToBooking.ok !== true) {
      setErrorMessage(resultAttachPMToBooking.message)
      setLoading(false);
      return;
    }



    await bookTheExperience();

  }

  return (
    <>
      <div className="booking-checkout-footer">

        {
          payWith !== "apple-pay" && <ButtonDefault
            label={
              whenToPay === "payment-type-pay-now" ?
                // `Pay €${price.total.toFixed(2)} securely` 
                tForms("pay_price_securely", { price: `€${price_booking.total.toFixed(2)}` })
                :
                // tForms("confirm_your_spot")
                "Confirm your booking"
            } className="w-100 d-flex"
            // disabled={price.total === 0 || booking?.is_expired !== false}
            onClick={(e) => {
              processPayment();
            }}
            loading={loading}
          // disabled={booking?.is_expired}
          />
        }


        {
          // domain must be https for apple pay and google pay - this is the case on production so the element to show
          // domain must be verified for apple pay
          payWith === "apple-pay" && <>
            <div className="mb-5">
              <ExpressCheckoutElement
                options={{
                  paymentMethods: {
                    applePay: 'always',
                    googlePay: 'always',
                    link: 'never',
                  },
                  buttonType: {

                    googlePay: 'book', // Options: 'book', 'buy', 'checkout', 'subscribe', 'order', 'pay'
                    applePay: 'book',  // Options: 'book', 'buy', 'check-out', 'subscribe', 'order', etc.
                  },
                }}
                onReady={() => {
                  console.log('Express Checkout element mounted successfully.');
                }}
                onAvailablePaymentMethodsChange={(event: any) => {
                  // This gives you the exact object containing what is active (e.g., { applePay: true, googlePay: false })
                  console.log('Available payment methods updated:', event.availablePaymentMethods);
                }}
                onClick={(event) => {
                  console.log('Wallet button clicked:', event.expressPaymentType);
                  event.resolve();
                }}
                onCancel={() => {
                  console.log('User cancelled or closed the wallet sheet.');
                }}
                onConfirm={async (event) => {
                  console.log('Payment authorization confirmed. Processing token...', event);

                  if (elements === null || stripe === null) return;

                  try {
                    // 1. Create the payment method from the elements instance (Google Pay data)
                    const { error, paymentMethod } = await stripe.createPaymentMethod({
                      elements,
                    });

                    if (error) {
                      console.error("Failed to create payment method:", error.message);
                      return;
                    }

                    if (paymentMethod) {
                      // 2. YOU GOT IT! This is your Payment Method ID (e.g., pm_12345...)
                      const paymentMethodId = paymentMethod.id;
                      console.log("Success! Payment Method ID:", paymentMethodId);

                      const stripeCustomerId_details = await getStripeCustomerId_ByBooking(parentBooking?.id as string);

                      const details_setPaymentMethod = await attachPaymentMethodToCustomer(
                        stripeCustomerId_details as {
                          stripe_customer_id: string;
                        },
                        // paymentMethodIntentDetails,
                        paymentMethod.id,
                        authUser
                      );
                      if (details_setPaymentMethod.ok !== true) {
                        setErrorMessage(details_setPaymentMethod.message);
                        setLoading(false);
                        return;
                      };

                      const resultAttachPMToBooking = await AttachDefaultPaymentForBooking(
                        parentBooking?.id as string,
                        // setupIntent?.payment_method as string,
                        paymentMethod.id,
                        authUser
                      );
                      if (resultAttachPMToBooking.ok !== true) {
                        setErrorMessage(resultAttachPMToBooking.message)
                        setLoading(false);
                        return;
                      }

                      await bookTheExperience();


                    }
                  } catch (err) {
                    console.error("An unexpected error occurred:", err);
                  }


                }}
              />
            </div>
          </>
        }

        {
          whenToPay === "payment-later-reserve-now" &&
          <div className="text-center mb-5">
            <Title headingType="p" headingStyle="Text-xs-Regular" color="--color-text-fg-muted">{tForms("your_booking_will_be_confirmed")}</Title>
          </div>
        }

        {
          parentBooking?.is_expired === true && <>
            <IconText
              className="my-5"
              type="icon-text-alert"
              text={tForms("your_reservation_hold_has_expired")}
              iconType="clock-alarm-outline"
              fullWidthCentered={true}
              key="expired-spot"
              variation="danger" // Swapped variation to mirror a systemic warning layout
            />
          </>
        }

        {
          errorMessage !== "" && <div className="mb-3 text-center">
            <IconText
              type="icon-text-alert"
              iconType="danger-outline"
              variation="danger"
              text={errorMessage}
              className="w-100 justify-content-center"
            />
          </div>
        }
        {
          successMessage !== "" && <div className="mb-3 text-center">
            <IconText
              type="icon-text-alert"
              iconType="check-circle"
              variation="success"
              text={successMessage}
              className="w-100 justify-content-center"
            />
          </div>
        }


        <div className="icon-texts-groups">
          <IconText type="payment-flow-secure-form" iconType="lock-outline" text={tForms("instant_confirmation")} />
          <div className="separator"></div>
          <IconText type="payment-flow-secure-form" iconType="verified-shield-outline" text={tForms("protected_by_encryption")} />
        </div>



        <Title headingType="p" headingStyle="Text-xs-Regular" color="--color-text-fg-muted">{tForms("powered_by_stripe_secure_info")}</Title>
      </div>

      <ModalProgressPayment
        show={loading}
        setShow={setLoading}
        title={tForms("processing_booking")}
        description={tForms("processing_booking_description")}
        disable={loading}
        handleClose={() => { }}
      />

    </>
  )
}



function ModalProgressPayment(
  {
    show,
    setShow,
    title,
    description,
    disable,
    handleClose,
  }
    :
    {
      show: boolean;
      setShow: (show: boolean) => void;
      title: string;
      description: string;
      disable: boolean;
      handleClose?: () => void;
    }
) {
  return <>
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
      className={`modal-question z-1050 modal-booking-view ${disable ? "disabled" : ""}`}
    >

      <Modal.Body className="text-center py-5">
        <div className="d-flex justify-content-center mb-4">
          <Spinner animation="border" role="status" variant="dark" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
        <Title headingType="h4" headingStyle="Display-xs-Medium" color="--color-text-fg" className="mb-2">
          {title}
        </Title>
        <Title headingType="p" headingStyle="Text-lg-Regular" color="--color-text-fg-subtle">
          {description}
        </Title>
      </Modal.Body>
    </Modal>
  </>
}