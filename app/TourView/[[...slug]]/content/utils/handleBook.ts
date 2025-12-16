/*export const handleBookNow = async ({
  tour,
  selectedRateId,
  selectedSlot,
  quantities,
  contactDetails,
  setShowContactForm,
  setProcessingPayment,
  setCurrentRequestId,
  stripePromise,
  validateContactDetails,
  normalizeDateToYYYYMMDD
}: {
  tour: IBokunGetExperienceById;
  selectedRateId: number;
  selectedSlot: Partial<IBokunSlot & { isSet: boolean }>;
  quantities: Record<number, number>;
  contactDetails: IContactDetails;
  setShowContactForm: (show: boolean) => void;
  setProcessingPayment: (processing: boolean) => void;
  setCurrentRequestId: (requestId: string) => void;
  stripePromise: Promise<Stripe | null>;
  validateContactDetails: () => boolean;
  normalizeDateToYYYYMMDD: (date: Date) => string;
}) => {
  // 1️⃣ Controllo dati minimi per procedere
  if (!tour?.id || !selectedRateId || !selectedSlot?.startTimeId || !selectedSlot?.date) {
    alert("Per favore seleziona data, orario e tariffa prima di procedere.");
    return;
  }

  // 2️⃣ Validazione contatti lato frontend
  if (!validateContactDetails()) {
    setShowContactForm(true);
    return;
  }

  setProcessingPayment(true);

  try {
    // 3️⃣ Costruzione bookingRequest (solo la parte che serve al backend)
    const bookingRequest = {
      mainContactDetails: [
        { questionId: "firstName", values: [contactDetails.firstName] },
        { questionId: "lastName", values: [contactDetails.lastName] },
        { questionId: "email", values: [contactDetails.email] },
        { questionId: "phoneNumber", values: [contactDetails.phoneNumber] }
      ],
      activityBookings: [
        {
          activityId: tour.id,
          rateId: selectedRateId,
          startTimeId: selectedSlot.startTimeId,
          date: normalizeDateToYYYYMMDD(selectedSlot.date),
          passengers: Object.entries(quantities)
            .filter(([_, qty]) => qty > 0)
            .flatMap(([catId, qty]) =>
              Array.from({ length: qty }, () => ({
                pricingCategoryId: parseInt(catId),
                passengerDetails: [],
                answers: [],
                extras: []
              }))
            ),
          answers: [],
          pickupAnswers: [],
          dropoffAnswers: []
        }
      ]
    };

    // 4️⃣ Invio al backend
    const reserveResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/bokun-checkout-reserve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": import.meta.env.VITE_SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({ bookingRequest })
    });

    const reserveResult = await reserveResponse.json();
    console.log("📥 Risposta funzione:", reserveResult);

    if (!reserveResponse.ok || !reserveResult.ok) {
      throw new Error(reserveResult?.error || "Errore durante la prenotazione");
    }

    // 5️⃣ Estrai confirmationCode dalla risposta Bokun
    if (!reserveResult.ok || !reserveResult.data?.booking?.confirmationCode) {
      throw new Error("Confirmation code non ricevuto da Bokun");
    }

    const confirmationCode = reserveResult.data.booking.confirmationCode;
    console.log("✅ Confirmation code ricevuto:", confirmationCode);

    // 6️⃣ Salva requestId per tracking
    setCurrentRequestId(reserveResult.data?.requestId);

    // 7️⃣ Crea sessione Stripe
    const total = computeTotal();
    const stripeSessionRes = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tourTitle: `${tour.title} - ${selectedSlot.date}`,
          price: total,
          confirmationCode,
          contactDetails,
          bokun: {
            activityId: tour.id,
            startTimeId: selectedSlot.startTimeId,
            rateId: selectedRateId,
            quantities,
            dateISO: selectedSlot.date
          }
        })
      }
    );

    const { id: sessionId, error } = await stripeSessionRes.json();
    if (error) throw new Error(error);

    const stripe = await stripePromise;
    if (stripe) {
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) throw new Error("Errore nel redirect a Stripe");
    }

  } catch (err) {
    console.error("💥 Errore durante la prenotazione:", err);
    alert(err.message || "Errore durante la prenotazione");
  } finally {
    setProcessingPayment(false);
  }
};*/