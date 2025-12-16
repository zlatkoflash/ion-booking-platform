import { useBookingSidebar } from "@/app/TourView/[[...slug]]/content/BookingSidebarProvider";
import { IBokunActivityRate, IBokunAvailability } from "@/interface/Interface";
import { normalizeDateToYYYYMMDD } from "@/utils/dateUtils";
import { Clock, Euro, Users } from "lucide-react";

export interface IAvailableTimes {
  // slots: IBokunAvailability[],
  // selectedDate: string | null,
  // selectedSlot: IBokunAvailability | null,
  // handleSlotClick: (slot: IBokunAvailability) => void
}
export default function AvailableTimes(
  data: IAvailableTimes
) {
  const {
    // slots,
    // selectedDate,
    // selectedSlot,
    // handleSlotClick
  } = data;

  const {
    availablilitesForDateRange,
    selectedDate,
    selectedAvailability,
    setSelectedAvailability,
    setSelectedRate
  } = useBookingSidebar();

  return <div className="space-y-3">
    <h5 className="text-lg font-semibold text-gray-800">Available Times</h5>
    <div className="space-y-2">
      {
        // slots
        availablilitesForDateRange
          .filter(availablility => normalizeDateToYYYYMMDD(availablility.date) === selectedDate)
          .map((availablility, index) => {
            const isSelected = selectedAvailability?.startTimeId === availablility.startTimeId;
            const isAvailable = availablility.availabilityCount > 0;
            console.log("slot:", availablility, availablility.pricesByRate);
            const displayPrice = availablility.pricesByRate?.[0]?.pricePerCategoryUnit?.[0]?.amount?.amount || 0;

            return (
              <div
                key={`${availablility.date}-${availablility.startTimeId}-${index}`}
                onClick={() => {
                  // handleSlotClick(availablility)
                  setSelectedAvailability(availablility);
                  const defaultRate = availablility.rates.find(r => { return r.id === availablility.defaultRateId });
                  console.log("defaultRate:", defaultRate);
                  setSelectedRate(defaultRate as IBokunActivityRate)
                }}
                className={`
                      border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 flex items-center justify-between
                      ${isAvailable
                    ? isSelected
                      ? 'border-blue-600 bg-blue-50 shadow-lg'
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                    : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-60'
                  }
                    `}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="font-medium">{availablility.startTime}</span>
                  </div>
                </div>

                <div className="text-right">
                  {isAvailable ? (
                    <div className="space-y-1">
                      <div className="flex items-center text-blue-600">
                        <Euro className="w-4 h-4 mr-1" />
                        <span className="font-bold">{displayPrice.toFixed(2)}</span>
                      </div>

                      <div className="flex items-center text-orange-600">
                        <Users className="w-4 h-4 mr-1" />
                        <span className="text-xs">{availablility.availabilityCount} spots</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-400 text-center">
                      <div className="text-sm">Sold Out</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
    </div>
  </div>;
}