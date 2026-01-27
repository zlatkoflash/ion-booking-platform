import { IBokunActivityRate, IBokunAvailability, IExperienceCompleteZ } from "@/interface/Interface";
import { IBookPricingEngine } from "../app/TourView/[[...slug]]/content/BookingSidebarProvider";

/**
 * 
 * @param availability 
 * @param rate 
 * @param priceEngineLoc 
 * @param pricingCategoryId 
 * @returns total count per category, per Adults, children
 */
export const FTotalCountPerRateandCategory = (
  // pricingCategoryId: number,
  availability: IBokunAvailability,
  rate: IBokunActivityRate, priceEngineLoc: IBookPricingEngine, pricingCategoryId: number) => {
  let count = 0;
  const countsFor = priceEngineLoc.counts.filter(c => {
    return c.availabilityId === availability.id && c.rateId === rate.id
      && c.priceCategoryId === pricingCategoryId
  });
  countsFor.forEach(element => {
    count += element.count;
  });
  return count;
}




/*
wrong function
export const BokunAbsAvailablePlaces = (availabiliy: IBokunAvailability) => {
  const absTotalFreePlaces = availabiliy.availabilityCount - availabiliy.bookedParticipants;
  return absTotalFreePlaces;
}*/


/**
 * 
 * @param availability 
 * @param rate 
 * @param priceEngineLoc 
 * @returns total count of people(adult, children....) per rate
 */
export const FTotalCountPerRate = (// pricingCategoryId: number,
  availability: IBokunAvailability,
  rate: IBokunActivityRate,
  priceEngineLoc: IBookPricingEngine,
  // pricingCategoryId: number
) => {
  let count = 0;
  const countsFor = priceEngineLoc.counts.filter(c => {
    return c.availabilityId === availability.id && c.rateId === rate.id
    // && c.priceCategoryId === pricingCategoryId
  });
  countsFor.forEach(element => {
    count += element.count;
  });
  return count;
}

/**
 * 
 * @param pricingCategoryId 
 * @param availability 
 * @param rate 
 * @param priceEngineLoc 
 * @returns Get one object for count
 */
export const FPriceEngine_ObjectForCount = (pricingCategoryId: number,
  availability: IBokunAvailability,
  rate: IBokunActivityRate, priceEngineLoc: IBookPricingEngine) => {

  console.log("pricingCategoryId:", pricingCategoryId);
  console.log("availability:", availability);
  console.log("rate:", rate);
  console.log("priceEngineLoc:", priceEngineLoc.counts);
  // priceEngineLoc.counts[0].availabilityId
  const objectForCount = priceEngineLoc.counts.find(
    c => {
      return c.availabilityId === availability.id && c.priceCategoryId === pricingCategoryId && c.rateId === rate.id;
    }
  );
  return objectForCount;
}
/**
 * On changing the counts of users it update the state
 */
/*export const FPriceEngine = (
  addRemoveParticipant: '-' | '+',
  pricingCategoryId: number,
  availability: IBokunAvailability,
  rate: IBokunActivityRate,
  priceEngine: IBookPricingEngine,
  set_priceEngine: (pe: IBookPricingEngine) => void
) => {

  // console.log("availability:", availability);

  const priceEngineLoc = { ...priceEngine };

  let objectForCount = FPriceEngine_ObjectForCount(
    pricingCategoryId, availability, rate, priceEngineLoc
  );
  if (objectForCount === undefined || objectForCount === null) {
    console.log("objectForCount is not defined:", objectForCount);
    priceEngineLoc.counts.push({
      availabilityId: availability.id,
      priceCategoryId: pricingCategoryId,
      rateId: rate.id,
      count: 0,
    });
  }
  console.log("priceEngineLoc:", priceEngineLoc);
  objectForCount = FPriceEngine_ObjectForCount(
    pricingCategoryId, availability, rate, priceEngineLoc
  );
  if (objectForCount !== undefined) {
    if (addRemoveParticipant === '-' && objectForCount.count > 0) {
      objectForCount.count--;
    }
    else if (addRemoveParticipant === '+' && objectForCount.count < // BokunAbsAvailablePlaces(availability)
      availability.availabilityCount
    ) {
      objectForCount.count++;
    }
  }
  console.log("objectForCount:", objectForCount);

  set_priceEngine({ ...priceEngineLoc });

}*/

export const BokunAvailabilityRateTotalPrice = (
  // experience: IExperienceCompleteZ, 
  availability: IBokunAvailability,
  rate: IBokunActivityRate,
  priceEngine: IBookPricingEngine
) => {
  try {
    let SumTotal = 0;

    rate.pricingCategoryIds.forEach(categoryId => {

      const countPerCatAvRat = priceEngine.counts.find(c => {
        return c.availabilityId === availability.id
          && c.priceCategoryId === categoryId && c.rateId === rate.id
      });

      if (countPerCatAvRat === undefined) return 0;

      // rate.price
      const catPrice = availability.pricesByRate.find(r => { return r.activityRateId === rate.id })?.pricePerCategoryUnit.find(c => { return c.id === categoryId });
      // rate.pricedPerPerson.find(c => { return c.id === categoryId });
      if (catPrice === undefined) return 0;

      SumTotal += catPrice.amount.amount * countPerCatAvRat?.count;

    });

    return SumTotal;
  }
  catch (error) {
    return 0
  }
}