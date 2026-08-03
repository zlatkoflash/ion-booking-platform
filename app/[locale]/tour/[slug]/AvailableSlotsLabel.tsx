import ZBadge from "@/components/buttons/ZBadge"
import { useTranslations } from "next-intl";

export default function AvailableSlotsLabel({
  ocupiedSlots,
  availableSlotsFromTimeSlot
}: {
  ocupiedSlots: number,
  availableSlotsFromTimeSlot: number
}) {

  // let availableCountSlots = availableSlotsFromTimeSlot - ocupiedSlots;
  // if (availableCountSlots < 0) availableCountSlots = 0;

  const tCommon = useTranslations("Common");

  let labelString = tCommon("available_n_slots", { slots: availableSlotsFromTimeSlot });
  let variantString = "success";

  if (availableSlotsFromTimeSlot === 0) {
    labelString = tCommon("no_slots_left");
    variantString = "error";
  }
  else if (availableSlotsFromTimeSlot < 6) {
    labelString = tCommon("only_n_slots_left", { slots: availableSlotsFromTimeSlot });
    variantString = "warning";
  }


  return <>


    <ZBadge label={labelString} variant={variantString} type="form-badge" />


  </>
}