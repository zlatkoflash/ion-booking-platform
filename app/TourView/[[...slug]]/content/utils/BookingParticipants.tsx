import {

  // this function is not good
  // BokunAbsAvailablePlaces, 
  FPriceEngine, FTotalCountPerRate, FTotalCountPerRateandCategory
} from "@/utils/FPriceEngine";
import { useBookingSidebar } from "../BookingSidebarProvider";
import { TriangleAlert } from "lucide-react";

export interface IBookingParticipants {

}

export default function BookingParticipants() {

  const {
    selectedAvailability,
    dataForExperience,
    priceEngine,
    set_priceEngine
  } = useBookingSidebar();

  /**
   * Will hold array of the default rate,
   * by this rate we will define the price and the booking details
   */
  const ArrayX1DefaultRate = selectedAvailability.rates.filter(rateFor => {
    return rateFor.id === selectedAvailability.defaultRateId
  });

  console.log("priceEngine inside Booking participatns:", priceEngine);

  // this is not good
  // const maxAvailabilityCount = BokunAbsAvailablePlaces(selectedAvailability);
  const maxAvailabilityCount = selectedAvailability.availabilityCount

  return <div>
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Participants</h3>
    <div className="space-y-3">
      {

        //selectedAvailability.rates.find(r => r.id === selectedRateId)?.pricingCategoryIds?.map((catId) => {
        ArrayX1DefaultRate.map((rate, rateIndex: number) => {

          console.log("availiable rate", rate);

          /*const catPrice = selectedAvailability.pricesByRate
            ?.find((p) => p.activityRateId === selectedRateId)
            ?.pricePerCategoryUnit?.find((pcu) => pcu.id === catId);*/
          // const catPrice = 99;

          // const label = categoryLabels[catId] || `Category ${catId}`;
          // const categoryLabel = "Category";
          // const price = catPrice?.amount?.amount || 0;
          // const price = 99.99;
          // const currency = catPrice?.amount?.currency || 'EUR';
          // const currency = "EUR";
          const minPerBooking = rate.minPerBooking;
          const maxPerBooking = rate.maxPerBooking;

          const pricesForRate = selectedAvailability.pricesByRate.find(pricesForRate => pricesForRate.activityRateId === rate.id);
          console.log("pricesForRate:", pricesForRate);

          const totalCountForTheRate = FTotalCountPerRate(
            selectedAvailability,
            rate,
            priceEngine
          );
          console.log("totalCountForTheRate:", totalCountForTheRate, "maxAvailabilityCount:", maxAvailabilityCount);
          const minSelectedParticipantsIsOK = totalCountForTheRate >= minPerBooking;
          const maxSelectedParticipantsIsOK = totalCountForTheRate <= maxPerBooking;

          return (<div className="prices-categories-wrap" key={`prices-categories-wrap-${rateIndex}`}>

            {
              ArrayX1DefaultRate.length > 1 && (<h5 className="text-lg font-regular text-gray-800 mb-0">{rate.title}</h5>)
            }

            {
              // selectedAvailability.
              rate.pricingCategoryIds.map((priceCategoryId, priceCategoryId_index) => {

                console.log("priceCategoryId:", priceCategoryId);
                // const priceForRate = 
                const categoryUnit = pricesForRate?.pricePerCategoryUnit.find(categoryUnit => categoryUnit.id === priceCategoryId);
                console.log("categoryUnit:", categoryUnit);

                const pricingCategoriesDetails = dataForExperience.experience?.pricingCategories.find(priceCategoryDetails => priceCategoryDetails.id === priceCategoryId);

                const totalCountPerRateAndCategory = FTotalCountPerRateandCategory(
                  selectedAvailability,
                  rate,
                  priceEngine,
                  priceCategoryId
                );

                return <div key={`catId-${rate.id}-${rateIndex}-${priceCategoryId}`
                }>



                  <div className={`flex items-center justify-between py-3 border-b border-gray-100 ${priceCategoryId_index > 0 ? 'pt-0' : ''}`}>

                    <div>
                      <div className="font-medium text-gray-800">{pricingCategoriesDetails?.fullTitle}</div>
                      <div className="text-sm text-gray-600">€{
                        // price.toFixed(2)
                        categoryUnit?.amount.amount.toFixed(2)
                      }</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        // onClick={() => {
                        // console.log("setQty(catId, (quantities[catId] || 0) - 1)");
                        // setQty(catId, (quantities[catId] || 0) - 1)
                        // }}
                        onClick={() => {
                          /*console.log("rate:", rate);
                          console.log('dataForExperience', dataForExperience);
                          console.log("selectedAvailability:", selectedAvailability);*/

                          FPriceEngine(
                            "-",
                            priceCategoryId,
                            selectedAvailability,
                            rate,
                            priceEngine,
                            set_priceEngine
                          );

                        }}
                        className={`w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 cursor-pointer ${totalCountPerRateAndCategory <= 0 ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                      /*disabled={
                        totalCountPerRateAndCategory <= 0
                        // false
                        // !quantities[catId] || quantities[catId] <= 0
                      }*/
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">
                        {
                          //quantities[catId] || 0
                        }
                        {
                          totalCountPerRateAndCategory
                        }
                      </span>
                      <button
                        // onClick={() => {
                        // setQty(catId, (quantities[catId] || 0) + 1)
                        // console.log("Where is + : setQty(catId, (quantities[catId] || 0) + 1)");
                        // }}
                        onClick={() => {


                          FPriceEngine(
                            "+",
                            priceCategoryId,
                            selectedAvailability,
                            rate,
                            priceEngine,
                            set_priceEngine
                          );

                        }}
                        className={`w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 cursor-pointer ${

                          // totalCountForTheRate >= rate.maxPerBooking 
                          totalCountForTheRate >= maxAvailabilityCount
                            // BokunAbsAvailablePlaces(selectedAvailability)
                            ? 'opacity-50 cursor-not-allowed pointer-events-none' : ""}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

              })
            }


            {
              !minSelectedParticipantsIsOK && (<div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-lg shadow-md mb-6 transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <TriangleAlert className="w-6 h-6 flex-shrink-0 text-yellow-600" />
                  <p className="font-semibold text-base sm:text-lg">
                    Minimum selected participants should be <span className="font-extrabold text-yellow-700">{rate.minPerBooking}</span>.
                  </p>
                </div>
                <p className="text-sm mt-1 ml-9">
                  Please increase the quantity to meet the booking requirements.
                </p>
              </div>)
            }

          </div>

          );
        })}
    </div>
  </div >
}