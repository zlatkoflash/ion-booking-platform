
import { IBokunAvailability, IExperienceCompleteZ, IExperienceZ } from "@/interface/Interface";
import { GetDetailsForBooking } from "@/utils/bokun";


import CheckoutErrorTourDontExist from "./CheckoutErrorTourDontExist";
import { BokunAvailabilityRateTotalPrice } from "@/utils/FPriceEngine";
import { BookingCheckoutProvider } from "./CheckoutProvider";
import CheckoutPageContent from "./CheckoutPageContent";

export interface ISearchParamsForBooking {
  [key: string]: string | string[] | undefined;
  // Common use case: define specific keys if you know them
  /** A unique identifier for the specific availability date/time (e.g., "1119226"). */
  availability: string;
  activity: string;
  /** A JSON string containing an array of CountDetail objects. This must be parsed. */
  counts: string;
  /** Identifier for the specific experience or activity being queried. */
  experience: string;
  /** The total number of participants across all categories. */
  participants: string;
  /** Identifier for the rate plan or package being used. */
  rate: string;
  /** The calculated total price (as a string). */
  total: string;

  date: string,

  startTimeId: string,

  startTimeString: string,

  dateLocalString: string
}

export default async function CheckoutPage({ searchParams }: { searchParams: ISearchParamsForBooking }) {

  const searchParamsFor = await searchParams;

  console.log("searchParamsFor:", searchParamsFor);

  let bookingDetails: any = {}
  // let step = "checkout";

  try {
    bookingDetails = await GetDetailsForBooking(searchParamsFor);
  }
  catch (error) {
    console.log("Loading Booking details Error:", error);
  }

  console.log("bookingDetails:", bookingDetails);
  const dataForBooking = bookingDetails as {
    ok: boolean,
    data: {
      experience: IExperienceCompleteZ,
      availabilities: IBokunAvailability[]
    }
  };
  console.log("dataForBooking:", dataForBooking);
  // const rate = experience.rates.find(r=>{return r.id===Number(searchParams.rate)});
  /*if (bookingDetails.ok !== true) {
    // here we need error when not loaded data good
  }*/
  if (
    dataForBooking.ok !== true
    || dataForBooking.data === undefined
    || dataForBooking.data.experience === undefined
  ) {
    // here we need error that experience not loaded good
    return (
      <CheckoutErrorTourDontExist />
    );
  }

  const experience = dataForBooking.data.experience;

  let loading = false;

  console.log("experience:", experience);
  const rate = experience.rates.find(r => { return r.id === Number(searchParamsFor.rate) });

  if (rate === undefined) {
    return (
      <CheckoutErrorTourDontExist />
    );
  }
  console.log('rate:', rate);

  const availability = dataForBooking.data.availabilities.find(a => { return a.id === searchParamsFor.availability });
  if (availability === undefined) {
    return (
      <CheckoutErrorTourDontExist />
    );
  }
  console.log("availability:", availability);

  const counts = JSON.parse(searchParamsFor.counts);

  const totalPrice = BokunAvailabilityRateTotalPrice(
    availability,
    rate,
    {
      counts: counts
    }
  );




  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading checkout...</p>
      </div>
    </div>
  }

  return <BookingCheckoutProvider
    availability={availability}
    experience={experience}
    rate={rate}
    searchParamsFor={searchParamsFor}
    totalPrice={totalPrice}
    counts={counts}
  >
    <CheckoutPageContent />
  </BookingCheckoutProvider>



}