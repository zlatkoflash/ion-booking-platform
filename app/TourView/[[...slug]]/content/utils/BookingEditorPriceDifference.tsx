import { useBookingSidebar } from "../BookingSidebarProvider";

const BookingEditorPriceDifference = () => {

  const {
    selectedAvailability,
    selectedDate,
    selectedRate,
    selectedRate_countParticipants,
    selectedRate_totalSum,
    bookedTotalSum,
    experience,
    priceEngine,

  } = useBookingSidebar();

  const newTotal = selectedRate_totalSum();
  const oldTotal = bookedTotalSum();
  const difference = newTotal - oldTotal;

  // Logic for UI states
  const isAdditionalCharge = difference > 0;
  const isRefund = difference < 0;
  const isSamePrice = difference === 0;

  return (
    <div className="space-y-2 border-t pt-4">
      <div className="flex justify-between text-lg font-semibold mb-1">
        <span className="text-gray-800">
          {isAdditionalCharge && "Additional Charge"}
          {isRefund && "Refund Amount"}
          {isSamePrice && "Price Difference"}
        </span>

        <span className={
          isAdditionalCharge ? "text-red-600" :
            isRefund ? "text-green-600" :
              "text-gray-800"
        }>
          {isRefund ? "-" : isAdditionalCharge ? "+" : ""}
          €{Math.abs(difference).toFixed(2)}
        </span>
      </div>

      {/* Helpful Sub-text for the user */}
      <p className="text-xs text-gray-500 text-right">
        {isAdditionalCharge && "You will be charged the difference to confirm."}
        {isRefund && "The difference will be credited back to your account."}
        {isSamePrice && "No change in total price."}
      </p>
    </div>
  );
};

export default BookingEditorPriceDifference;
